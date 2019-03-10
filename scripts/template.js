'use strict'
const footer = [
  { type: 'div',
    attributes: [{ type: 'class', value: 'contact' }],
    children: [
      {
        type: 'a',
        attributes: [
          { type: 'href', value: 'https://github.com/ckipp01' },
          { type: 'target', value: '_blank' }
        ],
        children: [
          { type: 'img',
            attributes: [
              { type: 'src', value: 'media/github.png' },
              { type: 'alt', value: 'Github icon' }
            ]
          }
        ]
      },
      { type: 'a',
        attributes: [
          { type: 'href', value: 'https://merveilles.town/@ckipp' },
          { type: 'target', value: '_blank' }
        ],
        children: [
          { type: 'img',
            attributes: [
              { type: 'src', value: 'media/merveilles.svg' },
              { type: 'alt', value: 'Merveilles mastodon icon' }
            ]
          }
        ]
      },
      { type: 'a',
        attributes: [
          { type: 'href', value: 'https://webring.xxiivv.com' },
          { type: 'target', value: '_blank' }
        ],
        children: [
          { type: 'img',
            attributes: [
              { type: 'src', value: 'https://webring.xxiivv.com/icon.black.svg' },
              { type: 'alt', value: 'Webring icon' }
            ]
          }
        ]
      }
    ]
  },
  { type: 'a',
    attributes: [
      { type: 'href', value: 'https://creativecommons.org/licenses/by-nc-sa/4.0/' },
      { type: 'target', value: '_blank' }
    ],
    text: 'CC BY-NC-SA 4.0'
  }
]

const TEMPLATES = {
  mainTemplate: function (title, body) {
    const t = {
      header: [
        { type: 'a',
          attributes: [
            { type: 'href', value: '#home' },
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
                { type: 'class', value: 'tabs' },
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
      footer: footer
    }
    return t
  },
  homeTemplate: function (title, body) {
    const t = {
      header: [
        { type: 'a',
          attributes: [
            { type: 'href', value: '#home' },
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
              text: 'welcome to the chronica wiki'
            }
          ]
        }
      ],
      main: body,
      footer: footer
    }
    return t
  }
}
