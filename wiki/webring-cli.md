---
title: webring-cli
---

# [webring-cli](https://github.com/ckipp01/webring-cli)

##### To install: `yarn global add webring-cli`

```scala mdoc:percentages:webring-cli
```

webring-cli is an attempt to mimic the behavior of the webring through the cli.
Eventually, I'd also like to merge all the functionality that the
[webring-checker api](/wiki/webring-checker) also provides.

The project is built with node and minimal dependencies. The
[commander](https://github.com/tj/commander.js) library is used as an easier way
to parse the command line arguments,
[node-fetch](https://github.com/bitinn/node-fetch) is used to make all of the
necessary http requests, and
[cli-table3](https://github.com/cli-table/cli-table3) is also used to for the
output tables.

These are the currently available commands:

```txt
webring -h
  Usage: webring [options] [command]

  Options:
    -V, --version     output the version number
    -h, --help        output usage information

  Commands:
    sync              syncs latest sites.js file from the xxiivv webring and cache's wikis
    sites             lists all the sites in the webring
    random            brings you to a random site in the webring
    rss [options]     rss feeds are alive and well
    hallway [options] a voice echoes in the hallway
    wiki              a decentralized encyclopedia REPL
```

The following options are available to interact with the hallway:

```txt
webring hallway -h
  Usage: hallway [options]

  a voice echoes in the hallway

  Options:
    gander  <user | channel | tag>   take a gander at the hallway
    write   <message>                write a message on the wall
    setup                            setup options for hallway related settings
    -h, --help [options]             output usage information
```

The following options are available to interact with the rss feeds

```txt
webring rss -h
  Usage: rss [options]

  rss feeds are alive and well

  Options:
    feeds                 shows you a list of all available rss feeds and their authors
    gander <feed>         shows you either all of the feeds combined or a specific feed
    -h, --help [options]  output usage information
```

The wiki is modeled after [Josh's Compendium](https://gitlab.com/jrc03c/compendium).
Upon entering it you will be dropped into a REPL which will allow you to
navigate the wiki entries. The available REPL command are below.

```txt
webring wiki
  Usage: [command]

  Commands:
    ls              list directory contents
    cd <index>      change directory
    exit            to exit the repl
    help            display all commands

wiki >
```

```scala mdoc:tags:webring-cli
```
