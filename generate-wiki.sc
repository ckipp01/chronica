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
  tags: Option[List[String]]
)

object Log {
  def fromJson(json: ujson.Value) =
    Log(
      json.obj("date").str,
      json.obj("category").str,
      json.obj("time").num.toInt,
      json.obj("project").str,
      json.obj
        .get("tags")
        .map(_.arr.map(_.str).toList)
    )
}

case class Page(name: String, content: String)

case class TopicDetail(
  topic: String,
  category: String,
  logs: List[Log],
  percentage: Double
)

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

  ujson.read(rawLogs)
    .arr
    .map(Log.fromJson)
    .toList
}

def createPage(
    fileLoc: String,
    logs: List[Log]
)(implicit parser: Parser, renderer: HtmlRenderer): Page = {
  val topic = fileLoc.split("/").last.takeWhile(_ != '.')
  println(topic)
  val bufferedMarkdown = Source.fromFile(fileLoc)

  val markdown = bufferedMarkdown.getLines
    .mkString("\n")

  bufferedMarkdown.close()

  val topicLogs: List[Log] = logs.filter(_.project == topic)
  val categories = topicLogs.groupBy(_.category)

  val topicDetails: List[TopicDetail] = categories.collect { case (cat, logs) =>
    TopicDetail(topic, cat, logs, (logs.length.toDouble / topicLogs.length * 100).round)
  }.toList

  println(topicDetails)

  val parsed = parser.parse(markdown)
  val head = createHead(topic)
  val htmlBody = renderer.render(parsed)
  val fullHtml = putTogetherHtml(head, htmlBody)
  val fileName = topic + ".html"

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
  .map(createPage(_, logs))
  .foreach(writeToOut)

println(s"""|
            |         finished creating ${files.length} pages
            |============================================
            |""".stripMargin)
