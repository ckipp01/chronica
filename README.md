# chris-kipp.io 

This is the source scripts and content to generate my site
[chris-kipp.io](https://chris-kipp.io) the chronica name is kept as it was the
name I first gave the project as I started to chronicle all of this stuff.

It's written in markdown, and you can read the content in either the `/wiki` or
`/blog` directories for my wiki and blog content respectively.

The site is generated via those markdown files by a set of
[Ammonite](https://ammonite.io/) scripts, [mdoc](https://scalameta.org/mdoc/) to
embed statistics into my wiki, which are pulled from the `logs.json` file, and
[CommonMark](https://github.com/atlassian/commonmark-java) which translates all
of the markdown into html.

You can read more about how this all works [here in my
blog](https://chris-kipp.io/blog/how-is-this-site-built), or just browse around
starting with the `generate-chronica.sc` script.

The logs file is the result of my [ándaga](https://chris-kipp.io/wiki/andaga)
project, which is a project I started in the beginning of 2018 to track all of
my free time spent on projects.
