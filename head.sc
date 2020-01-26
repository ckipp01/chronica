def putTogetherHtml(head: String, partialHtml: String): String =
  s"""|
      |<html lang="en">
      |  ${head}
      |  <body>
      |    <nav>
      |      <ul>
      |        <li>about</li>
      |        <li>wiki</li>
      |        <li>posts</li>
      |      </ul>
      |   </nav>
      |  <main>${partialHtml}</main>
      |</html>""".stripMargin

def createHead(title: String)(implicit style: String): String =
  s"""|
      |<head>
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
  """|
     |* {
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
     |  justify-content: center;
     |  font: 18px/1.6 sans-serif;
     |}
     |nav {
     |  margin: 20px;
     |}
     |main {
     |  max-width: 640px;
     |  margin: 20px;
     |}
     |""".stripMargin
