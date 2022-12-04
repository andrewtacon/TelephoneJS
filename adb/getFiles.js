var Promise = require('bluebird')
var adb = require('adbkit')
var client = adb.createClient()

client.listDevices()
  .then(function(devices) {
    return Promise.map(devices, function(device) {
      return client.readdir(device.id, '/sdcard/Android/data/edu.mit.appinventor.aicompanion3/files/AppInventor/assets')
        .then(function(files) {
          // Synchronous, so we don't have to care about returning at the
          // right time
          console.log(files)
          files.forEach(function(file) {
            if (file.isFile()) {
              console.log('[%s] Found file "%s"', device.id, file.name)
            }
          })
        })
    })
  })
  .then(function() {
    console.log('Done checking /sdcard files on connected devices')
  })
  .catch(function(err) {
    console.error('Something went wrong:', err.stack)
  })





  /* 
  //THIS CODE GETS THE CURRENTLY UPLOADED FILES 

  var Promise = require('bluebird')
var adb = require('adbkit')
var client = adb.createClient()

client.listDevices()
  .then(function(devices) {
    return Promise.map(devices, function(device) {
      return client.readdir(device.id, '/sdcard/Android/data/edu.mit.appinventor.aicompanion3/files/AppInventor/assets')
        .then(function(files) {
          // Synchronous, so we don't have to care about returning at the
          // right time
          console.log(files)
          files.forEach(function(file) {
            if (file.isFile()) {
              console.log('[%s] Found file "%s"', device.id, file.name)
            }
          })
        })
    })
  })
  .then(function() {
    console.log('Done checking /sdcard files on connected devices')
  })
  .catch(function(err) {
    console.error('Something went wrong:', err.stack)
  })



  */