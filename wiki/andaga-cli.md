# [ándaga-cli](https://github.com/ckipp01/andaga-cli)

```scala mdoc:percentages:andaga-cli
```

ándaga-cli is a small command line application written in Node to log my
personal project entries. This project is the command line portion of the
[ándaga](andaga.html) system. Following a year of tracking my time I
determined I wanted easier access to my logs in various ways which meant
splitting up the project into more of an api and a client. This is the client.
Below are the current commands that exist:"

 - `andaga categories` used for retrieving a list of categories that have been
 - used `andaga log` used for logging new entries `andaga project`  used for
 - retrieving a list of projects that have been logged `andaga recall` used for
 - recalling the last entry `andaga tags` used for retrieving a list of tags
 - that have been used

An example of how to store a log can be found below:

```fish
andaga log code "Added in a new feature to andaga cli" 45 -l home -p andaga-cli -t andaga javascript
```

The aim for ándaga-cli is to keep the project lean and only have it do the
minimal necessary commands that I need from the command line. The bulk of the
work will be done in [ándaga-core](andaga-core.html). In the future I'd
possibly like to build a pomodoro like timer directly into the cli portion of
the project. I'd also like to add a way to track meaningful output for the day
to best see under what conditions I'm working at my best.
