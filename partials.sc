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

def createNav(pageType: String) = {
  val wiki =
    if (pageType == "wiki") """<li><a href="wiki.html" class="active">wiki</a></li>"""
    else """<li><a href="wiki.html">wiki</a></li>"""

  val blog =
    if (pageType == "blog") """<li><a href="blog.html" class="active">blog</a></li>"""
    else """<li><a href="blog.html">blog</a></li>"""

  val about =
    if (pageType == "about") """<li><a href="about.html" class="active">about</a></li>"""
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
      if (totalTime > 0) s"- <em>${topicLogs.size} logs for ${totalTime}</em>"
      else ""

    acc + s"""<li><a href="${name}.html">$name</a> $details</li>"""
  }

  s"""|<h1>$topic</h1>
      |<ul>$list</ul>
      |""".stripMargin
}

def createHead(title: String)(implicit style: String): String =
  s"""|<head>
      |  <meta charset="utf-8">
      |  <meta name="description" content="Wiki for the chronica ecosystem.">
      |  <meta name="viewport" content="width=device-width, initial-scale=1">
      |  <meta name="keywords" content="Chris Kipp, ckipp01, ckipp, wiki.chronica, chronica">
      |  <meta name="thumbnail" content="media/c.png">
      |  <meta name="twitter:card" content="summary">
      |  <meta name="twitter:site" content="@ckipp01">
      |  <meta name="twitter:title" content="wiki.chronica">
      |  <meta name="twitter:description" content="Wiki for the chronica ecosystem.">
      |  <meta name="twitter:creator" content="ckipp01">
      |  <meta name="twitter:image" content="media/c.png">
      |  <link rel="icon" href="media/favicon.ico" type="image/x-icon" />
      |  <style>${style}</style>
      |  <title>wiki.chronica - ${title}</title>
      |</head>
      |""".stripMargin

implicit val style: String =
  """|* {
     |  margin:0;
     |  padding:0;
     |  border:0;
     |  outline:0;
     |  border-spacing:0;
     |  text-decoration:none;
     |  font-weight:inherit;
     |  font-style:inherit;
     |  color:inherit;
     |  font-size:100%;
     |  font-family:inherit;
     |  vertical-align:baseline;
     |  list-style:none;
     |  border-collapse:collapse;
     |  -webkit-font-smoothing: antialiased;
     |  -moz-osx-font-smoothing: grayscale;
     |}
     |*:focus {
     |  outline: none
     |}
     |:root {
     |  --dark-color: #000;
     |  --light-color: rgb(252, 243, 217);
     |  --code-color: rgb(250, 194, 43);
     |  --explore-color: rgb(4, 19, 142);
     |  --study-color: rgb(212, 42, 32);
     |  --research-color: rgb(48, 107, 52);
     |  --admin-color: rgb(228, 87, 46);
     |  --write-color: rgb(135, 0, 88);
     |}
     |body {
     |  display: flex;
     |  flex-direction: column;
     |  justify-content: center;
     |  font: 18px/1.6 sans-serif;
     |  background: var(--light-color)
     |}
     |nav {
     |  margin: 20px 30px;
     |  border-bottom: double;
     |  padding-bottom: 10px;
     |}
     |nav li {
     |  list-style-type: none;
     |  margin-left: 5px;
     |}
     |nav a {
     |  text-decoration: none;
     |}
     |nav a.active::after {
     |  content: "\25cf";
     |  margin: 0 10px;
     |}
     |nav a:hover:after {
     |  content: "\25cf";
     |  margin: 0 10px;
     |}
     |main {
     |  max-width: 640px;
     |  margin: 0 30px;
     |  flex: 1;
     |}
     |a {
     |  text-decoration: underline dashed;
     |}
     |a:hover, ::selection {
     |  background: var(--dark-color);
     |  color: var(--light-color);
     |}
     |h1 {
     |  font: 1.3em/1.3 sans-serif;
     |}
     |h2 {
     |  font: 1.2em/1.3 sans-serif;
     |}
     |h1, h2, h5 {
     |  margin-bottom: 10px;
     |}
     |p {
     |  margin-bottom: 5px;
     |}
     |code, codeblock {
     |  font: 0.9em/1.3 monospace;
     |  margin: 10px 0;
     |}
     |pre {
     |  overflow: auto;
     |  margin: 5px 0;
     |}
     |blockquote {
     |  text-align: center;
     |}
     |li {
     |  list-style-type: circle;
     |  margin-left: 25px;
     |}
     |svg {
     |  margin: 10px 0;
     |}
     |em {
     |  font-size: 0.8em;
     |  font-style: italic;
     |}
     |#chronica {
     |  text-decoration: underline double;
     |  font-size: 1.2em;
     |}
     |.category-totals {
     |  text-align: center;
     |}
     |.code {
     |  fill: var(--code-color);
     |}
     |.explore {
     |  fill: var(--explore-color);
     |}
     |.study {
     |  fill: var(--study-color);
     |}
     |.research {
     |  fill: var(--research-color);
     |}
     |.admin {
     |  fill: var(--admin-color);
     |}
     |.write {
     |  fill: var(--write-color);
     |}
     |.keys-container {
     |  display: flex;
     |  flex-wrap: wrap;
     |  justify-content: center;
     |}
     |.key-block {
     |  display: flex;
     |  align-items: center;
     |  margin: 0 .5em;
     |}
     |.key-color {
     |  margin: 0 0.25em .25em 0;
     |}
     |.tags-container {
     |  display: flex;
     |  flex-wrap: wrap;
     |  justify-content: space-around;
     |}
     |@media (min-width: 768px) {
     | body {
     |  flex-direction: row;
     | }
     | nav {
     |   margin: 30px 0;
     |   width: 100px;
     |   border: none;
     | }
     | main {
     |   margin: 30px;
     | }
     |}
     |""".stripMargin