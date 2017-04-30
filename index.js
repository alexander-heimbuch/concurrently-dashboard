#!/usr/bin/env node
const program = require('commander')
const dashboard = require('./dashboard')

const pkg = require('./package.json')

let commands = []
let labels = []

const addCommand = cmd => {
  commands = [...commands, cmd]
  return true
}

const addLabel = label => {
  labels = [...labels, label]
  return true
}

program
  .version(pkg.version)
  .option('-c, --command [command]', 'Command to run concurrently', addCommand)
  .option('-l, --label [label]', 'Label corresponding to command', addLabel)
  .option('-t, --title [title]', 'Dashboard title')
  .parse(process.argv)

if (program.title) {
  dashboard.screen.title = program.title
}

dashboard.init(commands.map((cmd, current) => ({
  cmd,
  label: (labels.length - 1 >= current) ? labels[current] : null
})))

dashboard.screen.render()
