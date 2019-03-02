'use strict'
/* global CRATE, LOGS, GYUL, TEMPLATES */

class Gyul {
  constructor (page) {
    page
      ? this.key = page.substring(1)
      : this.key = 'home'
    this.tree = retrieveTree(this.key)
    this.logs = LOGS.filter(log => log.project === this.key)
    this.groupedLogs = groupByType(this.logs)
    this.tags = this.logs
      .flatMap(log => log.tags)
      .filter(log => log !== undefined)
    this.template = retrieveTemplate(
      this.tree.template,
      this.tree.title,
      this.tree.body
    )
  }
  package () {
    for (const section in this.template) {
      const sectionElem =
        document.body.appendChild(createElem({ elem: { 'type': section } }))
      this.template[section]
        .forEach(elem => createElem({ elem: elem, parent: sectionElem }))
    }
    if (this.tree.template === 'mainTemplate') handleTabUnderline('info')
  }
}

const createElem = elemObject => {
  const elem = document.createElement(elemObject.elem.type)

  if (elemObject.elem.text) { elem.innerHTML = elemObject.elem.text }

  if (elemObject.elem.attributes) {
    elemObject.elem.attributes
      .map(attribute => elem.setAttribute(attribute.type, attribute.value))
  }

  if (elemObject.elem.children) {
    elemObject.elem.children
      .forEach(childElem => createElem({ elem: childElem, parent: elem }))
  }

  if (elemObject.parent) {
    elemObject.parent.appendChild(elem)
  } else {
    return elem
  }
}

const retrieveTree = key => CRATE[key] ? CRATE[key] : CRATE.missing

const retrieveTemplate = (template, title, body) => {
  const t = TEMPLATES[template]
  return t(title, body)
}

const handleTabUnderline = (id) => {
  const tabs = ['info', 'stats', 'logs', 'tags']
  const toRemove = tabs.filter(_ => _ !== id)
  toRemove.forEach(item => {
    const targetTab = document.getElementById(item)
    if (targetTab !== null) {
      targetTab.removeAttribute('style')
    }
  })
  const targetTab = document.getElementById(id)
  if (targetTab !== null) {
    targetTab.setAttribute('style', 'text-decoration:underline#45503B')
  }
}
const showInfo = () => {
  handleTabUnderline('info')
  const main = document.getElementsByTagName('main')[0]
  main.innerHTML = ''
  GYUL.template.main
    .forEach(elem => createElem({ elem: elem, parent: main }))
}

const showStats = () => {
  handleTabUnderline('stats')
  const main = document.getElementsByTagName('main')[0]
  const categoryTotal = GYUL.logs.reduce((acc, cur) => acc + cur.time, 0)
  const categories = Object.keys(GYUL.groupedLogs).sort()

  const summarizer = (acc, cur) => {
    acc[cur.category] = acc[cur.category] || Object.create(null)
    acc[cur.category].time = acc[cur.category].time || 0
    acc[cur.category].time += cur.time
    return acc
  }

  const totals = categories.map(category => {
    const y = GYUL.groupedLogs[category]
      .reduce(summarizer, Object.create(null))
    y[category].totalLogs = GYUL.groupedLogs[category].length
    y[category].percentage = Math.round((y[category].time / categoryTotal) * 100)
    return y
  })

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
}

const showLogs = () => {
  handleTabUnderline('logs')
  const main = document.getElementsByTagName('main')[0]
  const logNotes = GYUL.logs
    .reverse()
    .map(log => `<p>${log.notes}<br>${log.date}<br>${log.time} minutes</p>`)
  const logNotesWithHeading = [`<h3>Breakdown of ${logNotes.length} logs</h3>`, ...logNotes]
  main.innerHTML = logNotesWithHeading.join('')
}

const showTags = () => {
  handleTabUnderline('tags')
  const main = document.getElementsByTagName('main')[0]
  const tagCounter = (acc, cur) => {
    (acc[cur] = acc[cur] || 0)
    acc[cur] = acc[cur] += 1
    return acc
  }
  const countedTags = GYUL.tags.reduce(tagCounter, {})
  const tagNames = Object.keys(countedTags).sort()
  const tags = tagNames
    .map(tagName => `<p>${countedTags[tagName]} - <a href='#${tagName}'>${tagName}</p></a>`)
  const tagsWithHeading = [`<h3>Tagged with ${GYUL.tags.length} tags</h3>`, ...tags]
  main.innerHTML = tagsWithHeading.join('')
}

const groupByType = logs => {
  return logs.reduce((acc, cur) => {
    (acc[cur.category] = acc[cur.category] || []).push(cur)
    return acc
  }, Object.create(null))
}

const switchHeader = () => {
  const header = document.getElementsByTagName('header')[0]
  header.innerHTML = ''
  GYUL.template.header
    .forEach(elem => createElem({ elem: elem, parent: header }))
}

window.addEventListener('hashchange', (e) => {
  GYUL.key = window.location.hash.substring(1)
  GYUL.tree = retrieveTree(GYUL.key)
  GYUL.logs = LOGS.filter(log => log.project === GYUL.key)
  GYUL.groupedLogs = groupByType(GYUL.logs)
  GYUL.tags = GYUL.logs
    .flatMap(log => log.tags)
    .filter(log => log !== undefined)
  GYUL.template = retrieveTemplate(
    GYUL.tree.template,
    GYUL.tree.title,
    GYUL.tree.body
  )
  switchHeader()
  showInfo()
})
