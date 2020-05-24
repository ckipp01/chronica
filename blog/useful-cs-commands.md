---
title: Useful cs commands
date: 2020-04-04
---

# Useful Coursier commands for every dev

_Wrote: 2020-04-04_

_Updated: 2020-04-13_

The Scala ecosystem has a lot of incredible tools, and for some reason I feel
like the we do a poor job at highlighting them as well as showing examples of how
useful they can be to us on a daily basis. One of these tools that I believe
deserves more attention than it does is [Coursier](https://get-coursier.io/).

## [Coursier](#coursier)

I often hear people mention Coursier mainly when they're talking about
[sbt](https://www.scala-sbt.org/), and how as of sbt 1.3, it ships with Coursier
out of the box and utilizes it to fetch dependencies. While that's where the
knowledge of Coursier ends for some, I want to show a few use cases of Coursier
that I think are both simple and extremely useful for daily things we do as
Scala devs.

### [Coursier CLI](#coursier-cli)

Over the past couple of weeks I've noticed my usage of Coursier CLI spike as I've
been either shown or come across new `cs` commands. `cs` is the native launcher
for Coursier. You can find information on how to install it
[here](https://get-coursier.io/docs/cli-overview) along with a nice overview of
the few commands I'll show in this post and some others I won't cover. Again,
my goal for this isn't to do an in-depth dive into all the ways you can use
`cs` but to give you some practical examples with a few commands that you should
be able to start using right away. The following examples are all real scenarios
that I came across in the last couple weeks.

### [`resolve`](#resolve)

While at work, I was in a conversation in a pull request about how my team didn't
love the Java Api of [Caffeine](https://github.com/ben-manes/caffeine), which we
were using for some caching. We came across
[Scaffeine](https://github.com/blemale/scaffeine), which is a thin Scala wrapper
around the library. Great! However, we try to be mindful of how many
dependencies we add, and the question came up of how many transitive
dependencies we'd be bringing in by including this. So the question becomes:
what is the easiest way to check this? Enter `cs resolve`. The `resolve` command
is a quick way to print out transitive dependencies of one or more other
dependencies. So, I did the following:


```sh
❯ cs resolve com.github.blemale:scaffeine_2.12:3.1.0
https://repo1.maven.org/maven2/com/github/blemale/scaffeine_2.12/3.1.0/scaffeine_2.12-3.1.0.pom
  100.0% [##########] 2.6 KiB (7.6 KiB / s)
https://repo1.maven.org/maven2/org/scala-lang/scala-library/2.12.8/scala-library-2.12.8.pom
  100.0% [##########] 1.6 KiB (26.0 KiB / s)
https://repo1.maven.org/maven2/org/scala-lang/modules/scala-java8-compat_2.12/0.9.0/scala-java8-compat_2.12-0.9.0.pom
  100.0% [##########] 2.3 KiB (14.4 KiB / s)
https://repo1.maven.org/maven2/com/github/ben-manes/caffeine/caffeine/2.8.0/caffeine-2.8.0.pom
  100.0% [##########] 5.2 KiB (25.8 KiB / s)
https://repo1.maven.org/maven2/com/google/errorprone/error_prone_annotations/2.3.3/error_prone_annotations-2.3.3.pom
  100.0% [##########] 1.7 KiB (29.5 KiB / s)
https://repo1.maven.org/maven2/org/checkerframework/checker-qual/2.10.0/checker-qual-2.10.0.pom
  100.0% [##########] 2.3 KiB (39.7 KiB / s)
https://repo1.maven.org/maven2/com/google/errorprone/error_prone_parent/2.3.3/error_prone_parent-2.3.3.pom
  100.0% [##########] 5.2 KiB (62.5 KiB / s)
com.github.ben-manes.caffeine:caffeine:2.8.0:default
com.github.blemale:scaffeine_2.12:3.1.0:default
com.google.errorprone:error_prone_annotations:2.3.3:default
org.checkerframework:checker-qual:2.10.0:default
org.scala-lang:scala-library:2.12.8:default
org.scala-lang.modules:scala-java8-compat_2.12:0.9.0:default
```

As you can see, the full artifacts weren't fetched, only the metadata necessary
to be able to list the transitive dependencies, which can be found at the
bottom. You can also get a nice tree view of this by passing in the `--tree` or
`-t` option.

```sh
❯ cs resolve -t com.github.blemale:scaffeine_2.12:3.1.0
  Result:
└─ com.github.blemale:scaffeine_2.12:3.1.0
   ├─ com.github.ben-manes.caffeine:caffeine:2.8.0
   │  ├─ com.google.errorprone:error_prone_annotations:2.3.3
   │  └─ org.checkerframework:checker-qual:2.10.0
   ├─ org.scala-lang:scala-library:2.12.8
   └─ org.scala-lang.modules:scala-java8-compat_2.12:0.9.0
      └─ org.scala-lang:scala-library:2.12.4 -> 2.12.8
```

This is such a quick way to be able to see the dependency tree of a dependency
without adding it into your build or looking through build files.

### [`install`](#install)

Another useful command is the `cs install` command which allows you to install a
launcher for a JVM-based application. The
[docs](https://get-coursier.io/docs/cli-install) do a great job at explaining
how this all works, but think of `cs install` as an `apt install` or `brew install`
alternative for JVM-based apps. You can install, update, and uninstall apps that
you want to use locally just like you would with `<enter global package manager
name here>`. For my situation, I'm a big fan of the
[mdoc](https://scalameta.org/mdoc/) tool, but I normally use it when
it's included in a project already. For this situation I just wanted to test
something locally without including it in the project. I was reviewing an
`.adoc` document and was curious if mdoc supported them the same way it does
`.md` files. So I simply did the following:

```sh
❯ cs install mdoc
...
...
...
Wrote mdoc
```

This then allowed me full access to the `mdoc` cli commands, which I could use
locally without having to include it in my project to test something out.

### [`complete`](#complete)

Speaking of mdoc, I was using it in another project, and I was curious what the
latest version was. I was actually using it in an
[Ammonite](https://ammonite.io/) script (to create this website), so I didn't
have access to the `sbt dependencyUpdates` command that I would typically use. I
ended up looking on GitHub for the version, which lead me to the site, which
lead me to the version. Ironically, I sent in a pr to add in a badge to the
readme to make the latest version more discoverable when the author of mdoc,
[Ólafur Páll Geirsson](https://twitter.com/olafurpg), introduced me to this gem:

```sh
❯ cs complete org.scalameta:mdoc_2.13:
1.3.2
1.3.4
1.3.5
1.3.6
1.4.0-RC2
1.4.0-RC3
2.0.0
2.0.1
2.0.2
2.0.3
2.1.0
2.1.1
2.1.2
2.1.3
2.1.4
2.1.5
```

`cs complete` isn't actually on the Coursier website, but you can use it to give
you all the options to complete the artifact that you are looking for. This
provides such a simple way to explore what versions are cross published and
available.

## [Tell your friends](#tell-your-friends)

I want re-iterate that I think there are a ton of great tools in the Scala
ecosystem, but not everyone is aware of them. Hopefully, the few real-life
examples above illustrate this in a small way. Next time someone mentions
Coursier, ask them if they've used any of the `cs` commands, and show them a
couple tips. Let's spread the word about the great tools we have access to.

Cheers.
