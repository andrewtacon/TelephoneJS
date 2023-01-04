const adb = require('adbkit')
const client = adb.createClient()

const logger = require("./logger")
const log = logger.log
const debug = logger.debug

async function getFiles(devices) {
  let foundFiles = []
  for (let i = 0; i < devices.length; i++) {
    let device = devices[i]
    let files = await client.readdir(device.id, '/sdcard/Android/data/edu.mit.appinventor.aicompanion3/files/AppInventor/assets')
    for (let j = 0; j < files.length; j++) {
      let file = files[j]
      if (file.isFile()) {
        foundFiles.push(file.name)
      }

    }
  }
  return foundFiles
}

const excludeErrors = ["Form.clear()", "Form.setChildWidth()"]


async function startMonitorLog(device) {
  let logcat = await client.openLogcat(device.id, { clear: true })

  logcat.on('entry', entry => {

    if (entry.tag === "System.err") {
      let printError = true
      for (let i = 0; i < excludeErrors.length; i++) {
        if (entry.message.startsWith(excludeErrors[i])) {
          printError = false
        }
      }
      if (printError) {
        console.error("System Error: " + entry.message)
      }
    }

    if (entry.message.indexOf("Incoming seq") !== -1 || entry.message.indexOf("Computed seq") !== -1) {
      let incoming = entry.message.indexOf("Incoming seq")
      let computed = entry.message.indexOf("Computed seq")

      if (incoming !== -1) {
        let raw = entry.message.substring(incoming + 15, incoming + 25)
        adbSequence.incoming = parseInt(raw)
        adbLogOutput(entry.message.substring(incoming, incoming + 25))
      }
      if (computed !== -1) {
        let raw = entry.message.substring(computed + 15, computed + 25)
        adbSequence.computed = parseInt(raw)
        adbLogOutput(entry.message.substring(computed, computed + 25))
      }

    } else {
      debug("------------------------------")
      debug(entry.message)
      debug("------------------------------")

    }
  })
  logcat.on('error', err => {
    debug("logcat error " + err)
  })

}

let adbSequence = {
  incoming: 0,
  computed: 1
}

function adbLogOutput(message) {
  debug(message)
  debug(adbSequence)
}

async function getDevices() {
  let devices = await client.listDevices()
  return devices
}

let devices;
async function main() {
  devices = await getDevices()
  let files = await getFiles(devices)
  debug(files)
  for (let i = 0; i < devices.length; i++) {
    await startMonitorLog(devices[i])
  }
}

//main()

exports.run = main
exports.sequence = adbSequence
exports.devices = getDevices
exports.getFiles = getFiles