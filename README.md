# concurrently-dashboard

Run your commands concurrently with seperated output in a CLI dashboard.

## Installation

Global:
`npm i concurrently-dashboad -g`

Local:
`npm i concurrently-dashboad --save-dev`


## Usage

```
  Usage: concurrently-dashboard [options]

  Options:

    -h, --help               output usage information
    -V, --version            output the version number
    -c, --command [command]  Command to run concurrently
    -l, --label [label]      Label corresponding to command
    -t, --title [title]      Dashboard title
```

## Example

`concurrently-dashboard --command 'ping 8.8.8.8' --label 'Google DNS' --command 'ping 8.8.4.4' --label 'Google DNS Fallback' --title 'Concurrently Dashboard Example'`

![example](https://raw.githubusercontent.com/alexander-heimbuch/concurrently-dashboard/master/example.png)
