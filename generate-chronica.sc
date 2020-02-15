import $file.partials, partials._
import $file.domain, domain._
import $file.modifiers, modifiers._

import java.io.File
import java.nio.file.Paths
import java.io.PrintWriter

// Pulling this in from mdoc
import com.vladsch.flexmark.html.HtmlRenderer
import com.vladsch.flexmark.parser.Parser

import scala.io.Source

println("""|
           |      generating chronica
           |===============================
           |""".stripMargin)

implicit val parser = Parser.builder().build()
implicit val renderer = HtmlRenderer.builder().build()

def getListOfFiles(dir: String): List[String] = {
  val file = new File(dir)
  file.listFiles
    .filter(_.isFile)
    .map(_.getPath)
    .filter(_.endsWith(".md"))
    .toList
}

def getLogs(fileLoc: String): List[Log] = {
  val bufferedLogs = Source.fromFile(fileLoc)
  val rawLogs = bufferedLogs.getLines.mkString
  bufferedLogs.close()

  ujson
    .read(rawLogs)
    .arr
    .map(Log.fromJson)
    .toList
}

def createOverview(
    logs: List[Log],
    fileList: List[String],
    topic: String
): Page = {
  val head = createHead(topic)
  val nav = createNav(topic)
  val htmlBody = createList(fileList, topic, logs)
  val fullHtml = putTogetherHtml(head, nav, htmlBody)
  val fileName = topic + ".html"

  println(s"---- created $fileName overview ----")
  Page(fileName, fullHtml)
}

def createPage(
    fileLoc: String,
    fileType: String
)(implicit parser: Parser, renderer: HtmlRenderer): Page = {
  val topic = retrieveFileName(fileLoc)
  val bufferedMarkdown = Source.fromFile(fileLoc)

  val markdown = bufferedMarkdown.getLines
    .mkString("\n")

  bufferedMarkdown.close()

  val parsed = parser.parse(markdown)
  val head = createHead(topic)
  val nav = createNav(fileType)
  val htmlBody = renderer.render(parsed)
  val fullHtml = putTogetherHtml(head, nav, htmlBody)
  val fileName = topic + ".html"

  println(s"---- created $fileName ----")

  Page(fileName, fullHtml)
}

def writeToOut(page: Page): Unit = {
  val out = new File("out")
  if (!out.isDirectory) {
    out.mkdir()
  }
  val pw = new PrintWriter(new File(s"out/${page.name}"))
  pw.write(page.content)
  pw.close
}

val logs: List[Log] = getLogs("./logs.json")
val percentageGenerator = new PercentageGenerator(logs)

val mdocSettings = mdoc
  .MainSettings()
  .withIn(Paths.get("wiki"))
  .withStringModifiers(List(percentageGenerator))
  .withNoLinkHygiene(true)

mdoc.Main.process(mdocSettings)

val wikiMarkdown: List[String] = getListOfFiles("out")
val wikiOverviewPage: Page = createOverview(logs, wikiMarkdown, "wiki")
val wikiHtml: List[Page] = wikiMarkdown.map(createPage(_, "wiki"))

for (page <- (wikiOverviewPage :: wikiHtml))
  writeToOut(page)

val blogMarkdown: List[String] = getListOfFiles("blog")
val blogOverviewPage: Page = createOverview(logs, blogMarkdown, "blog")
val blogHtml: List[Page] = blogMarkdown.map(createPage(_, "blog"))

for (page <- (blogOverviewPage :: blogHtml))
  writeToOut(page)

val extraMarkdown: List[String] = getListOfFiles("extras")
val extraHtml: List[Page] = extraMarkdown.map {
  case index if index.contains("index") => createPage(index, "index")
  case about if about.contains("about") => createPage(about, "about")
  case unknown                          => createPage(unknown, "unknown")
}

for (page <- extraHtml)
  writeToOut(page)

println(s"""|
            |         finished generating chronica 
            |============================================
            |""".stripMargin)
