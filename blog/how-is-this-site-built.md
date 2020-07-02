---
title: How is this site built
date: 2020-02-23
description: A short overview of how this site is built.
---

# How is this site built?

_Published: 2020-02-23_

_Updated: 2020-05-24_

The building of this site is quite simple. I originally had a site that was
fully JavaScript powered, and built from scratch. I even created a tiny
micro-framework that I used to build it called [gyul](/wiki/gyul). I had a lot
of fun with that build, but it was a bit slow on initial load and wouldn't work
for visitors that had JS disabled. As I got more into Scala, I wanted to see if
I could generate my site using it instead of JS. This lead me to a collection of
tools and a process that I'll explain below.


## [A quick overview of the full process from log to your eyes](#a-quick-overview-of-the-full-process-from-log-to-your-eyes)

  1. Create a log via [ándaga-cli](/wiki/andaga-cli) for a task that I'm working
     on
  2. Log gets stored into [MongoDB](https://www.mongodb.com/) by
     [ándaga-core](/wiki/andaga-core)
  3. Nightly, I have a script that runs which dumps my DB into a JSON file. This
     JSON gets committed and pushed to the [chronica](/wiki/chronica) repo.
  4. The push triggers GitHub Actions to run. I use
     [Ammonite](https://ammonite.io), [mdoc](https://scalameta.org/mdoc/), and
     [CommonMark](https://github.com/atlassian/commonmark-java) to transform and
     enrich markdown into html.
  5. After building the created html pages get uploaded and hosted on
     [Vercel](https://vercel.com)
  6. A similar process happens when I add a blog post and push it up manually.

## [The Core](#the-core)

Below is the base of the script that is generating the site. First I read in the
logs and create a couple modifiers for mdoc. The `percentageGenerator` takes the
logs and creates the graph that you see on the top of the wiki pages. That graph
shows the total amount of time I've spent on the project and percentages of each
type of work such as coding or research. The `tagGenerator` gathers all the tags
for a certain project (which are basically related topics or projects), and then
lists them at the bottom of the page. I then process the markdown files which
embed the newly created html by the modifiers producing a new markdown file.
Following this process, all of the markdown files are read again, and processed
by CommonMark creating html before being written out.

```scala
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
  val wikiPages: Seq[Page] = wikiMarkdownPaths.map(createPage(_, "wiki", logs))
  val wikiOverviewPage: Page = createOverview(logs, wikiPages, "wiki")

  for (page <- (wikiPages :+ wikiOverviewPage))
    writeToOut(page, "wiki")

  val blogMarkdownPaths: Seq[Path] = (ls ! pwd / 'blog).filter(_.ext == "md")
  val blogPages: Seq[Page] = blogMarkdownPaths.map(createPage(_, "blog", logs))
  val blogOverviewPage: Page = createOverview(logs, blogPages, "blog")

  for (page <- (blogPages :+ blogOverviewPage))
    writeToOut(page, "blog")

  val extraMarkdownPaths: Seq[Path] = (ls ! pwd / 'extras).filter(_.ext == "md")
  val extraHtml: Seq[Page] = extraMarkdownPaths.map {
    case about if about.baseName == "about" => createPage(about, "about", logs)
    case unknown                            => createPage(unknown, "uknown", logs)
  }

  val homepageHtml: Page = createHomepage(pwd / 'homepage / "index.md")
  writeToOut(homepageHtml)

  for (page <- extraHtml)
    writeToOut(page)
```

## [The future](#the-future)

This site will continually change. I have a lot more stats that I'm not showing
currently for my wiki, so I'll slowly be thinking about ways to show them and
incorporate them in a meaningful way. This is what you're already seeing at the
top of the page, a graph showing my activity since I started
[chronica](/wiki/chronica). The style may also continually change and be
fine-tuned. I'll also semi-regularly be adding to the [blog](/blog). I'm a big
advocate of maintaining your own blog. It's quite easy to get up and running
with various tools, and you fully own and manage your own content. It's worth
the extra effort in my opinion.

Thanks for stopping by.

Chris
