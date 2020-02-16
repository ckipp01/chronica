import $file.domain, domain.{Log, Page}
import $file.head, head._
import $file.html, html._

import java.io.File
import java.io.PrintWriter

import scala.io.Source

// Taken in fron mdoc
import com.vladsch.flexmark.html.HtmlRenderer
import com.vladsch.flexmark.parser.Parser

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

def getFile(target: String): String = {
  val file = new File(target)
  file.getPath
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

  bufferedMarkdown.close

  val parsed = parser.parse(markdown)
  val head = createHead(topic)
  val nav = createNav(fileType)
  val htmlBody = renderer.render(parsed)
  val fullHtml = putTogetherHtml(head, nav, htmlBody)
  val fileName = topic + ".html"

  println(s"---- created $fileName ----")

  Page(fileName, fullHtml)
}

def createHomepage(
    fileLoc: String
)(implicit parser: Parser, renderer: HtmlRenderer): Page = {
  val bufferedMarkdown = Source.fromFile(fileLoc)

  val markdown = bufferedMarkdown
    .getLines()
    .mkString("\n")

  bufferedMarkdown.close

  val parsed = parser.parse(markdown)
  val head = createHead("chronica")
  val htmlBody = renderer.render(parsed)
  val fullHtml = putTogetherHtml(head, htmlBody)

  Page("index.html", fullHtml)
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
