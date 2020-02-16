# [귤 gyul](https://github.com/ckipp01/gyul)

```scala mdoc:percentages:gyul
```

gyul is an attempt to make a small wiki engine that will seamlessly tie into my
timetracker, [ándaga](andaga.html)

For a while I found myself reverting to large frameworks for simple tasks just
because I knew the technology. There came a point where I realized the amount of
overhead they brought for such simple tasks was not always necessary. I set out
to create something small and simple. This is my effort at that endeavor. It
doesn't do a ton, but does exactly what I need it to. It's also flexible enough
that if needed to be adapted for another project, it can be. This was my first
attempt at creating something like this, and it was a huge learning experience.
Expect to see this change and grow and I adjust to fix some of the trouble
points that I know exist.

gyul works by a factory function creating an object which creates a record of
all the possible keys in the site and their relevant information. Then by
passing it the hash of the url it does a look up in the object and returns the
necessary data. If you look at the index.html page of this site you'll see what
is shown below:

```javascript
  const GYUL = Gyul()
  GYUL.package(window.location.hash)
```

This creates the main object and then the package function uses the key to
locate the correct object, iterate through the template, logs, tags, and data it
contains to create what you're seeing on each page. The structure of the GYUL
object is below:

```javascript
  GYUL
    package: rawKey => {
      iterates throw data using the template and renders the dom
    },
    showInfo: rawKey => {
      changes the main element on the page to show the main info of the current key's data
    },
    showStats: rawKey => {
      changes the main element on the page to show the stats and breakdown of the time spent on the key's entries
    },
    showTags: rawKey => {
      changes the main element on the page to show the related tags to the key
    },
    switchHeader: rawKey => {
      changes the header element on the page to match the header element found in the key's template
    },
    report: () => {
      gives a report to the console on missing projects and tags from the CRATE
    }
```

There are basically two main important script files that power gyul. One is
gyul.js where the factory function is, and all of the necessary methods to parse
the data and turn it into dom elements. The other file, template.js, does just
want it sounds like and provides multiple different templates that gyul can
choose from to determine how things are layed out.

The next iteration of this plans on doing all of this on the sever side and just
handing up the necessary data in order to not have to rely on JS on the client
side

```scala mdoc:tags:gyul
```
