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

  val logs: List[Log] = getLogs(pwd / "logs.json")
  val topics: Seq[String] = (ls ! pwd / 'wiki).map(_.baseName)
  val percentageGenerator = new PercentageGenerator(logs)
  val tagGenerator = new TagGenerator(logs, topics)

  val mdocSettings = mdoc
    .MainSettings()
    .withIn(Paths.get("wiki"))
    .withStringModifiers(List(percentageGenerator, tagGenerator))
    .withNoLinkHygiene(true)

  mdoc.Main.process(mdocSettings)

  val wikiMarkdownPaths: Seq[Path] = (ls ! pwd / 'out).filter(_.ext == "md")
  val wikiPages: Seq[Page] = wikiMarkdownPaths.map(createPage(_, "wiki"))
  val wikiOverviewPage: Page = createOverview(logs, wikiPages, "wiki")

  for (page <- (wikiPages :+ wikiOverviewPage))
    writeToOut(page, "wiki")

  val blogMarkdownPaths: Seq[Path] = (ls ! pwd / 'blog).filter(_.ext == "md")
  val blogPages: Seq[Page] = blogMarkdownPaths.map(createPage(_, "blog"))
  val blogOverviewPage: Page = createOverview(logs, blogPages, "blog")

  for (page <- (blogPages :+ blogOverviewPage))
    writeToOut(page, "blog")

  val extraMarkdownPaths: Seq[Path] = (ls ! pwd / 'extras).filter(_.ext == "md")
  val extraHtml: Seq[Page] = extraMarkdownPaths.map {
    case about if about.baseName == "about" => createPage(about, "about")
    case unknown                            => createPage(unknown, "uknown")
  }

  val homepageHtml: Page = createHomepage(pwd / 'homepage / "index.md")
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
  cp.over(pwd / 'presentations, pwd / 'out / 'presentations)
  cp.over(pwd / 'media, pwd / 'out / 'media)
  cp.over(pwd / "now.json", pwd / 'out / "now.json")
}

@doc("Blows away the out directory")
@main
def clean() = {
  rm ! pwd / 'out
}
