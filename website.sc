import $file.scripts.domain, domain.{Log, Page}
import $file.scripts.modifiers, modifiers._
import $file.scripts.utils, utils._

import java.nio.file.Paths

import ammonite.main.Router._
import ammonite.ops._

@doc("Fully generate the website and copy over necessary extras")
@main
def generate() = {
  generateCore()
  copyExtras()
}

@doc(
  "This will generate the core of the site -- homepage, about, wiki, and blog"
)
@main
def generateCore() = {
  println("""
             |      generating site
             |============================
             |""".stripMargin)

  val logs: List[Log] = getLogs(pwd/"logs.json")
  val percentageGenerator = new PercentageGenerator(logs)
  val tagGenerator = new TagGenerator(logs)

  val mdocSettings = mdoc
    .MainSettings()
    .withIn(Paths.get("wiki"))
    .withStringModifiers(List(percentageGenerator, tagGenerator))
    .withNoLinkHygiene(true)

  mdoc.Main.process(mdocSettings)

  val wikiMarkdown: List[String] = getAllMarkdown("out")
  val wikiPages: List[Page] = wikiMarkdown.map(createPage(_, "wiki"))
  val wikiOverviewPage: Page = createOverview(logs, wikiPages, "wiki")

  for (page <- (wikiOverviewPage :: wikiPages))
    writeToOut(page, "wiki")

  val blogMarkdown: List[String] = getAllMarkdown("blog")
  val blogPages: List[Page] = blogMarkdown.map(createPage(_, "blog"))
  val blogOverviewPage: Page = createOverview(logs, blogPages, "blog")

  for (page <- (blogOverviewPage :: blogPages))
    writeToOut(page, "blog")

  val extraMarkdown: List[String] = getAllMarkdown("extras")
  val extraHtml: List[Page] = extraMarkdown.map {
    case about if about.contains("about") => createPage(about, "about")
    case unknown                          => createPage(unknown, "uknown")
  }

  val homepageHtml: Page = createHomepage("homepage/index.md")
  writeToOut(homepageHtml)

  for (page <- extraHtml)
    writeToOut(page)

  println(s"""
              |         finished generating site
              |==========================================
              |""".stripMargin)
}

@doc("Copies over extras from their directories to out/")
@main
def copyExtras() = {
  cp.over(pwd/'presentations, pwd/'out/'presentations)
  cp.over(pwd/'media, pwd/'out/'media)
  cp.over(pwd/"now.json", pwd/'out/"now.json")
}
