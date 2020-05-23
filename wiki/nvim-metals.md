---
title: nvim-metals
---

# [nvim-metals](https://github.com/scalameta/nvim-metals)

![nvim-metals](/media/nvim-metals.png)

```scala mdoc:percentages:nvim-metals
```

[Neovim](https://neovim.io/) 5.x will have [built-in LSP support](https://neovim.io/doc/user/lsp.html).
I think this will be a game-changer for nvim users looking for a solid LSP
experience. nvim-metals is an attempt to best prepare for this. It's meant to
act as a small plugin (written in Lua), that will only offer the necessary
things in order for a nvim LSP user to get the best experience with Metals.
Things like LSP extensions (think `metals/quickPick`, `metals/status`, etc) are
not supported by base LSP implementations, so the plugin will offer support for
these and also shortcuts for necessary commands, like `:BuildImport`

This project also serves as a guide for how to get up and running with nvim +
LSP, since it's currently in nightly, and it does take a bit to get setup. The
plan is that as the LSP support in nvim solidifies, this plugins will solidify
along with it. For me, this plugin will replace my usage of
[coc-metals](/wiki/coc-metals).

```scala mdoc:tags:nvim-metals
```
