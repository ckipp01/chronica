def createHead(title: String)(implicit style: String): String =
  s"""|<head>
      |  <meta charset="utf-8">
      |  <meta name="description" content="Personal wiki and blog for Chris Kipp">
      |  <meta name="viewport" content="width=device-width, initial-scale=1">
      |  <meta name="keywords" content="Chris Kipp, ckipp01, ckipp">
      |  <meta name="thumbnail" content="https://avatars3.githubusercontent.com/u/13974112?s=400&v=4">
      |  <meta name="twitter:card" content="summary">
      |  <meta name="twitter:site" content="@ckipp01">
      |  <meta name="twitter:title" content="chris kipp">
      |  <meta name="twitter:description" content="Personal wiki and blog for Chris Kipp">
      |  <meta name="twitter:creator" content="ckipp01">
      |  <meta name="twitter:image" content="https://avatars3.githubusercontent.com/u/13974112?s=400&v=4">
      |  <link rel="icon" href="media/favicon.ico" type="image/x-icon" />
      |  <style>${style}</style>
      |  <title>${title}</title>
      |  <script async src="https://ckipp01-ackee.herokuapp.com/tracker.js" data-ackee-server="https://ckipp01-ackee.herokuapp.com" data-ackee-domain-id="86b83090-f336-40e2-90e4-8211a8561093"></script>
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
     |#home main {
     |  display: flex;
     |  flex-direction: column;
     |  align-items: center;
     |  margin-top: 25vh;
     |}
     |a {
     |  text-decoration: underline;
     |  text-decoration-style: dashed;
     |  text-decoration-skip-ink: none;
     |}
     |a:hover, ::selection {
     |  background: var(--dark-color);
     |  color: var(--light-color);
     |}
     |h1 {
     |  font: 1.4em/1.3 sans-serif;
     |  margin-bottom: 20px;
     |}
     |h2 {
     |  font: 1.3em/1.3 sans-serif;
     |}
     |h3 {
     |  font: 1.2em/1.3 sans-serif;
     }
     |h2, h3, h5 {
     |  margin: 20px 0;
     |}
     |p, main li {
     |  margin-bottom: 5px;
     |}
     |code, codeblock {
     |  font: 0.9em/1.3 monospace;
     |}
     |pre {
     |  overflow: auto;
     |  margin: 15px 0;
     |}
     |blockquote {
     |  text-align: center;
     |  font-style: italic;
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
     |img {
     |  display: block;
     |  margin: auto;
     |  max-width: 100%;
     |  max-height: 300px;
     |}
     |#chronica {
     |  text-decoration: underline;
     |  text-decoration-style: doubled;
     |  font-size: 1.2em;
     |}
     |#home {
     |  height: 100vh;
     |}
     |#home h1 {
     |  text-decoration: underline double;
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
     |  justify-content: center;
     |}
     |.tags-container > p {
     |  margin: 5px;
     |}
     |@media (min-width: 768px) {
     | body {
     |  flex-direction: row;
     | }
     | nav {
     |   margin: 30px 5px;
     |   min-width: 125px;
     |   width: 100px;
     |   border: none;
     | }
     | main {
     |   margin: 30px;
     | }
     |}
     |""".stripMargin
