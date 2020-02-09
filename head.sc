def putTogetherHtml(head: String, partialHtml: String): String =
  s"""|<html lang="en">
      |  ${head}
      |  <body>
      |    <nav>
      |      <span id="chronica">chronica</span>
      |      <ul>
      |        <li><a href="wiki.html" class="active">wiki</a></li>
      |        <li><a href="posts.html">posts</a></li>
      |        <li><a href="about.html">about</a></li>
      |      </ul>
      |   </nav>
      |  <main>${partialHtml}</main>
      |</html>""".stripMargin

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
     |body {
     |  display: flex;
     |  flex-direction: column;
     |  justify-content: center;
     |  font: 18px/1.6 sans-serif;
     |  background: rgb(252, 243, 217)
     |}
     |nav {
     |  margin: 20px 30px;
     |  border-bottom: double;
     |  padding-bottom: 10px;
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
     |}
     |a {
     |  text-decoration: underline dotted;
     |}
     |a:hover {
     |
     |}
     |h1 {
     |  font: 1.3em/1.3 sans-serif;
     |  margin-bottom: 10px;
     |}
     |code,codeblock {
     |  font: 0.9em/1.3 monospace;
     |  margin: 10px 0;
     |}
     |blockquote {
     |  text-align: center;
     |}
     |#chronica {
     |  text-decoration: underline double;
     |  font-size: 1.2em;
     |}
     |.code {
     |  fill: rgb(250, 194, 43);
     |}
     |.explore {
     |  fill: rgb(4, 19, 142);
     |}
     |.study {
     |  fill: rgb(212, 42, 32);
     |}
     |.research {
     |  fill: rgb(48, 107, 52);
     |}
     |.admin {
     |  fill: rgb(228, 87, 46);
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
