'use strict'

const TEMPLATES = {
  mainTemplate: function (title, body) {
    const t = {
      header: [
        { type: 'a',
          attributes: [
            { type: 'href', value: 'index.html#home' },
            { type: 'class', value: 'logo' }
          ],
          children: [
            { type: 'h1', text: 'chronica' }
          ]
        },
        { type: 'h2', text: title },
        { type: 'div',
          attributes: [{ type: 'class', value: 'flex-center' }],
          children: [
            { type: 'h5',
              text: 'info',
              attributes: [
                { type: 'class', value: 'tabs info' },
                { type: 'id', value: 'info' },
                { type: 'onclick', value: 'showInfo()' }
              ]
            },
            { type: 'h5',
              text: 'stats',
              attributes: [
                { type: 'class', value: 'tabs' },
                { type: 'id', value: 'stats' },
                { type: 'onclick', value: 'showStats()' }
              ]
            },
            { type: 'h5',
              text: 'logs',
              attributes: [
                { type: 'class', value: 'tabs' },
                { type: 'id', value: 'logs' },
                { type: 'onclick', value: 'showLogs()' }
              ]
            },
            { type: 'h5',
              text: 'tags',
              attributes: [
                { type: 'class', value: 'tabs' },
                { type: 'id', value: 'tags' },
                { type: 'onclick', value: 'showTags()' }
              ]
            }
          ]
        }
      ],
      main: body,
      footer: []
    }
    return t
  },
  homeTemplate: function (title, body) {
    const t = {
      header: [
        { type: 'a',
          attributes: [
            { type: 'href', value: 'index.html#home' },
            { type: 'class', value: 'logo' }
          ],
          children: [
            { type: 'h1', text: 'chronica' }
          ]
        },
        { type: 'h2', text: title },
        { type: 'div',
          attributes: [{ type: 'class', value: 'flex-center' }],
          children: [
            { type: 'p',
              text: 'welcome to the chronica wiki'
            }
          ]
        }
      ],
      main: body,
      footer: []
    }
    return t
  }
}
