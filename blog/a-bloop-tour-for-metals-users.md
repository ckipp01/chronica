---
title: A Bloop Tour for Metals users
date: 2020-05-24
---

# A Bloop Tour for Metals users

_Wrote: 2020-05-24_

Many of the common questions I see around the Metals ecosystem have to do with
Bloop. Questions like _What is Bloop?_, _What's Bloops role in Metals?_, and
_What's the Bloop CLI do?_ are somewhat commonplace. If we step outside of the
Metals world, the mystery is even more enhanced. I've talked to seasoned Scala
devs before that didn't really know about Bloop. All this makes it a perfect
candidate for this mini-series on under-appreciated Scala tools after my last
[Coursier post](/blog/useful-cs-commands). I don't pretend to be an expert in
Bloop at all, but I've been lucky enough to work closely with those that are,
and I've hopefully been able to pick up enough to help spread the word,
especially in relation to [Metals](https://scalameta.org/metals/).

## [What is Bloop](#what-is-bloop)

First things first, taken straight from the [Bloop
website](https://scalacenter.github.io/bloop/docs/what-is-bloop), Bloop is a
build server and CLI tool for the Scala programming language spearheaded by
[Jorge Vicente Cantero](https://twitter.com/jvican) and [Martin
Duhem](https://twitter.com/mnduhem) while at the [Scala
Center](https://scala.epfl.ch/). Bloop has two main goals:

1. Compile, test, and run Scala code as fast as possible
2. Integrate easily with build tools, command-line applications, editors, and
   custom tooling

While those two points are quite clear, there are a couple other points worth
noting to help with the general understanding of Bloop. Firstly, Bloop is a
server, and like other servers, it responds to requests from _clients_, which
can be something like Metals, which is communicating with Bloop via the [Build
Server Protocol
(BSP)](https://github.com/build-server-protocol/build-server-protocol), or Bloop
CLI, which is communicating with Bloop via the [Nailgun server
protocol](https://github.com/facebook/nailgun). They can be happening
concurrently, they cache compilations across different clients, and offer client
isolation to avoid conflicts in a shared, stateful file system.

The [_What is Bloop_](https://scalacenter.github.io/bloop/docs/what-is-bloop)
portion of the website does a great job at outlining in more detail what I have
listed above, along with some of the design goals of the project.

## [Metals and Bloop](#metals-and-bloop)

If you've seen any of the presentations done about Metals then you'll probably
have seen a graphic similar to what I have below. However, the one below is a
bit more simplified showing only one language client and one build tool.

![BSP + LSP diagram](/media/diagram.png)

This diagram is meant to show Bloop's part in the flow from build definition to
your editor of choice. If you start on the left, you have your build definition
in sbt for example. If you've used Metals before, you'll notice that when you
first open up a project, you'll be prompted to _Import Your Build_. What does
this mean? The first time this happens, it means that Metals detects that you
have no `.bloop` directory, and therefore you need to import your build. When
using sbt this means that Metals actually adds the `sbt-bloop` plugin to your
build in `project/metals.sbt`. It then issues an `sbt bloopInstall` command
which will dump out your build definition for all of your modules into JSON 
files, which you can see if you open up your `.bloop` directory in your
workspace. These files contain things like your directory information, what
dependencies your module has on other modules, all your classpath information,
and more. Go ahead and take a look at everything in there. Once this information
is gathered, Metals tells Bloop to compile your project.

At this point, if there are any errors during compilation, diagnostics are
forwarded from Bloop to Metals, to your client for you to see. If you then fix
the diagnostic, hit save, the save event is sent to Metals, which then forwards
that to Bloop to compile what has been changed. You can start to imagine the
flow from the diagram above.

At this point, one of the questions you may have is how does Bloop start? Does
Metals start it? Does Metals install Bloop? There can only be one Bloop server
running on a machine. So when Metals is about to start, one of two things
happens. Using [Bloop
Launcher](https://scalacenter.github.io/bloop/docs/launcher-reference) either a
Bloop server is detected and running, which Metals connects to, or the launcher
starts one.

If you've ever used the debugging features in Metals, you're also utilizing the
DAP (Debug Adaptor
Protocol)[https://microsoft.github.io/debug-adapter-protocol/] support that
Bloop offers. You can find the entire [debugging reference
here](https://scalacenter.github.io/bloop/docs/debugging-reference).

## [Bloop CLI](#bloop-cli)

Especially for Metals users, I highly recommend using Bloop CLI when you have a
simple workflow of compiling, testing, compiling, etc. Up above we mentioned
that compilations are cached for different clients. The power in this can be
witnessed when you're in Metals, have you project compiled, and can run a
test via the Bloop CLI and see it start basically immediately without another
compilation happening. Personally, I've fully moved from running tests through
sbt to running them through Bloop CLI simply because of how much faster it is
for me to go from executing the `bloop test <project>` to seeing the test run.
If you run the same test through sbt you normally have both a longer startup
time and also compilation that needs to happen.

Many of the things that you would imagine using like, targeting a specific test
suite, watching a test suite, passing in arguments, or testing upstream projects
all exist. However, there are a few differences and things worth pointing out. 

### [Pointers](#pointers)

- You can't run `bloop compile` or `bloop test` without specifying a project.
    You need to use command substitution like below if you want to compile or
    test all projects. There is no implicit root project.

```shell
❯ bloop compile $(bloop projects)
...
```

- By default compilation requires compilation of all downstream projects,
    however, to compile upstream projects (transitive projects) that depend on
    your project, use the `--cascade` flag.

```shell
❯ bloop compile --cascade root
Compiling root (1 Scala source)
Compiled root (982ms)
Compiling root-test (1 Scala source)
Compiled root-test (344ms)
```

- If you want to clean your cache and ensure that you have all downstream
    projects cleaned as well, use the `--propagate` flag.

```shell
❯ bloop clean --propagate root
```

- When running test suites, Bloop offers completions on your suite names.
    In order for this to work you need to make sure you have fully compiled
    before you'll see completions offered.

- One thing to keep in mind is that the Bloop CLI doesn't fully replace the need
    for sbt shell or commands. More advanced custom workflows still need to be
    configured and done via sbt like publishing, packaging, and other
    integrations with things like Docker, native images, etc.

- If you need a repl, `bloop console` will drop you into an [Ammonite
    shell](https://ammonite.io/) in the targeted project.

```shell
❯ bloop console root
Loading...
Welcome to the Ammonite Repl 2.1.4-2-ef9b0a0 (Scala 2.12.11 Java 1.8.0_242)
@
```

- You can generate [graphviz](https://graphviz.org/) diagrams to view your
    dependencies with a command like the one found below.

```sh
❯ bloop projects --dot-graph | dot -Tsvg -o metals-diagram.svg && open metals-diagram.svg
```

![metals graphviz diagram](/media/metals-diagram.svg)

## [Takeaways and Things to keep in mind](#takeaways-and-things-to-keep-in-mind)

- Whenever you run, test, or debug in Metals, it's all being powered by Bloop.
- Compilations are cached. Consider using the Bloop CLI rather than your build
    tool to run your tests. You can actually witness this _compile
    deduplication_ if you are watching a test with `-w` and also compiling a
    project with Metals. You'll see a message like this in your bloop output:

```shell
Deduplicating compilation of root from bsp client 'Metals 0.9.0+139-c169b4ce-SNAPSHOT' (since 39.439s)
```

- The Bloop CLI [portion of the
    website](https://scalacenter.github.io/bloop/docs/cli/tutorial) has a great
    tutorial that goes through usage of the tool, all the flags, etc. It's a
    great guide to get started with if you haven't used the Bloop CLI at all
    yet, or want to freshen up on all the available flags.
- There are _many_ integrations with Bloop including [sbt](
    https://www.scala-sbt.org/), [Mill](https://github.com/lihaoyi/mill),
    [Maven](https://maven.apache.org/), [Gradle](https://gradle.org/), and more.
    Take some time to check them all out, and appreciate the breadth of tools
    that rely on Bloop.
- Keep in mind that if Metals starts Bloop, when you close Metals, it doesn't
    shut down the Bloop server. This is intentional. If you want to shut it
    down, you'll need to run a `bloop exit`.
- Just to make the distinction, worksheets rely on
    [mdoc](https://scalameta.org/mdoc/), and the recently merged in Ammonite
    support relies on [Ammonite](https://ammonite.io/). Neither of these use
    Bloop, so for example if you have an issue with either of them, blowing away
    your `.bloop` directory won't help.

I use Bloop daily, and you may too without even realizing it. It's an incredible
tool that has set the bar for how we run, compile, and test Scala code. If you
haven't yet, take some time and head on over to the [Bloop
webiste](https://scalacenter.github.io/bloop/), give the Bloop CLI a try, and
tell a friend or colleague about it.

A special thanks to [Ólafur](https://twitter.com/olafurpg) for reading this over
and always providing valuable feedback.

Thanks for stopping by.
