# crate-builder

```scala mdoc:percentages:create-builder
```
One of the things I actually dislike about [gyul](gyul.html) is that all of my data
is stored as JS objects. While this makes it extremely easy to parse and deal
with, it sort of makes it a nightmare to manage. Writing new pages and managing
html layout with it is quite clunky.

The way I'd like to get around that is to make some sort of JS object editor.
Specifically, in gyul I use a crate.js file which holds all of the entries
you're looking at. I'd like to be able to just open that up in a browser and
have a more visual way to edit it, add elements to it, and easily read it.

I'm currently still exploring the best way to do this, so it may be a while
before something working shows up here.
