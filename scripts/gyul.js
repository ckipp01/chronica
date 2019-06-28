'use strict'
/* global CRATE, LOGS, GYUL, TEMPLATES, createActivityGraph, padNumber, groupByKey */

const Gyul = () => {
  const crateKeys = Object.keys(CRATE)
  const packagedCrate = {}
  console.time('Packaged Crate Time')
  for (const key in CRATE) {
    const logs = LOGS.filter(log => log.project === key)
    const tree = retrieveTree(key)
    const groupedLogs = groupByKey(logs, 'category')
    const tags = logs
      .map(log => log.tags)
      .reduce((flattenedTags, tags) => flattenedTags.concat(tags), [])
      .filter(log => log !== undefined)
    const template = retrieveTemplate(tree.template, tree.title, tree.body)
    packagedCrate[key] = { logs, groupedLogs, tags, tree, template }
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

      const activityGraph = `<h3>Activity in previous 90 days</h3>${createActivityGraph(packagedCrate[key].logs)}`

      const projectTotal = packagedCrate[key].logs.reduce((acc, cur) => acc + cur.time, 0)
      const categories = Object.keys(packagedCrate[key].groupedLogs).sort()

      const groupByLogType = (groupedLogs, log) => {
        groupedLogs[log.category] = groupedLogs[log.category] || {}
        groupedLogs[log.category].time = groupedLogs[log.category].time || 0
        groupedLogs[log.category].time += log.time
        return groupedLogs
      }

      const createGroupedLogs = category => {
        const groupedLogs = packagedCrate[key].groupedLogs[category]
          .reduce(groupByLogType, {})
        groupedLogs[category].totalLogs = packagedCrate[key].groupedLogs[category].length
        groupedLogs[category].percentage = Math.round((groupedLogs[category].time / projectTotal) * 100)
        return groupedLogs
      }

      const totals = categories.map(createGroupedLogs)

      const createProjectKeys = (keyString, typeObject) => {
        const type = Object.keys(typeObject)[0]
        return `${keyString}<div class="key-block">
              <svg height="10" width="10" class="key-color">
                <rect rx="2" width="10" height="10" class="${type}-logbar" />
              </svg>
              <p>${type} ${typeObject[type].percentage}%</p>
            </div>`
      }

      const projectKeys = totals.reduce(createProjectKeys, '')

      const wrappedKeys = `<div class='keys-container'>${projectKeys}</div>`

      const constructRects = (rectString, typeObject) => {
        const type = Object.keys(typeObject)[0]
        const width = 500 * (typeObject[type].percentage / 100)
        return `${rectString}<div class="graph-container">
                    <svg height="10">
                      <rect rx="2" width="${width}" height="10" class="${type}-logbar" />
                    </svg>
                  </div>`
      }

      const rects = totals.reduce(constructRects, '')
      const rectsWithHeading = `<h3>Breakdown of ${projectTotal} total project minutes over ${packagedCrate[key].logs.length} total logs</h3>${rects}`

      main.innerHTML = wrappedKeys + activityGraph + rectsWithHeading
      handleTabUnderline('stats')
    },
    showTags: rawKey => {
      const key = peelKey(rawKey, crateKeys)
      const main = document.getElementsByTagName('main')[0]
      const tagCounter = (tagCount, tag) => {
        tagCount[tag] = tagCount[tag] || 0
        tagCount[tag] = tagCount[tag] += 1
        return tagCount
      }
      const countedTags = packagedCrate[key].tags.reduce(tagCounter, {})
      const tagNames = Object.keys(countedTags).sort()

      const createTags = (tagString, tagName) => `${tagString}<p>${padNumber(countedTags[tagName])} - <a href='#${tagName}'>${tagName}</p></a>`
      const tags = tagNames.reduce(createTags, '')
      const tagPlurality = packagedCrate[key].tags.length === 1 ? 'tag' : 'tags'

      const gatherTaggers = (taggedByArray, entry) => {
        const length = packagedCrate[entry].tags.filter(tag => tag === key).length
        if (length > 0) taggedByArray.push({ project: entry, times: length })
        return taggedByArray
      }

      const taggedBy = Object.keys(packagedCrate).reduce(gatherTaggers, [])
      const createTaggersString = (taggerString, tagger) => `${taggerString}<p>${padNumber(tagger.times)} - <a href='#${tagger.project}'>${tagger.project}</p></a>`
      const taggers = taggedBy.reduce(createTaggersString, '')
      const taggerPlurality = taggedBy.length === 1 ? 'project' : 'projects'
      const taggersWithHeading = `<h3>Tagged by ${taggedBy.length} other ${taggerPlurality}</h3>${taggers}`
      const tagsWithHeading = `<h3>Tagged with ${packagedCrate[key].tags.length} ${tagPlurality}</h3>${tags}`

      main.innerHTML = tagsWithHeading + taggersWithHeading
      handleTabUnderline('tags')
    },
    switchHeader: rawKey => {
      const key = peelKey(rawKey, crateKeys)
      const header = document.getElementsByTagName('header')[0]
      header.innerHTML = ''
      packagedCrate[key].template.header
        .forEach(elem => createElem({ elem, parent: header }))
    },
    report: () => {
      const missingProjects = LOGS
        .map(log => log.project)
        .filter((v, i, a) => a.indexOf(v) === i)
        .filter(project => project !== undefined)
        .filter(project => !crateKeys.includes(project))
        .sort()
      missingProjects.length === 0
        ? console.info('No missing project entries in CRATE')
        : console.info(`Missing following project entries in CRATE: ${missingProjects.toString()}`)
      const missingTags = LOGS
        .map(log => log.tags)
        .reduce((flattenedTags, tags) => flattenedTags.concat(tags), [])
        .filter((v, i, a) => a.indexOf(v) === i)
        .filter(tag => tag !== undefined)
        .filter(tag => !crateKeys.includes(tag))
        .sort()
      missingTags.length === 0
        ? console.info('No missing tag entries in CRATE')
        : console.info(`Missing following tag entries in CRATE: ${missingTags.toString()}`)
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
  const tabs = ['info', 'stats', 'tags']
  const tabUnderlineToRemove = tabs.filter(tab => tab !== tabName)
  tabUnderlineToRemove.forEach(tabUnderline => {
    const targetTab = document.getElementById(tabUnderline)
    if (targetTab !== null) targetTab.removeAttribute('style')
  })
  const targetTab = document.getElementById(tabName)
  if (targetTab !== null) targetTab.setAttribute('style', 'text-decoration:underline#45503B')
}

window.addEventListener('hashchange', () => {
  const newLocation = window.location.hash
  GYUL.switchHeader(newLocation)
  GYUL.showInfo(newLocation)
})
