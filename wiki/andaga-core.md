# [ándaga-core](https://github.com/ckipp01/andaga-core)

```scala mdoc:percentages:andaga-core
```

ándaga-core is the main engine and api for my [ándaga](andaga.html) time-tracking
system. After the first initial year of tracking with [ándaga](andaga.html), I
realized I wanted a better way to store my logs.  I didn't want them to only be
stored locally, and I wanted multiple programs to be able to interact them. I
then created a small serverless api with Node hosted on [Zeit](https://zeit.co)

Below are the current routes that exist:

 - `GET /categories` used to retrieve a list of categories that have been used
 - `GET /log` used for retrieving a certain amount of logs with an optional
 - amount parameter `POST /log` used for storing logs `GET /projects` used to
 - retrieve a list of projects that have been used `GET /tags` used to retrieve
 - a list of tags that have been used

As I continue to expand [ándaga-cli](andaga-cli.html) this api will become more
robust

```scala mdoc:tags:andaga-core
```
