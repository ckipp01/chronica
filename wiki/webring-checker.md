# [webring-checker](https://github.com/ckipp01/webring-checker)

```scala mdoc:percentages:webring-checker
```

You may have noticed the middle icon in the footer of this site. It leads to a
[webring](https://webring.xxiivv.com) full of wikis, portfolios, and the likes.
The creativity and talent you'll find browsing around on the various sites is
astounding. I'm grateful to be part of the community.

webring-checker is a simple service and api the webring. The api is able to
provide a list of sites in the webring, check the status of the webring, and
also show an rss feed of the webring. The full options are below.

  - `GET /` will return a description page
  - `GET /check?format=html` will return an html report of all sites, their
    status code, and if available, the last modified date
  - `GET /check?format=json` will return the same info as the html format but in json
  - `GET /sites` will return a json array of site objects that are part of the webring
  - `GET /rss?format=html` to view a collection of all available rss feeds in the
    Webring ordered by date
  - `GET /rss?format=json` to retrieve the collection of rss feeds in json format ordered by date

The webring currently has rss feeds that are either rss or atom feeds. Since
they both have a bit different format, I've standardized them into a common json
object. This is the format that the json of the `/rss?format=json`
will return.

```javascript
{
  "title": String,
  "link": String,
  "post": {
    "postTitle": String,
    "postDate": String,
    "postLink": String,
    "postConent": String
  }
}
```

```scala mdoc:tags:webring-checker
```
