---
title: How is chronica built
date: 2020-02-23
---

# How is this site built?

_Wrote: 2020-02-23_

The building of this site is quite simple. I originally had a site that was
fully JavaScript powered, and built from scratch. I even created a tiny
micro-framework that I used to build it called [gyul](gyul.html). I had a lot of
fun with that build, but it was a bit slow on initial load and wouldn't work for
visitors that had JS disabled. As I got more into Scala, I wanted to simplify
things and get rid of JS. This lead me to a collection of tools and a process that
I'll explain below.


## A quick overview of the full process from log to your eyes

  1. Create a log via [ándaga-cli](andaga-cli.html) after working on a project
  2. Log gets stored into [MongoDB](https://www.mongodb.com/) by
     [ándaga-core](andaga-core.hmtl)
  3. Nightly, I have a script that runs which dumps my DB into a JSON file. This
     JSON gets commited and pushed to the [chronica](chronica.html) repo.
  4. The push triggers GitHub Actions to run. I use
     [Ammonite](https://ammonite.io), [mdoc](https://scalameta.org/mdoc/), and
     [flexmark](https://github.com/vsch/flexmark-java) to transform and enrich
     markdown into html.
  5. After building the created html pages get uploaded and hosted on [Zeit
     Now](https://zeit.co/home)
  6. A similar process happens when I add a blog post and push it up manually.

## The Generator

Below is the meat of the script that is generating the site. I read in the logs,
create a couple modifiers from mdoc. The `percentageGenerator` takes the logs
and creates the graph that you see on the top of the wiki pages. That graph
shows the total amount of time I've spent on the project and percentages of each
type of work such as coding or research. The `tagGenerator` gathers all the tags
for a certain project (which are basically related topics or projects), and then
lists them at the bottom of the page. I then process the markdown files which
embed the newly created html by the modifiers producing a new markdown file.
Following this process, all of the markdown files are read again, and processed
by flexmark creating html before being written out.

```scala
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
    case about if about.contains("about") => createPage(about, "about")
    case unknown                          => createPage(unknown, "unknown")
  }

  val homepageMarkdown: String = getFile("homepage/index.md")
  val homepageHtml: Page = createHomepage(homepageMarkdown)
  writeToOut(homepageHtml)

  for (page <- extraHtml)
    writeToOut(page)
```

## The future

This site will continually change. I have a lot more stats than I'm not showing
currently for my wiki, so I'll slowly be thinking about ways to show them and
incorporate them in a meaningful way. The style may also continually change and
be fine-tuned. I'll also semi-regularly be adding to my blog.

Thanks for stopping by.

Chris
