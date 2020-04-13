import $ivy.`com.atlassian.commonmark:commonmark:0.14.0`
import $ivy.`com.atlassian.commonmark:commonmark-ext-yaml-front-matter:0.14.0`
import $file.domain, domain.{Metadata, Log, Page}
import $file.head, head._
import $file.html, html._

import java.io.File
import java.io.PrintWriter
import java.nio.file.Files
import java.nio.file.StandardCopyOption

import scala.collection.JavaConverters._
import scala.io.Source

import org.commonmark.node.Node
import org.commonmark.ext.front.matter.YamlFrontMatterExtension
import org.commonmark.ext.front.matter.YamlFrontMatterVisitor
import org.commonmark.parser.Parser
import org.commonmark.renderer.html.HtmlRenderer

private val extensions = Seq(
  YamlFrontMatterExtension.create()
).asJava

implicit val parser = Parser.builder().extensions(extensions).build()
implicit val renderer = HtmlRenderer.builder().extensions(extensions).build()

def getAllFilesInDir(dir: String): List[File] = {
  val file = new File(dir)
  file.listFiles
    .filter(_.isFile)
    .toList
}

def getAllMarkdown(dir: String): List[String] = {
  getAllFilesInDir(dir)
    .map(_.getPath)
    .filter(_.endsWith(".md"))
}

def getLogs(fileLoc: String): List[Log] = {
  val bufferedLogs = Source.fromFile(fileLoc)
  val rawLogs = bufferedLogs.getLines.mkString
  bufferedLogs.close()

  ujson
    .read(rawLogs)
    .arr
    .map(Log(_))
    .toList
}

def createOverview(
    logs: List[Log],
    pageList: List[Page],
    topic: String
): Page = {
  val ogType =
    if (topic == "blog") "blog"
    else "website"
  val head = createHead(topic.replace("-", " ").capitalize, ogType)
  val nav = createNav(topic)
  val htmlBody = createList(pageList, topic, logs)
  val fullHtml = putTogetherHtml(head, nav, htmlBody)
  val fileName = topic + ".html"

  println(s"---- created $fileName overview ----")
  Page(fileName, fullHtml, None)
}

def createPage(
    fileLoc: String,
    fileType: String
)(implicit parser: Parser, renderer: HtmlRenderer): Page = {
  val bufferedMarkdown = Source.fromFile(fileLoc)
  val markdown = bufferedMarkdown.getLines
    .mkString("\n")

  bufferedMarkdown.close

  val parsed = parser.parse(markdown)
  val metaData = retrieveMetaData(parsed)
  val topic = metaData.title
    .getOrElse(retrieveFileName(fileLoc))
    .replace(' ', '-')
    .toLowerCase
  val ogType =
    if (fileType == "blog") "blog"
    else "website"
  val head = createHead(topic.replace("-", " ").capitalize, ogType)
  val nav = createNav(fileType)
  val htmlBody = renderer.render(parsed)
  val fullHtml = putTogetherHtml(head, nav, htmlBody)
  val fileName = topic + ".html"

  println(s"---- created $fileName ----")

  Page(fileName, fullHtml, Some(metaData))
}

def retrieveMetaData(node: Node): Metadata = {
  val visitor = new YamlFrontMatterVisitor
  node.accept(visitor)

  val mapping: Map[String, String] = visitor.getData.asScala.toMap.collect {
    case (k, v) if v.asScala.toList.nonEmpty => k -> v.asScala.toList.head
  }

  Metadata(mapping.get("title"), mapping.get("date"))
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
  val head = createHead("chris-kipp.io", "website")
  val htmlBody = renderer.render(parsed)
  val fullHtml = putTogetherHtml(head, htmlBody)

  Page("index.html", fullHtml, None)
}

def writeToOut(page: Page): Unit = {
  ensureExists("out")
  val pw = new PrintWriter(new File(s"out/${page.name}"))
  pw.write(page.content)
  pw.close
}

def copyToOut(target: String): Unit = {
  ensureExists("out")
  if (target.contains(".")) {
    val file: File = new File(target)
    if (file.exists)
      Files.copy(
        file.toPath,
        new File(s"out/${file}").toPath,
        StandardCopyOption.REPLACE_EXISTING
      )
  } else {
    ensureExists(s"out/${target}")
    getAllFilesInDir(target)
      .foreach(f =>
        Files.copy(
          f.toPath,
          new File(s"out/${f}").toPath,
          StandardCopyOption.REPLACE_EXISTING
        )
      )
  }
}

private def ensureExists(target: String): Unit = {
  val out = new File(target)
  if (!out.isDirectory)
    out.mkdir()
}
