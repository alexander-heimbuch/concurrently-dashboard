const blessed = require('blessed')
const XTerm = require('blessed-xterm')

const screen = blessed.screen({
  smartCSR: true,
  autoPadding: false,
  warnings: false
})

const scrollUp = terminal => {
  if (!terminal.scrolling) {
    terminal.scroll(0)
  }

  let n = Math.max(1, Math.floor(terminal.height * 0.10))
  terminal.scroll(-n)

  if (Math.ceil(terminal.getScrollPerc()) === 100) {
    terminal.resetScroll()
  }
}

const scrollDown = terminal => {
  if (!terminal.scrolling) {
    terminal.scroll(0)
  }

  let n = Math.max(1, Math.floor(terminal.height * 0.10))
  terminal.scroll(+n)
  if (Math.ceil(terminal.getScrollPerc()) === 100) {
    terminal.resetScroll()
  }
}

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
      fg: 'default',
      bg: 'default',
      border: { fg: 'default' },
      focus: { border: { fg: 'green' } },
      scrolling: { border: { fg: 'red' } }
    },
    padding: 1
  })

  terminal.on('mouse', (evt) => {
    switch (evt.action) {
      case 'wheeldown':
        return scrollDown(terminal)
      case 'wheelup':
        return scrollUp(terminal)
    }
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
