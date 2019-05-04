'use strict'
/* global LOGS, createProjects, createActivityGraph, createKeys */

const CRATE = {
  andaga: {
    title: 'ándaga',
    template: 'main',
    body: [
      { type: 'div',
        attributes: [
          { type: 'class', value: 'media-container' }
        ],
        children: [
          { type: 'img',
            attributes: [
              { type: 'src', value: 'media/andaga.png' },
              { type: 'class', value: 'main-image' },
              { type: 'alt', value: 'Original version of ándaga' }
            ]
          }
        ]
      },
      {
        type: 'h5',
        text: 'Code for verion 1 : <a target="_blank" href="https://github.com/ckipp01/andaga-cli/tree/year-one">ándaga</a>'
      },
      {
        type: 'h5',
        text: 'Code for verion 2 : <a target="_blank" href="https://github.com/ckipp01/andaga-cli">ándaga-cli</a>'
      },
      {
        type: 'h5',
        text: 'Code for verion 2 : <a target="_blank" href="https://github.com/ckipp01/andaga-core">ándaga-core</a>'
      },
      {
        type: 'p',
        text: 'On January 1, 2018 I decided to make an effort to log all of my free time for year. I was inspred and intrigued by multiple other time trackers such as <a target="_blank" href="https://wiki.xxiivv.com/#horaire">Horaire by Devine Lu Linvega</a> and <a target="_blank" href="https://hraew.autophagy.io/faereld/">Færeld by Mika Naylor</a>. I originally split my time up into 4 categories: act, learn, rest and social. I logged a total of 36,880 minutes spread across 578 logs. The time tracked was limited to only time that I had 100% control over, besides time spent with my spouse. I was curious to find trends, get insights, and to simply see if I was able to do the act of logging for an entire year'
      },
      {
        type: 'p',
        text: 'The app was a command line application written in Node and had 6 main commands.'
      },
      {
        type: 'ul',
        children: [
          { type: 'li', text: '<code>andaga log</code> used for logging new entries' },
          { type: 'li', text: '<code>andaga list</code> used for listing your entries' },
          { type: 'li', text: '<code>andaga tell</code> used for telling your totals' },
          { type: 'li', text: '<code>andaga populate</code> used for populating your SQLite database from a JSON file' },
          { type: 'li', text: '<code>andaga backup</code> used for backing up your entries to a JSON file' },
          { type: 'li', text: '<code>andaga show</code> used to bring up a dashboard with statistics on your entries' }
        ]
      },
      {
        type: 'p',
        text: `While I did learn some things through the tracking, the main lesson I learned was more about the process of how I want to use and build tools for my own use. This was one of the first projects that I fully built for myself and used on a daily basis. I realized that I often forgot to log entries either because I didn't like logging that type of entry, social for example, or I would simply forget. Again, this taught me about the type of software I want to both build and use for myself -- one that is simple to understand, easy to use, and flexible both in data format and code. I assume the way I implement this moving forward will continually change. That's where the flexibility comes into play.  What exactly it tracks is also continually changing. Many of these factors were taken into account as I began work on version 2 of the project.`
      },
      {
        type: 'p',
        text: 'Starting in 2019, I split this project up into 2 parts:'
      },
      {
        type: 'ul',
        children: [
          { type: 'li', text: '<a href="#andaga-cli">ándaga-cli</a> which is a small command line app written in Node. Instead of storing the entries locally, they send them to a ándaga-core to be stored.' },
          { type: 'li', text: '<a href="#andaga-core">ándaga-core</a> which is a serverless Node app hosted on <a target="_blank" href="http://zeit.co">Zeit</a>, which will store my entries in a MongoDB database.' }
        ]
      },
      {
        type: 'p',
        text: `The aim for version 2 is largely the same as version 1, but a few details have changed. I'm no longer tracking social and rest time. The whole idea of everything fitting into 4 categories has been thrown out. There will now be no limit on the amount of categories there can be. Also, I'm only tracking the time I spend on personal projects. This can range from building something, learning language, or studying programming paradigms. Hopefully this will give me insight into when I'm productive, when I typically have more energy to study, and what I enjoy working on. My hope if to make this obvious as I build more data visualization into <a href="#chronica">chronica</a>.`
      }
    ]
  },
  'andaga-cli': {
    title: 'ándaga-cli',
    template: 'main',
    body: [
      {
        type: 'h5',
        text: 'Code: <a target="_blank" href="https://github.com/ckipp01/andaga-cli">ándaga-cli</a>'
      },
      {
        type: 'p',
        text: 'ándaga-cli is a small command line application written in Node to log my personal project entries. This project is the command line portion of the <a href="#andaga">ándaga</a> system. Following a year of tracking my time I determined I wanted easier access to my logs in various ways which meant splitting up the project into more of an api and a client. This is the client. Below are the current commands that exist:'
      },
      {
        type: 'ul',
        children: [
          { type: 'li', text: '<code>andaga categories</code> used for retrieving a list of categories that have been used' },
          { type: 'li', text: '<code>andaga log</code> used for logging new entries' },
          { type: 'li', text: '<code>andaga projects</code> used for retrieving a list of projects that have been logged' },
          { type: 'li', text: '<code>andaga recall</code> used for recalling the last entry' },
          { type: 'li', text: '<code>andaga tags</code> used for retrieving a list of tags that have been used' }
        ]
      },
      {
        type: 'p',
        text: 'An example of how to store a log can be found below:'
      },
      {
        type: 'p',
        text: '<code>andaga log code "Added in a new feature to andaga cli" 45 -l home -p andaga-cli -t andaga,javascript</code>'
      },
      {
        type: 'p',
        text: `The aim for ándaga-cli is to keep the project lean and only have it do the minimal necessary commands that I need from the command line. The bulk of the work will be done in <a href="#andaga-core">ándaga-core</a>. In the future I'd possibly like to build a pomodoro like timer directly into the cli portion of the project. I'd also like to add a way to track meaningful output for the day to best see under what conditions I'm working at my best.`
      }
    ]
  },
  'andaga-core': {
    title: 'ándaga-core',
    template: 'main',
    body: [
      {
        type: 'h5',
        text: 'Code: <a target="_blank" href="https://github.com/ckipp01/andaga-core">ándaga-core</a>'
      },
      {
        type: 'p',
        text: `ándaga-core is the main engine and api for my <a href="#andaga">ándaga</a> time-tracking system. After the first initial year of tracking with <a href="#andaga">ándaga</a>, I realized I wanted a better way to store my logs. I didn't want them to only be stored locally, and I wanted multiple programs to be able to interact them. I then created a small serverless api with Node hosted on <a target="_blank" href="https://zeit.co">Zeit</a>`
      },
      {
        type: 'p',
        text: 'Below are the current routes that exist:'
      },
      {
        type: 'ul',
        children: [
          { type: 'li', text: '<code>GET /categories</code> used to retrieve a list of categories that have been used' },
          { type: 'li', text: '<code>GET /log</code> used for retrieving a certain amount of logs with an optional amount parameter' },
          { type: 'li', text: '<code>POST /log</code> used for storing logs' },
          { type: 'li', text: '<code>GET /projects</code> used to retrieve a list of projects that have been used' },
          { type: 'li', text: '<code>GET /tags</code> used to retrieve a list of tags that have been used' }
        ]
      },
      {
        type: 'p',
        text: 'As I continue to expand <a href="#andaga-cli">ándaga-cli</a> this api will become more robust.'
      }
    ]
  },
  'bash': {
    title: 'bash',
    template: 'tag',
    body: [
      {
        type: 'p',
        text: `Bash is currently my go to shell. I've worked with zsh and tcsh (forcefully) in the past, and I've always come Back to bash. I plan to stay with bash until I hit a point where I'm frustrated with the limits of what it has to other verse other shells. I don't see that happening any time soon, so I'll probably be with bash for quite some time.`
      },
      {
        type: 'p',
        text: `Below I've listed a few resources/libraries that I commonly use with bash and have had a good experience with.`
      },
      {
        type: 'ul',
        children: [
          { type: 'li', text: '<a target="_blank" href="https://github.com/loliee/patatetoy">patetoy</a> is a minimal prompt that I use for bash and really enjoy.' },
          { type: 'li', text: '<a target="_blank" href="https://github.com/wting/autojump">autojump</a> is a great tool that I use to easily jump to a specific directory.' },
          { type: 'li', text: '<a target="_blank" href="https://github.com/scop/bash-completion">bash-completion</a> which provide and auto-completion experience similiar to what a lot of people switch to zsh for.' }
        ]
      }
    ]
  },
  chronica: {
    title: 'chronica',
    template: 'main',
    body: [
      {
        type: 'h5',
        text: 'Code: <a target="_blank" href="https://github.com/ckipp01/chronica">chronica</a>'
      },
      {
        type: 'h5',
        text: 'Type: <a target="_blank" href="https://rsms.me/inter">Inter</a>'
      },
      {
        type: 'p',
        text: `<a target="_blank" href="https://chronica.xyz">chronica</a> is the name that I'm using for the ecosystem of logs, writing, and art that I've produced. Currently the wiki is the main focus, but eventually you'll see a blog portion and also a portion dispalying generative art.`
      },
      {
        type: 'p',
        text: `The main reason for chronica is to provide a unified place for things I've created. I really wanted a place for my logs to be displayed, but I also wanted a place to do a bit of writing. I soon realized that many of the ideas that I had were all sort of related, but also deserved to be in their own little worlds. Hence, chronica.`
      },
      {
        type: 'p',
        text: 'I also must give credit where credit is due. Below are a few sites that I recommend and that have highly influenced chronica.'
      },
      {
        type: 'ul',
        children: [
          { type: 'li', text: `<a target="_blank" href="https://wiki.xxiivv.com/#home">wiki.xxivv.com</a> Devine has radically changed the way I think about development. His philosophy and approach to development has taught me that it's ok to go against he grain and to simply create. His ecosystem of tools are a testimony of productivity and creativity that in my opinion flies in the face of many modern day trends.` },
          { type: 'li', text: `<a target="_blank" href="https://joshavanier.github.io">joshavanier.github.io</a> Josh's pursuit of functional minimalism (my interpretation of his work) inspires me to ignore the noise and focus on what matters.` },
          { type: 'li', text: `<a target="_blank" href="https://macwright.org">macwright.org</a> Tom's site is a reminder that I don't have to settle for giant sites full of trackers and adds to find quality content.` }
        ]
      }
    ]
  },
  'crate-builder': {
    title: 'crate-builder',
    template: 'main',
    body: [
      {
        type: 'p',
        text: 'One of the things I actually dislike about <a href="#gyul">gyul</a> is that all of my data is stored as JS objects. While this makes it extremely easy to parse and deal with, it sort of makes it a nightmare to manage. Writing new pages and managing html layout with it is quite clunky.'
      },
      {
        type: 'p',
        text: `The way I'd like to get around that is to make some sort of JS object editor. Specifically, in gyul I use a crate.js file which holds all of the entries you're looking at. I'd like to be able to just open that up in a browser and have a more visual way to edit it, add elements to it, and easily read it.`
      },
      {
        type: 'p',
        text: `I'm currently still exploring the best way to do this, so it may be a while before something working shows up here.`
      }
    ]
  },
  gyul: {
    title: '귤 gyul',
    template: 'main',
    body: [
      { type: 'div',
        attributes: [
          { type: 'class', value: 'media-container' }
        ],
        children: [
          { type: 'h1',
            text: '귤',
            attributes: [
              { type: 'class', value: 'gyul-logo' }
            ]
          }
        ]
      },
      {
        type: 'h5',
        text: 'Code: <a target="_blank" href="https://github.com/ckipp01/gyul">gyul</a>'
      },
      {
        type: 'p',
        text: `gyul is an attempt to make a small wiki engine that will seamlessly tie into my timetracker, <a href='#andaga'>ándaga</a>.`
      },
      {
        type: 'p',
        text: `For a while I found myself reverting to large frameworks for simple tasks just because I knew the technology. There came a point where I realized the amount of overhead they brought for such simple tasks was not always necessary. I set out to create something small and simple. This is my effort at that endeavor. It doesn't do a ton, but does exactly what I need it to. It's also flexible enough that if needed to be adapted for another project, it can be. This was my first attempt at creating something like this, and it was a huge learning experience. Expect to see this change and grow and I adjust to fix some of the trouble pointst that I know exist.`
      },
      {
        type: 'p',
        text: `gyul works by a factory function creating an object which creates a record of all the possible keys in the site and their relevant information. Then by passing it the hash of the url it does a look up in the object and returns the necessary data. If you look at the index.html page of this site you'll see what is shown below:`
      },
      {
        type: 'div',
        attributes: [
          { type: 'class', value: 'code-block' }
        ],
        children: [
          { type: 'code',
            text: `const GYUL = Gyul()<br>
                    GYUL.package(window.location.hash)`
          }
        ]
      },
      {
        type: 'p',
        text: `This creates the main object and then the pacakge fucntion uses the key to locate the correct object, iterate through the temlate, logs, tags, and data it contains to create what you're seeing on each page. The structure of the GYUL object is below:`
      },
      {
        type: 'div',
        attributes: [
          { type: 'class', value: 'code-block' }
        ],
        children: [
          { type: 'code',
            text: `GYUL<br>
                    package: rawKey => { iterates throw data using the template and renders the dom }<br>
                    showInfo: rawKey => { changes the main element on the page to show the main info of the current key's data }<br>
                    showLogs: rawKey => { changes the main element on the page to show the logs of the current key's type }<br>
                    showStats: rawKey => { changes the main element on the page to show the stats and breakdown of the time spent on the key's entries }<br>
                    showTags: rawKey => { changes the main element on the page to show the related tags to the key }<br>
                    switchHeader: rawKey => { changes the header element on the page to match the header element found in the key's template }<br>
                    report: () => { gives a report to the console on missing projects and tags from the CRATE }
                  `
          }
        ]
      },
      {
        type: 'p',
        text: 'There are basically two main important script files that power gyul. One is gyul.js where the factory function is, and all of the necessary methods to parse the data and turn it into dom elements. The other file, tempate.js, does just want it sounds like and provides multiple different templates that gyul can choose from to determine how things are layed out.'
      },
      {
        type: 'p',
        text: 'The next iteration of this plans on doing all of this on the sever side and just handing up the necssary data in order to not have to rely on JS on the client side'
      }
    ]
  },
  home: {
    title: 'welcome',
    template: 'basic',
    body: [
      {
        type: 'p',
        attributes: [
          { type: 'class', value: 'text-center' }
        ],
        text: `Feel free to explore. This is <a href="#me">my</a> collected works and logs. If you don't know where to start, you can get an introduction <a href='#wiki.chronica'>here</a> or click on any of the projects below.`
      },
      {
        type: 'div',
        attributes: [
          { type: 'class', value: 'homepage-keys-container' }
        ],
        text: createKeys(LOGS)
      },
      {
        type: 'div',
        attributes: [
          { type: 'class', value: '' }
        ],
        text: createActivityGraph(LOGS)
      },
      {
        type: 'div',
        attributes: [
          { type: 'class', value: 'project-list' }
        ],
        text: createProjects(LOGS).join('')
      }
    ]
  },
  'javascript': {
    title: 'javascript',
    template: 'tag',
    body: [
      {
        type: 'p',
        text: `When I first started learning programming, JavaScript was my introduction into what was really possible with programming. It's the language I currently feel most comfortable with and have the most experience with. In the last year say my JS has changed to a more functional style favoring immutability, pure functions, and higher order functions. This came as a result of working with Scala in my day job.`
      },
      {
        type: 'p',
        text: `Below I've listed a few resources that have really helped me with JavaScript and that I'd recommend to anyone.`
      },
      {
        type: 'ul',
        children: [
          { type: 'li', text: '<a target="_blank" href="https://medium.com/javascript-scene/composing-software-the-book-f31c77fc3ddc">Composing Software - Eric Elliot</a> This series is one of my all time favorites. It introduces a lot of functional programming concepts in an easy to understand manner with a ton of examples. It also explains a lot of why the functional paradigm is important not just in JavaScript, but proramming in general.' },
          { type: 'li', text: `<a target="_blank" href="https://github.com/getify/You-Dont-Know-JS">You-Don't-Know-JS - Kyle Simpson</a> Kyle Simpson's series YDKJS really layed the foundation for me in terms of knowledge and understanding. This is probably the best overview and study of the JS language that you'll find.` }
        ]
      }
    ]
  },
  language: {
    title: 'language',
    template: 'main',
    body: [
      {
        type: 'p',
        text: `This project is an ongoing one. I studied Spanish for 6 years when younger, studied in Mexico and Costa Rica, and then slowly watched the language dwindle away in my mind. I've studied some Turkish and spent 4 months traveling around Turkey. I was amazed at the amount of language one can learn in a short amount of time when forced to speak it and focused. I also started studying Korean when I met my wife and regularly take trips there.`
      },
      {
        type: 'p',
        text: 'In July of 2018 I moved to the Netherlands, so any current activity on language learning for the time being will probably be Dutch'
      }
    ]
  },
  me: {
    title: 'Chris',
    template: 'basic',
    body: [
      { type: 'div',
        attributes: [
          { type: 'class', value: 'media-container' }
        ],
        children: [
          { type: 'img',
            attributes: [
              { type: 'src', value: 'media/me.jpg' },
              { type: 'class', value: 'main-image' },
              { type: 'alt', value: 'Chris' }
            ]
          }
        ]
      },
      {
        type: 'p',
        text: `Hi, I'm Chris, and you've stumbled onto my wiki. Originally from the United States, I'm now located in the Netherlands with my wife Sé. I'm a developer and digital explorer. I currently work for Visma Connect primarily working in Scala and JavaScript. Feel free to reach out by any of the means below.`
      },
      {
        type: 'p',
        text: 'Thanks for visiting.'
      },
      {
        type: 'p',
        text: 'Chris'
      }
    ]
  },
  missing: {
    title: 'Missing',
    template: 'basic',
    body: [
      {
        type: 'p',
        text: 'No entry has been found for this key'
      }
    ]
  },
  modernheirloomstudio: {
    title: 'modern heirloom studio',
    template: 'main',
    body: [
      { type: 'div',
        attributes: [
          { type: 'class', value: 'media-container' }
        ],
        children: [
          { type: 'img',
            attributes: [
              { type: 'src', value: 'media/modern-heirloom-studio.png' },
              { type: 'class', value: 'main-image' },
              { type: 'alt', value: 'Homepage of the old Modern Heirloom Studio website.' }
            ]
          }
        ]
      },
      {
        type: 'p',
        text: 'Modern Heirloom Studio was studio name that my wife starter her art studio under. My small part in her project was creating a static site using <a target="_blank" href="https://nuxtjs.org">Nuxt</a>. She is now operating under the name <a href="#studiosyk">studio syk</a>.'
      }
    ]
  },
  processing: {
    title: 'processing',
    template: 'main',
    body: [
      {
        type: 'p',
        text: `<a target="_blank" href="https://processing.org">Processing</a> is something quite new to me. I've been really amazed at what people have created using libraries like <a target="_blank" href="http://p5js.org">p5.js</a> and am really interested in the intersection of coding and art.`
      },
      {
        type: 'p',
        text: `As I become more familiar with this, you'll see more info here. Eventually I'll also have a works.chronica section of chronica that will showcase some of the things I've created.`
      }
    ]
  },
  programming: {
    title: 'programming',
    template: 'main',
    body: [
      {
        type: 'h5',
        attributes: [{ type: 'class', value: 'quote' }],
        text: 'Sometimes, the elegant implementation is just a function. Not a method. Not a class. Not a framework. Just a function.” <br> ~John Carmack'
      },
      {
        type: 'p',
        text: `I'm a self-taught programmer that started programming out of a curiosity. It didn't take long for me to completely fall in love with the idea of being able to create what I could invision. I consider myself a developer that enjoys working both with front and back end technologies. I dabble in everything that I can get my hands on. I enjoy writing scripts, improving development process, and helping lower the barriers to tech. Professionally I work primarily in JavaScript and Scala, but you can get a picture of the languages and focuses by peaking at the tags tab.`
      }
    ]
  },
  scripts: {
    title: 'scripts',
    template: 'main',
    body: [
      {
        type: 'p',
        text: `Writing small scripts to accomplish tasks is one of my favorite things to do. If I find myself doing something multiple times in a row, my mind always questions how I can automate the process. Most of the scripts I've written are in bash and solve pretty specific problems that I've encountered.`
      }
    ]
  },
  seutaeg: {
    title: '스택 seutaeg',
    template: 'main',
    body: [
      {
        type: 'p',
        text: `This is in the very early stages of development. Currently for <a href="#gyul">gyul</a> I use file called crate.js, which is just a big JS object, to hold all of the main data and content for my site. As I'm looking to also use <a href="#gyul">gyul</a> for longer writing, which means this needs to change. It's not the most human readable format.`
      },
      {
        type: 'p',
        text: `The current plan is to have the file be a tabular file that is more human readable. There will also be a parsing library involved that will be able to parse patterns and symbols to quickly create links, bold text, etc.`
      },
      {
        type: 'p',
        text: `This idea is heavily inspired by <a targer="_blank" href="https://wiki.xxiivv.com/#indental">Indental</a> and <a target="_blank" href="https://wiki.xxiivv.com/#runic">Runic</a>. Both of these are built by Devine Lu Linvega.`
      }

    ]
  },
  studiosyk: {
    title: 'studio syk',
    template: 'main',
    body: [
      { type: 'div',
        attributes: [
          { type: 'class', value: 'media-container' }
        ],
        children: [
          { type: 'img',
            attributes: [
              { type: 'src', value: 'media/studiosyk.png' },
              { type: 'class', value: 'main-image' },
              { type: 'alt', value: 'Homepage of studio syk website.' }
            ]
          }
        ]
      },
      {
        type: 'h5',
        text: 'Code: <a target="_blank" href="https://github.com/ckipp01/studiosyk">studio syk</a>'
      },
      {
        type: 'p',
        text: `<a target="_blank" href="https://studiosyk.com">studio syk</a> is my wife's studio. She's a marbling artist that primarily works on fabric. Her site is a static site built with <a target="_blank" href="https://nextjs.org">Next.js</a>.`
      }
    ]
  },
  'waka-fetch': {
    title: 'waka-fetch',
    template: 'main',
    body: [
      { type: 'div',
        attributes: [
          { type: 'class', value: 'media-container' }
        ],
        children: [
          { type: 'img',
            attributes: [
              { type: 'src', value: 'media/waka-fetch.jpg' },
              { type: 'class', value: 'main-image' },
              { type: 'alt', value: 'Logo for waka-fetch.' }
            ]
          }
        ]
      },
      {
        type: 'h5',
        text: 'Code: <a target="_blank" href="https://github.com/ckipp01/waka-fetch">waka-fetch</a>'
      },
      {
        type: 'p',
        text: 'waka-fetch is a small serverless app hosted on <a target="_blank" href="https://zeit.co">Zeit</a> that grabs my daily <a target="_blank" href="https://wakatime.com">wakatime</a> summaries. I grab these summaries and store them in a MongoDB database. I grab them in order to feed them into my <a href="#waka-machine">waka-machine</a> project will gives me projections on what my coding activity will look like in the week to come.'
      }
    ]
  },
  'waka-machine': {
    title: 'waka-machine',
    template: 'main',
    body: [
      {
        type: 'h5',
        text: 'Code: <a target="_blank" href="https://github.com/ckipp01/waka-machine">waka-machine</a>'
      },
      {
        type: 'p',
        text: 'waka-machine is my first stab at machine learning. It takes my daily coding activity that <a href="#waka-fetch">waka-fetch</a> grabs and provides projections for the upcoming week.'
      },
      {
        type: 'p',
        text: `This project currently only works locally. However, I've moved pretty much all of my backend projects over to serverless architecture. The plan for this project is to do the same. Nightly, after my daily summary is pulled, I'd like to run it through waka-machine to give my projection for the next week. Then, these will be added to <a href="#chronica">chronica</a> in a very similiar way as my logs to ensure that they are automatically updated daily.`
      }
    ]
  },
  'webring-checker': {
    title: 'webring-checker',
    template: 'main',
    body: [
      {
        type: 'h5',
        text: 'Code: <a target="_blank" href="https://github.com/ckipp01/webring-checker">webring-checker</a>'
      },
      {
        type: 'h5',
        text: 'Url: <a target="_blank" href="https://webring-checker.now.sh/?format=html">https://webring-checker.now.sh</a>'
      },
      {
        type: 'p',
        text: `You may have noticed the middle icon in the footer of this site. It leads to a <a target="_blank" href="https://webring.xxiivv.com">webring</a> full of wikis, portfolios, and the likes. The creativity and talent you'll find browsing around on the various sites is astounding. I'm grateful to be part of the community.`
      },
      {
        type: 'p',
        text: `webring-checker is a simple service that grabs the urls from the webring and then checks the status and last modified date of all of the sites. By default it will return a JSON array of data, but you can also pass in a query paramater format, with the specific type like <code>?format=html</code>. It currently only supports JSON and html.`
      }
    ]
  },
  'wiki.chronica': {
    title: 'wiki.chronica',
    template: 'main',
    body: [
      {
        type: 'h5',
        text: 'Code: <a target="_blank" href="https://github.com/ckipp01/wiki.chronica">wiki.chronica</a>'
      },
      {
        type: 'h5',
        text: 'Type: <a target="_blank" href="https://rsms.me/inter">Inter</a>'
      },
      {
        type: 'p',
        text: `Hello, I'm <a href="#me">Chris</a>, and this is my digital playground of sorts. I wanted a place to display what I've been working on, and I wanted it to be a place fully built by me. No external tools, no build process, and no localhost. In some ways it's an experiment where I can learn, ignore the rules, and just create what I want. A place for me to both work and display my work in a raw way that will hopefully provide a glimpse into where I'm at with the state of development and also what I'm currently working and focusing on.`
      },
      {
        type: 'p',
        text: `To provide a bit of context, wiki.chronica is built using <a href="#gyul">gyul</a>. There is no build process apart from adding my data into a json file. wiki.chronica is also tied directly into my time tracking system, <a href="#andaga">ándaga</a>. Daily I used <a href="#andaga-cli">ándaga-cli</a> to log entries about what I'm working on. An example of a log is located below: `
      },
      {
        type: 'p',
        text: '<code>andaga log code "Added in a new feature to andaga cli" 45 -l home -p andaga-cli -t andaga,javascript</code>'
      },
      {
        type: 'p',
        text: 'This log is then sent to <a href="#andaga-core">ándaga-core</a> which is a serverless endpoint that is deployed with <a target="_blank" href="https://zeit.co">Zeit Now</a>. They are then stored in a MongoDB database and nightly a cron job runs on my server to run the script placed below:'
      },
      {
        type: 'div',
        attributes: [
          { type: 'class', value: 'code-block' }
        ],
        children: [
          { type: 'code',
            text: `#!/bin/bash <br>
                    . env <br>
                    cd /wiki/directory && <br>
                    git fetch && <br>
                    git rebase origin master <br><br>
                    mongoexport -u <i>user</i> -p <i>password</i> --db <i>database</i> --collection <i>collection</i> --jsonArray --authenticationDatabase <i>db</i> --out <i>outdir</i> && <br>
                    cat <i>logs file</i> | jq -r 'map(del(._id)) | sort_by(.date) | reverse' > </i>log dir</i> && <br>
                    sed -i '1 \\const LOGS =' <i>log file</i> && <br>
                    cd <i>wiki directory</i> && <br>
                    git add . && <br>
                    git commit -m 'nightly auto-commit and push of logs' && <br>
                    git push origin master`
          }
        ]
      },
      {
        type: 'p',
        text: `This script exports my logs in a JSON array. I then cat the file and pipe it into jq to map through all of the values in the array and remove the <code>_id</code> field since it won't be used in chronica, sort the logs by date, and then reverse them to have the newest logs first. I then save this new file. If that is successfully I then use sed to place <code>const LOGS =</code> on the first line turning the JSON array into a JS array. Following this I commit and use push this to my github repo. My github repo has the <a target="_blank" href="https://zeit.co/docs/v2/integrations/now-for-github/">Now for Github integration</a> that automatically deploys my site when something is pushed to master. Following the deployment it auto aliases my site to chronica.xzy. This ensures that daily my wiki is up to date with my newest logs from the day before.`
      },
      {
        type: 'p',
        text: `On just about every page you'll see the following four tabs:`
      },
      {
        type: 'ul',
        children: [
          { type: 'li', text: '<b>info:</b> tells some basic info about the project' },
          { type: 'li', text: '<b>stats:</b> shows a small graph of the breakdown of how much time was spent on each category for that project' },
          { type: 'li', text: '<b>logs:</b> a copy of the logs that are tied to that project' },
          { type: 'li', text: '<b>tags:</b> associated topics or projects that the current project was tagged with' }
        ]
      },
      {
        type: 'p',
        text: `There is already plenty I would change about the way I've done this and even more that I'd like to add. In the future I plan on basically doing all of the work <a href="gyul">gyul</a> is doing on the server side and just serving up the html. This space will continually grow. There will also be a longer form blog portion of the chronica ecosystem that has not yet been created. Thanks for stopping by!`
      }
    ]
  },
  workspace: {
    title: 'workspace',
    template: 'main',
    body: [
      { type: 'div',
        attributes: [
          { type: 'class', value: 'media-container' }
        ],
        children: [
          { type: 'img',
            attributes: [
              { type: 'src', value: 'media/desktop4.png' },
              { type: 'class', value: 'main-image' },
              { type: 'alt', value: 'Snapshot of my desktop.' }
            ]
          }
        ]
      },
      {
        type: 'h5',
        text: 'Code: <a target="_blank" href="https://github.com/ckipp01/dots">dots</a>'
      },
      {
        type: 'p',
        text: `As soon as I started developing I became interested in making sure the machine I was working on for at least 8 hours a day felt pleasant to look at and worked well. I'm amazed at the amount of ways you can tweak your machine and tools to work for you and to look the way you want. If not, then you can also freely build your own.`
      },
      {
        type: 'ul',
        children: [
          { type: 'li', text: '<b>OS:</b> Ubuntu 18.04' },
          { type: 'li', text: '<b>Terminal:</b> st' },
          { type: 'li', text: '<b>Terminal file explorer:</b> ranger' },
          { type: 'li', text: '<b>Primary text editor for anything but Scala:</b> NVim' },
          { type: 'li', text: '<b>Primary text editor for Scala:</b> IntelliJ' },
          { type: 'li', text: '<b>Browser:</b> Vivaldi' },
          { type: 'li', text: '<b>Other daily software:</b> Tmux, Keybase, Slack, Spotify' }
        ]
      }
    ]
  }
}
