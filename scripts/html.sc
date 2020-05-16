import $file.domain, domain._

def retrieveFileName(fileLoc: String) =
  fileLoc.split("/").last.dropRight(3)

def putTogetherHtml(
    head: String,
    nav: String,
    body: String
): String =
  s"""|<html lang="en">
      |  ${head}
      |  <body>
      |  ${nav}
      |  <main>${body}</main>
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
  val sorted =
    if (topic == "blog") pageList.sorted
    else pageList.sortBy(_.name)

  val list = sorted.foldLeft("") { (acc, next) =>
    val name = (for {
      metadata <- next.metadata
      name <- metadata.title
    } yield name).getOrElse(retrieveFileName(next.name))

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
