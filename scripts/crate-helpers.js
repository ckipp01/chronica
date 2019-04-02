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
    .filter(_ => _.project !== undefined)
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
