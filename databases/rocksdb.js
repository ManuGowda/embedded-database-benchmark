var levelup = require('levelup')
var rocksdb = require('rocksdb')

var createDb = function (location, callback) {
  levelup(rocksdb(location), function (err, db) {
    setTimeout(callback.bind(null, err, db), 50)
  })
}

var closeDb = function (db, callback) {
  db.close(callback)
}

module.exports = {
  createDb: createDb,
  closeDb: closeDb
}
