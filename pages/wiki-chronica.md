# wiki.chronica

##### Code: [wiki.chronica](https://github.com/ckipp01/wiki.chronica)
##### Type: [Inter](https://rsms.me/inter)

```scala mdoc:percentages:wiki.chronica
```

Hello, I'm [Chris](/me), and this is my digital playground of sorts. I wanted a
place to display what I've been working on, and I wanted it to be a place fully
built by me. No external tools, no build process, and no localhost. In some ways
it's an experiment where I can learn, ignore the rules, and just create what I
want. A place for me to both work and display my work in a raw way that will
hopefully provide a glimpse into where I'm at with the state of development and
also what I'm currently working and focusing on.

To provide a bit of context, wiki.chronica is built using [gyul](/gyul). There
is no build process apart from adding my data into a json file. wiki.chronica is
also tied directly into my time tracking system, [ándaga](/andaga). I use
[ándaga-cli](/andaga-cli) to log entries about what I'm working on. An example
of a log is located below: 

`andaga log code "Added in a new feature to andaga cli" 45 -l home -p andaga-cli -t andaga,javascript`

This log is then sent to [ándaga-core](/andaga-core) which is a serverless
endpoint that is deployed with [Zeit Now](https://zeit.co). They are then stored
in a MongoDB database and nightly a cron job runs on my server to run the script
placed below:

```bash
#!/bin/bash
. env 

cd /wiki/directory &&
git fetch &&
git rebase origin master
mongoexport -u <user> -p <password> --db <database> --collection <collection> --jsonArray --authenticationDatabase <dbi> --out <outdir> && 
cat <logs file> | jq -r 'map(del(._id, .notest, .location)) | sort_by(.date) | reverse' > <log dir> &j
sed -i '1 \\const LOGS =' <log file> &&
cd <wiki directory> &&
git add . &&
git commit -m 'nightly auto-commit and push of logs' &&
git push origin master
```

This script exports my logs in a JSON array. I then cat the file and pipe it
into jq to map through all of the values in the array and remove the `_id,
notes, and place` fields since it won't be used in chronica, sort the logs by
date, and then reverse them to have the newest logs first. I then save this new
file. If that is successfully I then use sed to place `const LOGS =` on the
first line turning the JSON array into a JS array. Following this I commit and
use push this to my github repo. My github repo has the [Now for Github
integration](https://zeit.co/docs/v2/integrations/now-for-github) that
automatically deploys my site when something is pushed to master. Following the
deployment it auto aliases my site to chronica.xzy. This ensures that daily my
wiki is up to date with my newest logs from the day before.

On just about every page you'll see the following three tabs:

  - **info**: tells some basic info about the project
  - **stats**: shows a small graph of the breakdown of how much time was spent on each category for that project
  - **tags**: associated topics or projects that the current project was tagged with

There is already plenty I would change about the way I've done this and even
more that I'd like to add. In the future I plan on basically doing all of the
work [gyul](/gyul) is doing on the server side and just serving up the html.
This space will continually grow. There will also be a longer form blog portion
of the chronica ecosystem that has not yet been created. Thanks for stopping by!
