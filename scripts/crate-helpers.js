'use-strict'

const createProjectObject = (acc, cur) => {
  acc[cur.project] = acc[cur.project] || {}
  acc[cur.project].time = acc[cur.project].time || 0
  acc[cur.project].entries = acc[cur.project].entries || 0
  acc[cur.project].time = acc[cur.project].time += cur.time
  acc[cur.project].entries = acc[cur.project].entries += 1
  return acc
}

const createProjects = logs => {
  const logsObject = logs
    .filter(log => log.project !== undefined)
    .reduce(createProjectObject, Object.create(null))
  const projects = Object.keys(logsObject)
  return projects
    .sort()
    .map(p => {
      const plurality = logsObject[p].entries > 1 ? 'logs' : 'log'
      return `<div>
                <p>Project: <a href='#${p}'>${p}</a><br>
                Time: ${logsObject[p].time} minutes<br>
                Entries: ${logsObject[p].entries} ${plurality} 
               </div>`
    })
}

const padNumber = number => number < 10 ? '0' + number : number

const getDaysToCuttoff = amount => {
  return Array(amount)
    .fill()
    .map((_, index) => getDate(index))
}

const getDate = daysAgo => {
  const today = new Date()
  const cutoffTimestamp = new Date().setDate(today.getDate() - daysAgo)
  const cutoffDate = new Date(cutoffTimestamp)
  const cutoffYear = cutoffDate.getFullYear()
  const cutoffMonth = padNumber(cutoffDate.getMonth() + 1)
  const cutoffDay = padNumber(cutoffDate.getDate())
  return `${cutoffYear}-${cutoffMonth}-${cutoffDay}`
}

const groupByKey = (arr, key) => {
  return arr.reduce((acc, cv) => {
    (acc[cv[key]] = acc[cv[key]] || []).push(cv)
    return acc
  }, {})
}

const createProjectRect = highestMark => (rects, project) => {
  const percentageOfHighest = project.time / highestMark * 100
  const height = percentageOfHighest / 155 * 100
  const lastRect = rects[rects.length - 1]
  const offSet = lastRect
    ? lastRect[1] + 1
    : 0

  const tuple = [`<rect class="${project.category + '-logbar'}" y="${offSet}%" width="90%" height="${height}%"></rect>`, height + offSet]

  rects.push(tuple)
  return rects
}

const createDayGraph = highestMark => (days, day) => {
  const rects = day
    ? day.reduce(createProjectRect(highestMark), [])
    : []

  return `${days}<svg>${rects.map(rect => rect[0]).toString().replace(/,/g, '')}</svg>`
}

const getTotalHoursForDay = day => {
  return day.reduce((totalTime, log) => { return totalTime + log.time }, 0)
}

const findHighestMark = (currentHighest, day) => {
  const totalHoursForDay = day
    ? getTotalHoursForDay(day)
    : 0

  if (totalHoursForDay > currentHighest) {
    return getTotalHoursForDay(day)
  } else {
    return currentHighest
  }
}

const createKeys = logs => {
  const all = logs
    .map(log => log.category)
    .filter(category => category !== undefined)

  const unique = [...new Set(all)]

  return unique.reduce((keys, key) => {
    return `${keys}<div class="key-block">
             <svg height="10" width="10" class="key-color">
               <rect width="10" height="10" class="${key}-logbar" />
             </svg>
             <p>${key}</p>
           </div>`
  }, '')
}

const createActivityGraph = logs => {
  const trimmed = logs.map(log => ({ date: log.date, time: log.time, category: log.category }))
  const grouped = groupByKey(trimmed, 'date')
  const daysToCutoff = getDaysToCuttoff(90)
  const relevantGroups = daysToCutoff.map(day => grouped[day]).reverse()
  const highestMark = relevantGroups.reduce(findHighestMark, 0)
  const graph = relevantGroups.reduce(createDayGraph(highestMark), '')
  return graph
}
