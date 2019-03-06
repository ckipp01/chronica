const CRATE = {
  'andaga': {
    title: 'ándaga',
    template: 'mainTemplate',
    body: [
      { type: 'div',
        attributes: [
          { type: 'class', value: 'media-container' }
        ],
        children: [
          { type: 'img',
            attributes: [
              { type: 'src', value: 'media/andaga.png' },
              { type: 'class', value: 'main-image' }
            ]
          }
        ]
      },
      {
        'type': 'h5',
        'text': 'Code for verion 1 : <a target="_blank" href="https://github.com/ckipp01/andaga-cli">ándaga</a>'
      },
      {
        'type': 'p',
        'text': 'On January 1, 2018 I decided to make an effort to log all of my free time for year. I was inspred and intrigued by multiple other time trackers such as <a target="_blank" href="https://wiki.xxiivv.com/#horaire">Horaire by Devine Lu Linvega</a> and <a target="_blank" href="https://hraew.autophagy.io/faereld/">Færeld by Mika Naylor</a>. I originally split my time up into 4 categories: act, learn, rest and social. I logged a total of 36,880 minutes spread across 578 logs. The time that I tracked was limited to only time that I had 100% control over, besides time spent with my spouse. I was curious to find trends, get insights, and to simply see if I was able to do the act of logging for an entire year'
      },
      {
        'type': 'p',
        'text': 'The app was a command line application written in Node. The app had 6 main commands.'
      },
      {
        'type': 'ul',
        'children': [
          { type: 'li', text: '<code>andaga log</code> used for logging new entries' },
          { type: 'li', text: '<code>andaga list</code> used for listing your entries' },
          { type: 'li', text: '<code>andaga tell</code> used for telling your totals' },
          { type: 'li', text: '<code>andaga populate</code> used for populating your SQLite database from a JSON file' },
          { type: 'li', text: '<code>andaga backup</code> used for backing up your entries to a JSON file' },
          { type: 'li', text: '<code>andaga show</code> used to bring up a dashboard with statistics on your entries' }
        ]
      },
      {
        'type': 'p',
        'text': `While I did learn some things through the tracking, the main lesson I learned was more about the process of how I want to use and build tools for my own use. I realized that I often forgot to log entries either because I didn't like logging that type of entry, social for example, or I would simply forget. Again, this taught me about the type of software I want to both build and use for myself -- one that is simple to understand, easy to use, and flexible both in data format and code. I assume the way I impliment this moving forward will continually change. That's where the flixiblity comes into play.  What exactly it tracks is also important to me, and will change in the future. Many of these factors were taken into account as I began work on version 2 of the project.`
      },
      {
        'type': 'p',
        'text': 'Starting in 2019, I split this project up into 2 parts:'
      },
      {
        'type': 'ul',
        'children': [
          { type: 'li', text: '<a href="#andaga-cli">ándaga-cli</a> which is a small command line app written in Node. Instead of storing the entries locally, they send them to a ándaga-core to be stored.' },
          { type: 'li', text: '<a href="#andaga-core">ándaga-core</a> which is a serverless Node app hosted on <a target="_blank" href="http://zeit.co">Zeit</a>, which will store my entrie in a MongoDB database.' }
        ]
      }
    ]
  },
  'andaga-cli': {
    'title': 'ándaga-cli',
    'template': 'mainTemplate',
    'body': [
      { 'type': 'div',
        'attributes': [
          { 'type': 'class', 'value': 'media-container' }
        ],
        'children': [
          { 'type': 'img',
            'attributes': [
              { 'type': 'src', 'value': 'media/andaga-help.png' },
              { 'type': 'class', 'value': 'main-image' }
            ]
          }
        ]
      },
      {
        'type': 'h5',
        'text': 'Code: <a target="_blank" href="https://github.com/ckipp01/andaga-cli/tree/2.0">ándaga-cli</a>'
      },
      {
        'type': 'p',
        'text': 'ándaga-cli is a small command line application writen in Node to log my personal project entries. This project started out as <a href="#andaga">ándaga</a>. Following a year of tracking my time I determined I wanted easier access to my logs which mean splitting up the project into more of an api and a client. This is the client. The cli program only currently has 2 commands:'
      },
      {
        'type': 'ul',
        'children': [
          { type: 'li', text: '<code>andaga log</code> used for logging new entries' },
          { type: 'li', text: '<code>andaga recall</code> used for recalling the last entry' }
        ]
      },
      {
        'type': 'p',
        'text': 'An example of how to store a log can be found below:'
      },
      { 'type': 'div',
        'attributes': [
          { 'type': 'class', 'value': 'media-container' }
        ],
        'children': [
          { 'type': 'img',
            'attributes': [
              { 'type': 'src', 'value': 'media/andaga-cli.png' },
              { 'type': 'class', 'value': 'main-image' }
            ]
          }
        ]
      },
      {
        'type': 'p',
        'text': `The aim for ándaga-cli is to keep the project lean and only have it do the minimal necessary commands that I need from the command line. The bulk of the work will be done in <a href="#andaga-core">ándaga-core</a>. In the future I'd possibly like to build a pomodoro like timer directly into the cli portion of the project. I'd also like to add a way to track meaningful output for the day to best see under what conditions I'm working at my best.`
      }
    ]
  },
  'andaga-core': {
    'title': 'ándaga-core',
    'template': 'mainTemplate',
    'body': [
      {
        'type': 'h5',
        'text': 'Code: <a target="_blank" href="https://github.com/ckipp01/andaga-core">ándaga-core</a>'
      },
      {
        'type': 'p',
        'text': `ándaga-core is the main engine and api for my ándaga time-tracking system. After the first initial year of tracking with <a href="#andaga">ándaga</a>, I realized I wanted a better way to store my logs. I didn't want them to only be stored locally, and I wanted multiple programs to be able to interact them. I then created a small serverless api with Node hosted on <a target="_blank" href="https://zeit.co">Zeit</a>`
      },
      {
        'type': 'p',
        'text': 'There are currently only 3 routes built into the api:'
      },
      {
        'type': 'ul',
        'children': [
          { type: 'li', text: '<code>/category</code> used for receiving a list of categories that have been used' },
          { type: 'li', text: '<code>/log</code> used for storing logs' },
          { type: 'li', text: '<code>/recall</code> used for recalling the last entry' }
        ]
      },
      {
        'type': 'p',
        'text': 'As I continue to expand <a href="#andaga-cli">ándaga-cli</a> this api will become more robust.'
      }
    ]
  },
  'chronica': {
    'title': 'chronica',
    'template': 'mainTemplate',
    'body': [
      {
        'type': 'p',
        'text': `This is chronica. It's hard to fully explain what it is or what it will become because it is a playground of sorts for me. I wanted a place do display what I've been working on, and I wanted it to be a place fully built by me. No external tools, no build process, and no localhost. In some ways it's an experiment. A place for me to both work and display my work in a raw unpolished way that will hopefully provide a glimpse into where I'm at with the state of development, and also what I'm currently working and focusing on.`
      },
      {
        'type': 'p',
        'text': `To provide a bit of context, wiki.chronica is build using <a href="#gyul">gyul</a>. There is not build process apart from adding my data into a json file. wiki.chronica is also tied directly into my time tracking system, <a href="#andaga">ándaga</a>. Daily I used <a href="#andaga-cli">ándaga-cli</a> to log entries about what I'm working on. They are stored in a MongoDB database and nightly a cron job runs on my server run the script placed below:`
      },
      {
        'type': 'code',
        'attributes': [
          { 'type': 'class', 'value': 'code-block' }
        ],
        'text': "#!/bin/bash <br> mongoexport -u <i>user</i> -p <i>password</i> --db <i>database</i> --collection <i>collection</i> --jsonArray --authenticationDatabase <i>db</i> --out <i>outdir</i> && <br> cat <i>logs file</i> | jq 'map(del(._id))' > </i>log dir</i> && sed -i '1 \\const LOGS =' <i>log file</i> && <br> cd <i>wiki directory</i> && <br> git add . && <br> git commit -m 'nightly auto-commit and push of logs' && <br> git push"
      }
    ]
  },
  'gyul': {
    'title': '귤 gyul',
    'template': 'mainTemplate',
    'body': [
      { 'type': 'div',
        'attributes': [
          { 'type': 'class', 'value': 'media-container' }
        ],
        'children': [
          { 'type': 'h1',
            'text': '귤',
            'attributes': [
              { 'type': 'class', 'value': 'gyul-logo' }
            ]
          }
        ]
      },
      {
        'type': 'h5',
        'text': 'Code: <a target="_blank" href="https://github.com/ckipp01/gyul">gyul</a>'
      },
      {
        'type': 'p',
        'text': `Gyul is an attempt to make a small wiki engine that will seamlessly tie into my timetracker, <a href='#andaga'>ándaga</a>.`
      },
      {
        'type': 'p',
        'text': `For a while I found myself reverting to large frameworks for simple tasks just because I knew the technology. There came a point where I realized the amount of overhead they brought for such simple tasks was not always necessary. I set out to create something small and simple. This is my effort at that endeavor. It doesn't do a ton, but does exactly what I need it to. It's also flexible enough that if needed to be adapted for another project, it can be. This was my first attempt at creating something like this, and it was a huge learning experience. Expect to see this change and grow and I adjust to fix some of the trouble pointst that I know exist.`
      }
    ]
  },
  'language': {
    'title': 'language',
    'template': 'mainTemplate',
    'body': [
      {
        'type': 'p',
        'text': `This project is an ongoing one. I studied Spanish for 6 years when younger, studied in Mexico and Costa Rica, and then slowly watched the language dwindle away in my mind. I've studied some Turkish and spent 4 months traveling around Turkey. I was amazed at the amount of language one can learn in a short amount of time when forced to speak it and focused. I also started studying Korean when I met my wife and regularly take trips there.`
      },
      {
        'type': 'p',
        'text': 'In July of 2018 I moved to the Netherlands, so any current activity on language learning for the time being will probably be Dutch'
      }
    ]
  },
  'modernheirloomstudio': {
    'title': 'modern heirloom studio',
    'template': 'mainTemplate',
    'body': [
      { 'type': 'div',
        'attributes': [
          { 'type': 'class', 'value': 'media-container' }
        ],
        'children': [
          { 'type': 'img',
            'attributes': [
              { 'type': 'src', 'value': 'media/modern-heirloom-studio.png' },
              { 'type': 'class', 'value': 'main-image' }
            ]
          }
        ]
      },
      {
        'type': 'p',
        'text': 'Modern Heirloom Studio was studio name that my wife starter her art studio under. My small part in her project was creating a static site using <a target="_blank" href="https://nuxtjs.org">Nuxt</a>. She is now operating under the name <a href="#studiosyk">studio syk</a>.'
      }
    ]
  },
  'programming': {
    'title': 'programming',
    'template': 'mainTemplate',
    'body': [
      {
        'type': 'p',
        'text': `I'm a self-taught programmer that started programming out of a curiousity. It didn't take long for me to completely fall in love with the idea of being able to create what I could envision. I consider myself a developer that enjoys working both with front and back end technologies. I dabble in everything that I can get my hands on. I enjoy writing scripts, improving development process, and helping lower the barriers to tech. Professionally I work primarily in JavaScript and Scala, but you can get a picutre of language and focuses by peaking at the tags tab.`
      }
    ]
  },
  'scripts': {
    'title': 'scripts',
    'template': 'mainTemplate',
    'body': [
      {
        'type': 'p',
        'text': `Writing small scripts to accomplish tasks is one of my favorite things to do. If I find myself doing something multiple times in a row, my mind always questions how I can automate the process. Most of the scripts I've written are in Bash and solve pretty specific problems that I've encountered.`
      }
    ]
  },
  'studiosyk': {
    'title': 'studio syk',
    'template': 'mainTemplate',
    'body': [
      { 'type': 'div',
        'attributes': [
          { 'type': 'class', 'value': 'media-container' }
        ],
        'children': [
          { 'type': 'img',
            'attributes': [
              { 'type': 'src', 'value': 'media/studiosyk.png' },
              { 'type': 'class', 'value': 'main-image' }
            ]
          }
        ]
      },
      {
        'type': 'h5',
        'text': 'Code: <a target="_blank" href="https://github.com/ckipp01/studiosyk">studio syk</a>'
      },
      {
        'type': 'p',
        'text': `<a target="_blank" href="https://studiosyk.com">studio syk</a> is my wife's studio. She's a marbling artist that primarily works on fabric. Her site is a static site build with <a target="_blank" href="https://nextjs.org">Next.js</a>.`
      }
    ]
  },
  'waka-fetch': {
    'title': 'waka-fetch',
    'template': 'mainTemplate',
    'body': [
      { 'type': 'div',
        'attributes': [
          { 'type': 'class', 'value': 'media-container' }
        ],
        'children': [
          { 'type': 'img',
            'attributes': [
              { 'type': 'src', 'value': 'media/waka-fetch.jpg' },
              { 'type': 'class', 'value': 'main-image' }
            ]
          }
        ]
      },
      {
        'type': 'h5',
        'text': 'Code: <a target="_blank" href="https://github.com/ckipp01/waka-fetch">waka-fetch</a>'
      },
      {
        'type': 'p',
        'text': 'waka-fetch is a small serverless app hosted on <a target="_blank" href="https://zeit.co">Zeit</a> that grabs my daily <a target="_blank" href="https://wakatime.com">wakatime</a> summaries. I grab these summaries and store them in a MongoDB database. I grab them in order to feed them into my <a href="#waka-machine">waka-machine</a> project will gives me projections on what my coding activity will look like in the week to come.'
      }
    ]
  },
  'waka-machine': {
    'title': 'waka-machine',
    'template': 'mainTemplate',
    'body': [
      {
        'type': 'h5',
        'text': 'Code: <a target="_blank" href="https://github.com/ckipp01/waka-machine">waka-machine</a>'
      },
      {
        'type': 'p',
        'text': 'waka-machine is my first stab at machine learning. It takes my daily coding activity that <a href="#waka-fetch">waka-fetch</a> grabs and provides projections for the upcoming week.'
      },
      {
        'type': 'p',
        'text': `This project currently only works locally. However, I've moved pretty much all of my backend projects over to serverless architecture. The plan for this project is to do the same. Nightly, after my daily summary is pulled, I'd like to run it through waka-machine to give my projection for the next week. Then, these will be added to <a href="#chronica">chronica</a> in a very similiar way as my logs to ensure that they are automatically updated daily.`
      }
    ]
  },
  'workspace': {
    'title': 'workspace',
    'template': 'mainTemplate',
    'body': [
      { 'type': 'div',
        'attributes': [
          { 'type': 'class', 'value': 'media-container' }
        ],
        'children': [
          { 'type': 'img',
            'attributes': [
              { 'type': 'src', 'value': 'media/desktop3.png' },
              { 'type': 'class', 'value': 'main-image' }
            ]
          }
        ]
      },
      {
        'type': 'h5',
        'text': 'Code: <a target="_blank" href="https://github.com/ckipp01/dots">dots</a>'
      },
      {
        'type': 'p',
        'text': `As soon as I started developing I became interested in making sure the machine I was working on for at least 8 hours a day felt pleasant to look at and worked well. I'm amazed at the amount of ways you can tweak your machine and tools to work for you and to look the way you want. If not, then you can also freely build your own.`
      },
      {
        'type': 'ul',
        'children': [
          { type: 'li', text: 'OS: Ubuntu 18.04' },
          { type: 'li', text: 'Terminal: Termite' },
          { type: 'li', text: 'Primary text editor for anything but Scala: Vim' },
          { type: 'li', text: 'Primary text editor for Scala: IntelliJ' },
          { type: 'li', text: 'Browser: Vivaldi or Firefox' },
          { type: 'li', text: 'Other daily software: Keybase, Slack, Spotify' }
        ]
      }
    ]
  },
  'home': {
    'title': 'welcome',
    'template': 'homeTemplate',
    'body': [
      {
        'type': 'p',
        'text': `Feel free to explore. This is my collected works and logs. If you don't know here to start, you can get an introduction <a href='#chronica'>here</a> or click on any of the projects below.`
      },
      {
        'type': 'div',
        'attributes': [
          { 'type': 'class', 'value': 'project-list' }
        ],
        'text': test(LOGS).join('')
      }
    ]
  },
  'missing': {
    'title': 'Missing',
    'template': 'mainTemplate',
    'body': [
      {
        'type': 'p',
        'text': `I'm unaware of this entry`
      }
    ]
  }
}

function createProjectObject (acc, cur) {
  acc[cur.project] = acc[cur.project] || {}
  acc[cur.project].time = acc[cur.project].time || 0
  acc[cur.project].entries = acc[cur.project].entries || 0
  acc[cur.project].time = acc[cur.project].time += cur.time
  acc[cur.project].entries = acc[cur.project].entries += 1
  return acc
}

function test (logs) {
  const logsObject = logs
    .filter(_ => _.project !== undefined)
    .reduce(createProjectObject, Object.create(null))
  const projects = Object.keys(logsObject)
  return projects
    .sort()
    .map(p => `<div>
                  <p>Project: <a href='#${p}'>${p}</a><br>
                  Time: ${logsObject[p].time} minutes<br>
                  Entries: ${logsObject[p].entries} logs
                </div>`)
}
