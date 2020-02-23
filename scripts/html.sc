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
      """<li><a href="wiki.html" class="active">wiki</a></li>"""
    else """<li><a href="wiki.html">wiki</a></li>"""

  val blog =
    if (pageType == "blog")
      """<li><a href="blog.html" class="active">blog</a></li>"""
    else """<li><a href="blog.html">blog</a></li>"""

  val about =
    if (pageType == "about")
      """<li><a href="about.html" class="active">about</a></li>"""
    else """<li><a href="about.html">about</a></li>"""

  s"""|<nav>
      |  <h1 id="chronica"><a href="/">chronica</a></h1>
      |  <ul>
      |   $wiki
      |   $blog
      |   $about
      |  </ul>
      |</nav>""".stripMargin
}

def createList(
    fileList: List[String],
    topic: String,
    logs: List[Log]
): String = {
  val list = fileList.sorted.foldLeft("") { (acc, next) =>
    val name = retrieveFileName(next)
    val topicLogs: List[Log] = logs.filter(_.project == name)
    val totalTime = topicLogs.foldLeft(0)(_ + _.time)
    val details =
      if (totalTime > 0)
        s"- <em>${topicLogs.size} logs for ${totalTime} minutes</em>"
      else ""
    val displayName =
      if (topic == "blog") name.replace('-', ' ')
      else name

    acc + s"""<li><a href="${name}.html">$displayName</a> $details</li>"""
  }

  s"""|<h1>$topic</h1>
      |<ul>$list</ul>
      |""".stripMargin
}
