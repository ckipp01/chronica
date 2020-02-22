# [ándaga-cli](https://github.com/ckipp01/andaga)

```scala mdoc:percentages:andaga-cli
```
ándaga-cli is a small command line application that has already been through
multiple iterations. It's the command line portion of my [ándaga](andaga.html)
project. Originally this was written in Node and was all done and stored
locally. After splitting it up into a more client - server type application,
this just because the small cli portion of the project. After getting more into
Scala I started rewriting the application in Scala, but realized that the
startup time of the JVM for this project is sort of a deal breaker. I'm
currently in the process of figuring out what is next for this that makes the
most sense. I use this daily, and these are the current existing commands:

 - `andaga log` used for logging new entries
 - `andaga projects`  used to retrieve a list of all my projects
 - `andaga categories` used to retrieve a list of all categories that have been
     used
 - `andaga tags` used to retrieve a list of all tags that have been used
 - `andaga recall` used for recall the last n amount of entries

An example of how to store a log can be found below:

```fish
andaga log code "Worked on fixing a bug that broke coc-metals" 45 -l home -p coc-metals -t typescript,tooling,metals
```

The aim for ándaga-cli is to keep the project lean and only have it do the
minimal necessary commands that I need from the command line. The bulk of the
work will be done in [ándaga-core](andaga-core.html). In the future I'd
possibly like to build a pomodoro like timer directly into the cli portion of
the project. I'd also like to add a way to track meaningful output for the day
to best see under what conditions I'm working at my best.

```scala mdoc:tags:andaga-cli
```
