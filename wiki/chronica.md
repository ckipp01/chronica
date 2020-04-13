---
title: chronica
---

# [chronica](https://github.com/ckipp01/chronica)

```scala mdoc:percentages:chronica
```
[chronica](https://chronica.xyz) is the name I've given this site that you're
currently on. This is the third large iteration of the site. It holds a small
blog, a wiki for things I'm interested in and work on, and an integration to my
time tracking system [ándaga](/wiki/andaga). The focus of this site has been and
will continue to be a focus on functional minimalism and tools. I hope that
everything on this site is intentional. It will serve as a continually growing
place both in how it is made and the content that is displayed here.

## How is it made

I have a full [blog post](/blog/how-is-this-site-built) on
how this site is generated, but in short, it's content is written in markdown,
then enriched by [mdoc](https://scalameta.org/mdoc/), and then transformed into
HTML using [flexmark](https://github.com/vsch/flexmark-java). This is all done
with Scala and [Ammonite](http://ammonite.io/) scripts, built with GitHub
Actions, and hosted with Zeit Now.

## Credits

I also must give credit where credit is due. Below are a few sites that I
recommend and that have highly influenced chronica.

  - [wiki.xxiivv.com](https://wiki.xxiivv.com/#home) Devine has radically
    changed the way I think about development. His philosophy and approach to
    development has taught me that it's ok to go against he grain and to simply
    create. His ecosystem of tools are a testimony of productivity and
    creativity that in my opinion flies in the face of many modern day trends.
  - [avenier.now.sh](https://avanier.now.sh) Josh's pursuit of functional
    minimalism (my interpretation of his work) inspires me to ignore the noise
    and focus on what matters. Ironically, the current iterations of our sites
    are quite similar in the way they look, which was not intentional.
  - [macwright.org](https://macwright.org) Tom's site is a reminder that I don't
    have to settle for giant sites full of trackers and adds to find quality
    content.
  - [lihaoyi.com](http://www.lihaoyi.com/) Haoyi's site originally gave me the
      idea to just use Ammonite to generate this whole thing. Plus, I love all
      of his tools, including Ammonite.

```scala mdoc:tags:chronica
```
