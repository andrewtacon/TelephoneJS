var Promise = require('bluebird')
var adb = require('adbkit')
var client = adb.createClient()

async function startMonitorLog(device){

    let logcat = await client.openLogcat(device.id, { clear: true })
    logcat.on('entry', entry => {
        if (entry.message.indexOf("Incoming seq") !== -1 || entry.message.indexOf("Computed seq") !== -1) {
            console.log(entry.message)
        }
    })

}


client.listDevices()
    .then(function (devices) {
        return Promise.map(devices, function (device) {
            return client.openLogcat(device.id, { clear: true })
                .then(function (logcat) {
                    // Synchronous, so we don't have to care about returning at the
                    // right time
                    console.log(logcat)
                    //reader = logcat.readStream()
                    logcat.on('entry', entry => {
                        if (entry.message.indexOf("Incoming seq") !== -1 || entry.message.indexOf("Computed seq") !== -1) {
                            console.log(entry.message)
                        }
                    })
                })
        })
    })
    .then(function () {
        console.log('Done checking /sdcard files on connected devices')
    })
    .catch(function (err) {
        console.error('Something went wrong:', err.stack)
    })




