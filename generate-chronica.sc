import $file.domain, domain.{ Log, Page }
import $file.modifiers, modifiers._
import $file.utils, utils._

import java.nio.file.Paths
import scala.io.Source

println("""|
           |      generating chronica
           |===============================
           |""".stripMargin)

val logs: List[Log] = getLogs("./logs.json")
val percentageGenerator = new PercentageGenerator(logs)
val tagGenerator = new TagGenerator(logs)

val mdocSettings = mdoc
  .MainSettings()
  .withIn(Paths.get("wiki"))
  .withStringModifiers(List(percentageGenerator, tagGenerator))
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
