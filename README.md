# chronica

This is the source scripts to generate my site
[chris-kipp.io](https://chris-kipp.io).

It's written in markdown, and you can read the content in either the `/wiki` or
`/blog` directories for my wiki and blog content respectively.

The site is generated via those markdown files by an
[Ammonite](https://ammonite.io/) script,
[mdoc](https://scalameta.org/mdoc/) to embed statistics into my wiki,
which are pulled from the `logs.json` file, and
[Flexmark](https://github.com/vsch/flexmark-java) which translates all of the
markdown into html.

You can read more about how this all works [here in my blog](https://chris-kipp.io/how-is-this-site-built.html),
or just browse around starting with the `generate-chronica.sc` script.

The logs file is the result of my [ándaga](https://chris-kipp.io/andaga.html)
project, which is a project I started in the beginning of 2018 to track all of
my free time spent on projects.
