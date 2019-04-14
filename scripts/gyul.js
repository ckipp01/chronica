'use strict'
/* global CRATE, LOGS, GYUL, TEMPLATES */

const Gyul = () => {
  const crateKeys = Object.keys(CRATE)
  const packagedCrate = {}
  console.time('Packaged Crate Time')
  for (const key in CRATE) {
    const logs = LOGS.filter(log => log.project === key)
    const tree = retrieveTree(key)
    packagedCrate[key] = {
      logs,
      groupedLogs: groupByType(logs),
      tags: logs
        .flatMap(log => log.tags)
        .filter(log => log !== undefined),
      tree,
      template: retrieveTemplate(
        tree.template,
        tree.title,
        tree.body
      )
    }
  }
  console.timeEnd('Packaged Crate Time')
  return {
    package: rawKey => {
      const key = peelKey(rawKey, crateKeys)
      for (const section in packagedCrate[key].template) {
        const sectionElem =
          document.body.appendChild(createElem({ elem: { 'type': section } }))
        packagedCrate[key].template[section]
          .forEach(elem => createElem({ elem, parent: sectionElem }))
      }
      if (packagedCrate[key].tree.template === 'main') handleTabUnderline('info')
    },
    showLogs: rawKey => {
      const key = peelKey(rawKey, crateKeys)
      const main = document.getElementsByTagName('main')[0]
      const logNotes = packagedCrate[key].logs
        .map(log => `<p>${log.notes}<br>${log.date}<br>${log.time} minutes</p>`)
      const plurality = logNotes.length > 1 ? 'logs' : 'log'
      const logNotesWithHeading = [`<h3>Breakdown of ${logNotes.length} ${plurality}</h3>`, ...logNotes]
      main.innerHTML = logNotesWithHeading.join('')
      handleTabUnderline('logs')
    },
    showInfo: rawKey => {
      const key = peelKey(rawKey, crateKeys)
      const main = document.getElementsByTagName('main')[0]
      main.innerHTML = ''
      packagedCrate[key].template.main
        .forEach(elem => createElem({ elem, parent: main }))
      handleTabUnderline('info')
    },
    showStats: rawKey => {
      const key = peelKey(rawKey, crateKeys)
      const main = document.getElementsByTagName('main')[0]
      const categoryTotal = packagedCrate[key].logs.reduce((acc, cur) => acc + cur.time, 0)
      const categories = Object.keys(packagedCrate[key].groupedLogs).sort()

      const groupByLogType = (groupedLogs, log) => {
        groupedLogs[log.category] = groupedLogs[log.category] || Object.create(null)
        groupedLogs[log.category].time = groupedLogs[log.category].time || 0
        groupedLogs[log.category].time += log.time
        return groupedLogs
      }

      const createGroupedLogs = category => {
        const groupedLogs = packagedCrate[key].groupedLogs[category]
          .reduce(groupByLogType, Object.create(null))
        groupedLogs[category].totalLogs = packagedCrate[key].groupedLogs[category].length
        groupedLogs[category].percentage = Math.round((groupedLogs[category].time / categoryTotal) * 100)
        return groupedLogs
      }

      // Takes grouped logs and also groups them by log type
      const totals = categories.map(createGroupedLogs)

      const keys = totals.map(total => {
        const type = Object.keys(total)[0]
        return `<div class="key-block">
              <svg height="10" width="10" class="key-color">
                <rect width="10" height="10" class="${type}-logbar" />
              </svg>
              <p>${type} ${total[type].percentage}%</p>
            </div>`
      })

      const wrappedKeys = [
        `<h3>Breakdown of ${categoryTotal} minutes</h3><div class='keys-container'>`,
        ...keys,
        `</div>`
      ]

      const rects = totals.map(total => {
        const type = Object.keys(total)[0]
        const width = 500 * (total[type].percentage / 100)
        const rect = `<div class="graph-container">
                    <svg height="7">
                      <rect width="${width}" height="7" class="${type}-logbar" />
                    </svg>
                  </div>`
        return rect
      })

      const innards = [...wrappedKeys, ...rects]

      main.innerHTML = innards.join('')
      handleTabUnderline('stats')
    },
    showTags: rawKey => {
      const key = peelKey(rawKey, crateKeys)
      const main = document.getElementsByTagName('main')[0]
      const tagCounter = (tagCount, tag) => {
        (tagCount[tag] = tagCount[tag] || 0)
        tagCount[tag] = tagCount[tag] += 1
        return tagCount
      }
      const flattened = [].concat.apply([], packagedCrate[key].tags)
      const countedTags = flattened.reduce(tagCounter, {})
      const tagNames = Object.keys(countedTags).sort()
      const finalTags = tagNames
        .map(tagName => `<p>${countedTags[tagName]} - <a href='#${tagName}'>${tagName}</p></a>`)
      const plurality = packagedCrate[key].tags.length > 1 ? 'tags' : 'tag'
      const tagsWithHeading = [`<h3>Tagged with ${packagedCrate[key].tags.length} ${plurality}</h3>`, ...finalTags]
      main.innerHTML = tagsWithHeading.join('')
      handleTabUnderline('tags')
    },
    switchHeader: rawKey => {
      const key = peelKey(rawKey, crateKeys)
      const header = document.getElementsByTagName('header')[0]
      header.innerHTML = ''
      packagedCrate[key].template.header
        .forEach(elem => createElem({ elem, parent: header }))
    }
  }
}

const peelKey = (rawKey, crateKeys) => {
  const strippedKey = rawKey.charAt(0) === '#' ? rawKey.substring(1) : rawKey
  if (strippedKey === '') return 'home'
  else if (crateKeys.indexOf(strippedKey) === -1) return 'missing'
  else return strippedKey
}

const createElem = elemObject => {
  const elem = document.createElement(elemObject.elem.type)

  if (elemObject.elem.text) elem.innerHTML = elemObject.elem.text

  if (elemObject.elem.attributes) {
    elemObject.elem.attributes
      .forEach(attribute => elem.setAttribute(attribute.type, attribute.value))
  }

  if (elemObject.elem.children) {
    elemObject.elem.children
      .forEach(childElem => createElem({ elem: childElem, parent: elem }))
  }

  if (elemObject.parent) elemObject.parent.appendChild(elem)
  else return elem
}

const retrieveTree = key => CRATE[key] ? CRATE[key] : CRATE.missing

const retrieveTemplate = (template, title, body) => {
  const t = TEMPLATES[template]
  return t(title, body)
}

const handleTabUnderline = tabName => {
  const tabs = ['info', 'stats', 'logs', 'tags']
  const tabUnderlineToRemove = tabs.filter(tab => tab !== tabName)
  tabUnderlineToRemove.forEach(tabUnderline => {
    const targetTab = document.getElementById(tabUnderline)
    if (targetTab !== null) targetTab.removeAttribute('style')
  })
  const targetTab = document.getElementById(tabName)
  if (targetTab !== null) targetTab.setAttribute('style', 'text-decoration:underline#45503B')
}

const groupByType = logs => {
  return logs.reduce((logGroup, log) => {
    (logGroup[log.category] = logGroup[log.category] || []).push(log)
    return logGroup
  }, Object.create(null))
}

window.addEventListener('hashchange', () => {
  GYUL.switchHeader(window.location.hash)
  GYUL.showInfo(window.location.hash)
})
