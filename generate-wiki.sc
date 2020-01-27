import $ivy.{`com.vladsch.flexmark:flexmark-all:0.50.44`}
import $file.head, head._

import java.io.File
import java.io.PrintWriter

import com.vladsch.flexmark.html.HtmlRenderer
import com.vladsch.flexmark.parser.Parser

import scala.io.Source

case class Log(
  date: String,
  category: String,
  time: Int,
  project: String,
  tags: List[String] = List.empty
)

case class Page(name: String, content: String)

println("""|
           |      generating chronica
           |===============================
           |
           |""".stripMargin)

println("---- creating parser ----")
implicit val parser = Parser.builder().build()
println("---- creating renderer ----")
implicit val renderer = HtmlRenderer.builder().build()

def getListOfFiles(dir: String): List[String] = {
  val file = new File(dir)
  file.listFiles
    .filter(_.isFile)
    .map(_.getPath)
    .filter(_.endsWith(".md"))
    .toList
}

def getLogs(fileLoc: String): ujson.Value = {
  val bufferedLogs = Source.fromFile(fileLoc)
  val logs = bufferedLogs.getLines.mkString
  bufferedLogs.close()
  ujson.read(logs)
}

def createPage(
    fileLoc: String,
    logs: ujson.Value
)(implicit parser: Parser, renderer: HtmlRenderer): Page = {
  val fileName = fileLoc.split("/").last.replace(".md", ".html")
  val bufferedMarkdown = Source.fromFile(fileLoc)

  val markdown = bufferedMarkdown.getLines
    .mkString("\n")

  bufferedMarkdown.close()

  val parsed = parser.parse(markdown)
  val head = createHead(fileName.takeWhile(_ != '.'))
  val htmlBody = renderer.render(parsed)

  val fullHtml = putTogetherHtml(head, htmlBody)

  // val jsonString = os.read(os.pwd / "logs.json")
  println(s"---- created $fileName ----")

  Page(fileName, fullHtml)
}

def writeToOut(page: Page): Unit = {
  val out = new File("out")
  if (!out.isDirectory()) {
    out.mkdir()
  }
  val pw = new PrintWriter(new File(s"out/${page.name}"))
  pw.write(page.content)
  pw.close
}

val files = getListOfFiles("./pages")
val logs  = getLogs("./logs.json")

val _ = files
  .map(file => createPage(file, logs))
  .foreach(writeToOut)

println(s"""|
            |         finished creating ${files.length} pages
            |============================================
            |
            |""".stripMargin)
