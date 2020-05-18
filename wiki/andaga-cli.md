---
title: andaga-cli
---

# [ándaga-cli](https://github.com/ckipp01/andaga/blob/master/functions/andaga.fish)

```scala mdoc:percentages:andaga-cli
```
ándaga-cli is a small command line script that has already been through
multiple iterations. It's the command line portion of my [ándaga](/wiki/andaga)
project. Originally this was written in Node and was all done and stored
locally. After splitting it up into a more client - server type application,
this just because the small cli portion of the project. After getting more into
Scala I started rewriting the application in Scala, but realized that the
startup time of the JVM for this project is sort of a deal breaker. Following
this, I went an entire different direction, and I just wrote it as a fish
script. So far I've loved the change, simplicity, and speed. The available
commands/options can be found below.

```fish
❯ andaga -h
Usage: andaga <command> [options]

 Options:

  -h/--help          Prints help

 Commands:

  log                Log a new entry

   Options:
    -c, --category   Category to store the log in
    -n, --notes      Notes to be stored with the log
    -d, --duration   Duration of the action to be stored
    -l, --location   Location of the action to be stored
    -p, --project    Project that the log belongs to
    -t, --tags       Tags that belong to the log

  recall             Recall n amount of log entries

   Options:
    -a, --amount     Amount of entries to recall (defaults to 1 if none given)

  tags               Get a list of all used tags
  projects           Get a list of all projects logged so far
  categories         Get a list of all categories used so far
```

An example of how to store a log can be found below:

```fish
andaga log -c code -n "Worked on fixing a bug that broke coc-metals" -d 45 -l home -p coc-metals -t typescript,tooling,metals
```

The aim for ándaga-cli is to keep the project lean and only have it do the
minimal necessary commands that I need from the command line. The bulk of the
work will be done in [ándaga-core](/wiki/andaga-core). In the future I'd
possibly like to build a pomodoro like timer directly into the cli portion of
the project. I'd also like to add a way to track meaningful output for the day
to best see under what conditions I'm working at my best.

```scala mdoc:tags:andaga-cli
```
