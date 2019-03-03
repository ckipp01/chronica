const CRATE = {
  'andaga': {
    'title': 'ándaga',
    'template': 'mainTemplate',
    'body': [
      { 'type': 'img',
        'attributes': [
          { 'type': 'src', 'value': 'media/andaga.png' },
          { 'type': 'class', 'value': 'main-image' }
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
        'text': `The aim for ándaga-cli is to keep the project lean and only have it do the minimal necessary commands that I need from the command line. The bulk of the work will be done in <a href="#andaga-core">ándaga-core</a>. In the future I'd possibly like to build a pomodoro like timer directly into the cli portion of the project, but for now, that's a bit out of scope.`
      }
    ]
  },
  'andaga-core': {
    'title': 'ándaga-core',
    'template': 'mainTemplate',
    'body': []
  },
  'chronica': {
    'title': 'chronica',
    'template': 'mainTemplate',
    'body': [
      {
        'type': 'p',
        'text': '<a href="#gyul">Lorem</a> ipsum dolor sit amet, consectetur adipiscing elit. Etiam quis accumsan purus. Pellentesque dui elit, egestas rutrum tempor et, commodo vel urna. Donec ornare dictum gravida. Donec fringilla tortor in eros volutpat pharetra. Vestibulum ornare, tellus non placerat tristique, nulla elit feugiat ligula, at dictum arcu velit ut libero. Integer in diam in felis hendrerit consectetur at sit amet sapien. Cras efficitur leo nec mi bibendum posuere vitae ac ex.'
      },
      {
        'type': 'p',
        'text': 'Etiam vitae maximus velit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas euismod interdum condimentum. Nunc aliquet, ante eu pellentesque efficitur, erat nibh consequat lectus, ac cursus sapien mauris in felis. Donec dictum tellus ut nibh lacinia, at lobortis tortor porta. Donec rhoncus aliquet aliquet. Integer tortor lorem, porttitor eu congue vitae, scelerisque vel leo. Vestibulum non laoreet nibh, non commodo tellus. Proin ut semper nisi, et commodo magna. Pellentesque at sapien metus. Donec dictum eros eget lacus iaculis pretium. Ut maximus ligula pellentesque ante molestie, gravida tincidunt velit mollis. In vel cursus mi.'
      },
      {
        'type': 'p',
        'text': 'Nulla tincidunt convallis posuere. Praesent euismod ipsum et est laoreet, sed imperdiet eros accumsan. Nullam vitae aliquet tortor, in fringilla tellus. Aenean sit amet ante non odio lobortis consequat eget ut nisi. Sed at felis faucibus, cursus orci ut, commodo justo. Curabitur leo turpis, vulputate sit amet convallis sit amet, molestie eget neque. Nam sit amet fringilla eros.'
      },
      {
        'type': 'p',
        'text': 'Etiam tincidunt egestas magna, vel scelerisque quam dignissim id. Suspendisse dapibus orci in dolor semper venenatis vitae eget lorem. Nam rhoncus vel justo quis gravida. Etiam ligula sapien, feugiat ac diam nec, tempus laoreet ex. Donec nisl est, accumsan lobortis purus eget, tristique aliquam enim. Nulla facilisi. In facilisis pellentesque dolor ut finibus. Sed ac massa non mi finibus dictum. Nulla facilisi.'
      },
      {
        'type': 'p',
        'text': 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nunc tempus enim at ornare dapibus. Nunc est magna, vestibulum nec tempus sed, condimentum in mi. Proin vehicula turpis ut est porta eleifend. Etiam nisl odio, malesuada a quam ut, porta sodales nulla. Nunc tristique viverra malesuada. Duis feugiat placerat vestibulum. Nunc placerat tortor et mauris scelerisque sodales. Nulla facilisi. Phasellus iaculis fermentum nisi et mattis.'
      }
    ]
  },
  'gyul': {
    'title': '귤 gyul',
    'template': 'mainTemplate',
    'body': [
      { 'type': 'img',
        'attributes': [
          { 'type': 'src', 'value': 'media/gyul.png' },
          { 'type': 'class', 'value': 'main-image' }
        ]
      },
      {
        'type': 'p',
        'text': `Gyul is an attempt to make a small wiki engine that will seamlessly tie into my timetracker, <a href='#andaga'>ándaga </a>.`
      },
      {
        'type': 'p',
        'text': `For a while I found myself reverting to large frameworks for simple tasks just because I knew the technology. There came a point where I realized the amount of overhead they brought for such simple tasks was not always necessary. I set out to create something small and simple. This is my effort at that endeavor. It doesn't to a ton, but does exactly what I need it to. It's also flexible enough that if needed to be adapted for another project, it can be.`
      }
    ]
  },
  'language': {
    'title': 'language',
    'template': 'mainTemplate',
    'body': []
  },
  'modernheirloomstudio': {
    'title': 'modern heirloom studio',
    'template': 'mainTemplate',
    'body': []
  },
  'programming': {
    'title': 'programming',
    'template': 'mainTemplate',
    'body': []
  },
  'scripts': {
    'title': 'scripts',
    'template': 'mainTemplate',
    'body': []
  },
  'studiosyk': {
    'title': 'studio syk',
    'template': 'mainTemplate',
    'body': []
  },
  'waka-fetch': {
    'title': 'waka-fetch',
    'template': 'mainTemplate',
    'body': []
  },
  'waka-machine': {
    'title': 'waka-machine',
    'template': 'mainTemplate',
    'body': []
  },
  'workspace': {
    'title': 'workspace',
    'template': 'mainTemplate',
    'body': []
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
