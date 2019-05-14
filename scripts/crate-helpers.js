'use-strict'

/* homepage project list functions */

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
                <p><a href='#${p}'>${p}</a><br>
                ${logsObject[p].time} minutes<br>
                ${logsObject[p].entries} ${plurality} 
               </div>`
    })
}
/* end project list functions */

/* homepage key functions */

const createAllKeys = logs => {
  const all = logs
    .map(log => log.category)
    .filter(category => category !== undefined)

  const unique = [...new Set(all)]

  return unique.reduce((keys, key) => {
    return `${keys}<div class="key-block">
             <svg height="10" width="10" class="key-color">
               <rect rx="2" width="10" height="10" class="${key}-logbar" />
             </svg>
             <p>${key}</p>
           </div>`
  }, '')
}

/* homepage activity graph functions */

const createActivityGraph = logs => {
  const trimmed = logs.map(log => ({ date: log.date, time: log.time, category: log.category }))
  const grouped = groupByKey(trimmed, 'date')
  const daysToCutoff = getDaysToCuttoff(90)
  const relevantGroups = daysToCutoff.map(day => grouped[day]).reverse()
  const highestMark = relevantGroups.reduce(findHighestMark, 0)
  const totalMinutes = relevantGroups.reduce(getTotalMinutes, 0)
  const graph = relevantGroups.reduce(createDayGraph(highestMark), '')
  return `<p class="text-center small-text">${totalMinutes} min - 90 days - ${Math.round(totalMinutes / 90 * 100) / 100} avg/day</p><div class="activity-graph-container">${graph}</div>`
}

const getDaysToCuttoff = amount => [...Array(amount).keys()].map(getDate)

const getDate = daysAgo => {
  const today = new Date()
  const cutoffTimestamp = new Date().setDate(today.getDate() - daysAgo)
  const cutoffDate = new Date(cutoffTimestamp)
  const cutoffYear = cutoffDate.getFullYear()
  const cutoffMonth = padNumber(cutoffDate.getMonth() + 1)
  const cutoffDay = padNumber(cutoffDate.getDate())
  return `${cutoffYear}-${cutoffMonth}-${cutoffDay}`
}

const padNumber = number => number < 10 ? '0' + number : number

const findHighestMark = (currentHighest, day) => {
  const totalHoursForDay = day
    ? getTotalHoursForDay(day)
    : 0

  if (totalHoursForDay > currentHighest) return totalHoursForDay
  else return currentHighest
}

const getTotalHoursForDay = day => day.reduce((totalTime, log) => totalTime + log.time, 0)

const groupByKey = (arr, key) => {
  return arr.reduce((acc, cv) => {
    (acc[cv[key]] = acc[cv[key]] || []).push(cv)
    return acc
  }, {})
}

const createProjectRect = highestMark => (rects, project) => {
  const percentageOfHighest = project.time / highestMark * 100
  // 100px is max height, but use 125 for a bit of a buffer
  const height = percentageOfHighest / 125 * 100
  const lastRect = rects[rects.length - 1]
  const offSet = lastRect
    ? lastRect[1] + 1
    : 0

  const tuple = [`<rect class="${project.category + '-logbar'}" rx="2" y="${offSet}%" width="90%" height="${height}%"></rect>`, height + offSet]

  rects.push(tuple)
  return rects
}

const createDayGraph = highestMark => (days, day) => {
  const rects = day
    ? day.reduce(createProjectRect(highestMark), [])
    : [[`<rect rx="2" width="90%" height="1px"></rect>`]]

  return `${days}<svg>${rects.map(rect => rect[0]).toString().replace(/,/g, '')}</svg>`
}

const getTotalMinutes = (total, day) => {
  return day
    ? total + day.reduce((ltotal, log) => ltotal + log.time, 0)
    : total
}
