import $file.scripts.domain, domain.{Log, Page}
import $file.scripts.modifiers, modifiers._
import $file.scripts.utils, utils._

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
val wikiPages: List[Page] = wikiMarkdown.map(createPage(_, "wiki"))
val wikiOverviewPage: Page = createOverview(logs, wikiPages, "wiki")

for (page <- (wikiOverviewPage :: wikiPages))
  writeToOut(page)

val blogMarkdown: List[String] = getListOfFiles("blog")
val blogPages: List[Page] = blogMarkdown.map(createPage(_, "blog"))
val blogOverviewPage: Page = createOverview(logs, blogPages, "blog")

for (page <- (blogOverviewPage :: blogPages))
  writeToOut(page)

val extraMarkdown: List[String] = getListOfFiles("extras")
val extraHtml: List[Page] = extraMarkdown.map {
  case about if about.contains("about") => createPage(about, "about")
  case unknown                          => createPage(unknown, "uknown")
}

val homepageMarkdown: String = getFile("homepage/index.md")
val homepageHtml: Page = createHomepage(homepageMarkdown)
writeToOut(homepageHtml)

for (page <- extraHtml)
  writeToOut(page)

println(s"""|
            |         finished generating chronica
            |============================================
            |""".stripMargin)
