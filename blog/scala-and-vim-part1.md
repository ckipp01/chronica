---
title: Scala and Vim Part 1
date: 2020-07-02
description: A look at the current state of Vim and Scala
---

# Scala and Vim Part 1

_Published: 2020-07-02_

I was first introduced to Scala in the summer of 2018. Prior to Scala I worked
in a couple languages with my main up to that point being Javascript. I had
recently started getting into Vim and when I started working with Scala I had
hopes of being able to start with it being my primary editor. At the time, it
seemed like there was only one option for you if you wanted to use Vim with
Scala and have some sort of help with intelligent completions and the like,
[Ensime](https://ensime.github.io/). That paired with the very popular
[vim-scala](https://github.com/derekwyatt/vim-scala) plugin by Derek Wyatt
seemed to be all you needed, but for a couple different reasons it was a
nightmare for me to set up. I remember feeling defeated, upset, and dumb. I then
followed my colleagues advice and just started using IntelliJ.

I used IntelliJ for about a year, and that was around the time in mid 2019 when
there was starting to be a bit more buzz around the new kid on the block:
[Metals](https://scalameta.org/metals/). At the time, the docs had instructions
about using Coursier to bootstrap Metals to be used with
[vim-lsc](https://github.com/natebosch/vim-lsc/). There was a some setup
necessary, but out of the box I was was able to get a good chunk of things
working. While there was definitely room for improvement, this initial small win
for me was enough to start getting more interested in the tooling around Scala
and Vim, and it's when I first started slowly contributing to Metals.

![Scalameta logo](/media/scalameta.png)

## [The Birth of coc-metals](#the-birth-of-coc-metals)

Pretty soon after starting to contribute it was pretty evident that things like
a simple automated installation process, an easy way to change configuration, or
the ability to easily send commands to the server were necessary for wider
adoption and just a nicety to have, especially if there was any desire to
support some of the [LSP
extensions](https://scalameta.org/metals/docs/editors/overview.html#metals-extensions)
that Metals has. This naturally led to me wanting to create a plugin of sorts
to aid in the install and generally make the setup easier. If you're familiar
at all with the LSP and Vim world, you'll notice that there are a _ton_ of
options. At the time users were split between
[vim-lsc](https://github.com/natebosch/vim-lsc/),
[vim-lsp](https://github.com/prabirshrestha/vim-lsp),
[coc.nvim](https://github.com/neoclide/coc.nvim),
[deoplete](https://github.com/Shougo/deoplete.nvim),
[Ale](https://github.com/dense-analysis/ale),
[LanguageClient-neovim](https://github.com/autozimu/LanguageClient-neovim),
and [YouCompleteMe](https://github.com/ycm-core/YouCompleteMe). The crazy part
is, I'm probably forgetting some. There are a surprising amount of options for
those looking for LSP support in Vim. I played around with a few of these,
and to be honest, when I wanted to start the plugin, it would have been a toss
up which I started with had it not been for the fact that coc.nvim provided a
way to port over VS Code extensions to be used for Vim. Ultimately, if someone
asks, why is the main Metals Vim plugin made for coc.nvim, the answer is because
we can share a core with the VS Code plugin. You can even see this in the
[metals-languageclient](https://github.com/scalameta/metals-languageclient)
library that [Gabriele Petronella](https://twitter.com/gabro27) spearheaded that
both [coc-metals](https://github.com/scalameta/coc-metals) and
[metals-vscode](https://github.com/scalameta/metals-vscode) use. The base of
coc-metals was created pretty quickly thanks to how easy coc.nvim makes it to
port over extensions. As things were coming together, I kept getting more
excited, and I really wanted the experience for Vim Metals users to be both
smooth and feature rich. I even made it a "resolution" for the new years, ha.

![tweet about Vim](/media/vim-tweet.png)

## [The current state of coc-metals](#the-current-state-of-coc-metals)

In the past 6 months there has been a ton of work done on coc-metals that I'm
really proud of. With the help of multiple contributors every Metals [LSP
extension](https://scalameta.org/metals/docs/editors/overview.html#metals-extensions)
is supported and there is a seamless way to update your server version, restart the
server, and continue to code, all without closing your buffer. With the latest
release of coc-metals you can now debug, run, and test your code all within Vim
(Nvim only at the moment) with the help of
[vimspector](https://github.com/puremourning/vimspector). You have a new project
creator, worksheets that utilize virtual text (Nvim only), and if you want to
use the Metals Tree View to explore the API of your dependencies, that's doable.
It's great to see the full feature set of Metals supported in Vim if you choose
to go the coc-metals route.

![Metals and Vim](/media/glamour-shot.png)

## [The double edged sword](#the-double-edged-sword)

Looking back at the past 6 months, usage of coc.nvim has also skyrocketed. When
I first started looking to making a coc plugin, the project had around 6k stars.
Less than a year before that, they were less than 1k. Right now they are sitting
around almost 12k stars on GitHub. coc.nvim is a success story. They put in the
work, created an ecosystem of plugins, and capitalized on the ability of users
to port popular language plugins from VS Code over to Vim.

I can't find the quote now, but a while back I read a comment on Reddit about
the worry of coc.nvim taking over your terminal and basically becoming a
coc.nvim editor powered by Vim. You can see inklings of this when you realize
they have their own way to manage plugins, an ecosystem that heavily relies on
Node, which is a bit out of the ordinary for a terminal based editor, and when
you use coc.nvim, you sort of get locked into the coc.nvim way of doing things.

This is where I'll become a bit opinionated, but in my opinion this all breaks a
bit away from the experience I want with Vim, the ability to swap out components
and choose how X, Y, or Z is done. I'm a big advocate of the Linux philosophy of
_Each Program Does One Thing Well_, and I like to be able to choose that
_program_. For example, coc.nvim has it's own fzf alternative, there is talk of
a built-in symbol explorer, and they basically provide a full experience for
everything you'd want in your LSP editing experience if you so choose to use it.
This is _huge_ strength, but also _giant_ weakness for other users. For
most developers that dabble in Javascript, they'll have Node installed. More
than likely even if they don't they'll have Node installed, but it's still
something I hear people wish didn't have to be a dependency to use coc-metals.

Overall, I'm very happy with coc-metals, and it's the way I recommend almost
anyone to use Metals with Vim. However, there are some more recent things that
get me excited and that I'll be shifting my focus and effort to this second half
of the year.

##  [nvim-metals](#nvim-metals)

![nvim-metals](/media/nvim-metals.png)

I'm a happy [neovim](https://neovim.io/) user, and I encourage anyone to take a
look at the [Vision and Goals](https://neovim.io/charter/) of the project. Even
with coc-metals, I think it greatly enhances your experience with the way it
handles messages, offers virtual text which unlocks the [decoration
protocol](https://scalameta.org/metals/docs/editors/decoration-protocol.html),
and just offers an overall smoother experience. Apart from that, one of the main
things that get me excited is that the Nvim v.0.5.0 release will have built-in
LSP support. This is ideal and the way Nvim is approaching LSP is to have a
solid core that offers a myriad of extensibility without providing all the shiny
bells and whistles out of the gate. Much of the integration is call-back based
which allows users and plugin authors to define custom callbacks for basically
all of the functionality that you'd want in your LSP experience. This has
already worked great with the emergence of new plugins like
[completion-nvim](https://github.com/nvim-lua/completion-nvim) and
[diagnostic-nvim](https://github.com/nvim-lua/diagnostic-nvim) which greatly
enhance the Nvim LSP experience. The future for native LSP support in Nvim looks
really bright in my opinion with plugins written in Lua and everything being
easily extendable or swapped out, and that's the experience I'm looking for. It
feels much closer to the mindset of _Each Program Does One Thing Well_ like I
mentioned above without one taking over your entire system. It was for this
reason that I started [nvim-metals](https://github.com/scalameta/nvim-metals)
which at the moment serves and an example of how to setup Metals with the native
LSP support in Nvim, and also provides some extra functionality that you'll need
at the moment. Keep in mind that this is all changing rapidly, stuff is
breaking, and there is no stable for really any of this. However, I'm very
excited about it, and I envision myself fully switching from coc-metals to
nvim-metals in the next 6 months. It will take more work to set up, especially
in its current state, but eventually I believe it will provide a faster, more
stable, and more extensible Metals + Nvim experience.

## [An Ode to Metals](#an-ode-to-metals)

I'd be amiss in this not to mention that Metals does a fantastic job of allowing
editors of all kinds and all levels of support to have a solid editing
experience. It's something I personally work hard at to ensure that whatever
type of client is hooking up to Metals has a positive experience with the setup
and configuration. It sort of goes unseen, but there is a lot of work that has
gone into Metals to ensure that that all sorts of clients with all levels of
support are taken care of. A few examples:

  - Does the client support snippets in completions?
  - Does the client have the ability to use virtual text or should it be given
      comments in worksheets?
  - Does the client have the ability to show Doctor results, or should Metals
      take care of launching it in the browser for you? You can choose html or
      json for this.
  - Plus many more...

It's because of this that an editor like Nvim with growing LSP support can still
provide a great experience with Metals -- how well configuring the server works
and also how open the team is to making necessary changes to ensure all editors
are having a good experience. I couldn't be more proud to be part of the team.

## [The rest of the _Ecosystem_](#the-rest-of-the-ecosystem)

I'd also like to touch a bit on the Vim and Scala ecosystem outside of Metals. I
mentioned the [vim-scala](https://github.com/derekwyatt/vim-scala) plugin
earlier by Derek Wyatt. Every Scala developer that has used Vim to edit any
Scala owes him a high five. The default syntax highlighting that actually ships
with Vim is from that plugin. With that being said, I don't actually recommend
usage of that plugin currently mainly because I think tooling in Scala has grown
to a point where it offers everything that the plugin can do via
[Scalafmt](https://scalameta.org/scalafmt/) or
[Scalafix](https://github.com/scalacenter/scalafix). Organizing imports in an
intelligent way was a huge piece of the missing puzzle for me as a Metals user
until the recent
[scalafix-organize-imports](https://github.com/liancheng/scalafix-organize-imports)
rule by [@liancheng](https://twitter.com/liancheng) was released. This is a
godsend.

Another semi-related thing to this that excites me is the future of alternative
syntax highlighting systems like
[tree-sitter](https://tree-sitter.github.io/tree-sitter/). The great part is
that a [native tree-sitter
module](https://github.com/neovim/neovim/issues/11724) is also planed for the
next major release of Nvim. I've recently been looking into the Scala grammar
for tree-sitter, and I'm hopeful that the future holds the ability to use
tree-sitter for syntax highlight for Scala in Nvim. I think this will be a game
changer.

This article is radically incomplete since I know there are users out there that
use Metals with some of the other Vim LSP clients, and maybe even some without
any client and just plane old vanilla Vim. However, I wanted to give a bit of
insight into the creation of coc-metals, the start of nvim-metals, and a bit of
context to how I see the Scala and Vim experience. I hope to continually work at
improving this, and hopefully by the end of the year I'll hear more people say,
Scala support in Vim is fantastic. That's my goal anyways.

Cheers, and thanks for reading.
