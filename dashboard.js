const blessed = require('blessed')
const XTerm = require('blessed-xterm')

const screen = blessed.screen({
  smartCSR: true,
  dockBorders: false,
  fullUnicode: true,
  autoPadding: true
})

const addTerminal = (label = '', top = 0, height = 100) => {
  const terminal = new XTerm({
    label,
    top,
    height,
    width: screen.width,
    shell: process.env.SHELL || 'sh',
    args: [],
    cursorType: 'block',
    scrollback: 1000,
    border: {
      type: 'line'
    },
    style: {
      border: {
        fg: '#0f0'
      }
    },
    padding: 1
  })

  screen.append(terminal)

  return terminal
}

const createProcess = (command, current, total) => {
  const cmd = command.cmd.split(' ')
  const terminal = addTerminal(command.label, current * (screen.height / total.length), screen.height / total.length)

  terminal.spawn(cmd.shift(), cmd)
}

const init = (commands = []) => commands.map(createProcess)
screen.key(['escape', 'q', 'C-c'], () => {
  screen.destroy()
  process.exit(0)
})

module.exports = { screen, init }
