import $file.domain, domain._
import java.time.LocalDate

def retrieveFileName(fileLoc: String) =
  fileLoc.split("/").last.dropRight(3)

def putTogetherHtml(
    head: String,
    header: String,
    nav: String,
    body: String
): String =
  s"""|<html lang="en">
      |  ${head}
      |  <body>
      |  ${header}
      |  <div id="main">
      |    ${nav}
      |    <main>${body}</main>
      |  </div>
      |</html>""".stripMargin

def putTogetherHtml(
    head: String,
    body: String
): String =
  s"""|<html lang="en">
      |  ${head}
      |  <body id="home">
      |  <main>${body}</main>
      |</html>""".stripMargin

def createHeader(logs: List[Log]) = {
  val existingTotals = logs
    .groupBy(_.date)
    .mapValues(_.map(_.time).reduce(_ + _))

  val filledWithMissing =
    LocalDate
      .of(2018, 1, 1)
      .toEpochDay
      .until(LocalDate.now().toEpochDay())
      .map { date =>
        val key = LocalDate.ofEpochDay(date).toString()
        key -> existingTotals.getOrElse(key, 0)
      }
      .toSeq
      .sortBy(_._1)

  val totalLogged = existingTotals.map(_._2).sum
  val highestDay = filledWithMissing.map(_._2).max

  val points = filledWithMissing
    .map {
      case (_, total) => {
        100 - (total.toFloat / highestDay * 100).round
      }
    }
    .zipWithIndex
    .map {
      case (v, h) => s"${h.toString},${v.toString}"
    }
    .mkString("", " ", "")

  s"""|<header>
      |<div id="graph-bar">
      |  <svg viewBox="0 0 ${filledWithMissing.size} 100" height=100% width=100% preserveAspectRatio="none">
      |   <polyline points="${points}" style="fill:none;stroke:black;stroke-width:1"/>
      |  </svg>
      |</div>
      |</header>
      |""".stripMargin
}

def createNav(pageType: String) = {
  val wiki =
    if (pageType == "wiki")
      """<li><a href="/wiki" class="active">wiki</a></li>"""
    else """<li><a href="/wiki">wiki</a></li>"""

  val blog =
    if (pageType == "blog")
      """<li><a href="/blog" class="active">blog</a></li>"""
    else """<li><a href="/blog">blog</a></li>"""

  val about =
    if (pageType == "about")
      """<li><a href="/about" class="active">about</a></li>"""
    else """<li><a href="/about">about</a></li>"""

  s"""|<nav>
      |  <h1 id="chronica"><a href="/">chris kipp</a></h1>
      |  <ul>
      |   $wiki
      |   $blog
      |   $about
      |  </ul>
      |</nav>""".stripMargin
}

def createList(
    pageList: Seq[Page],
    topic: String,
    logs: List[Log]
): String = {
  def getName(page: Page) =
    (for {
      metadata <- page.metadata
      name <- metadata.title
    } yield name).getOrElse(retrieveFileName(page.name))

  val sorted =
    if (topic != "blog")
      pageList
        .map { page =>
          val mostRecentLog = logs
            .find(log => log.project == getName(page))
            .map(_.date)
          page -> mostRecentLog
        }
        .sortBy(_._2)
        .reverse
        .map(_._1)
    else
      pageList

  val list = sorted.foldLeft("") { (acc, next) =>
    val name = getName(next)
    val topicLogs: List[Log] = logs.filter(_.project == name)
    val totalTime = topicLogs.foldLeft(0)(_ + _.time)
    val details =
      if (totalTime > 0 && topic == "wiki") {
        s"- <em>${topicLogs.size} logs for ${totalTime} minutes</em>"
      } else if (topic == "blog") {
        val date = for {
          metadata <- next.metadata
          date <- metadata.date
        } yield date
        date.fold("")(date => s"- <em>$date</em>")
      } else {
        ""
      }

    val displayName =
      if (topic == "blog") name.replace('-', ' ')
      else name

    val linkName = name.replace(' ', '-').toLowerCase

    acc + s"""<li><a href="${topic}/${linkName}">$displayName</a> $details</li>"""
  }

  s"""|<h1>$topic</h1>
      |<ul>$list</ul>
      |""".stripMargin
}
