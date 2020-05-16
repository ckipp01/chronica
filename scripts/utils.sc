import $ivy.`com.atlassian.commonmark:commonmark:0.14.0`
import $ivy.`com.atlassian.commonmark:commonmark-ext-yaml-front-matter:0.14.0`
import $file.domain, domain.{Metadata, Log, Page}
import $file.head, head._
import $file.html, html._

import java.io.File
import java.io.PrintWriter

import scala.collection.JavaConverters._
import scala.io.Source

import org.commonmark.node.Node
import org.commonmark.ext.front.matter.YamlFrontMatterExtension
import org.commonmark.ext.front.matter.YamlFrontMatterVisitor
import org.commonmark.parser.Parser
import org.commonmark.renderer.html.HtmlRenderer
import os.Path
import os.read
import os.write
import os.pwd
import os.makeDir
import os.exists

private val extensions = Seq(
  YamlFrontMatterExtension.create()
).asJava

implicit val parser = Parser.builder().extensions(extensions).build()
implicit val renderer = HtmlRenderer.builder().extensions(extensions).build()

def getLogs(fileLoc: Path): List[Log] = {
  val rawLogs = read(fileLoc)

  ujson
    .read(rawLogs)
    .arr
    .map(Log(_))
    .toList
}

def createOverview(
    logs: List[Log],
    pageList: Seq[Page],
    topic: String
): Page = {
  val ogType =
    if (topic == "blog") "blog"
    else "website"
  val head = createHead(topic.replace("-", " ").capitalize, ogType)
  val nav = createNav(topic)
  val htmlBody = createList(pageList, topic, logs)
  val fullHtml = putTogetherHtml(head, nav, htmlBody)

  println(s"---- created ${topic} overview ----")
  Page("index.html", fullHtml, None)
}

def createPage(
    fileLoc: Path,
    fileType: String
)(implicit parser: Parser, renderer: HtmlRenderer): Page = {
  val markdown = read(fileLoc)

  val parsed = parser.parse(markdown)
  val metaData = retrieveMetaData(parsed)
  val topic = metaData.title
    .getOrElse(fileLoc.baseName)
    .toLowerCase
  val ogType =
    if (fileType == "blog") "blog"
    else "website"
  val head = createHead(topic.capitalize, ogType)
  val nav = createNav(fileType)
  val htmlBody = renderer.render(parsed)
  val fullHtml = putTogetherHtml(head, nav, htmlBody)
  val fileName = topic.replace(" ", "-") + ".html"

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
    fileLoc: Path
)(implicit parser: Parser, renderer: HtmlRenderer): Page = {
  val markdown = read(fileLoc)

  val parsed = parser.parse(markdown)
  val head = createHead("chris-kipp.io", "website")
  val htmlBody = renderer.render(parsed)
  val fullHtml = putTogetherHtml(head, htmlBody)

  Page("index.html", fullHtml, None)
}

def writeToOut(page: Page): Unit = {
  write.over(pwd / 'out / page.name, page.content)
}

def writeToOut(page: Page, directory: String): Unit = {
  if (!exists(pwd / 'out / directory)) makeDir(pwd / 'out / directory)
  write.over(pwd / 'out / directory / page.name, page.content)
}
