
const path = require('path');
const Benchmark = require('benchmark');
const rimraf = require('rimraf');
const async = require('async');
const databases = require('./databases');
const tests = require('./bench-tests');

const DB_ROOT = path.join(__dirname, '/bench-dbs');
let dbIdx = 0
const PAYLOAD_SIZE = process.env.PAYLOAD_SIZE || 15000;
const SEQUENTIAL_KEYS = process.env.SEQUENTIAL_KEYS || false;

const printableEngineName = function (engineName) {
  const len = Object.keys(databases).reduce(function (m, c) { return Math.max(c.length, m) }, 0)
  while (engineName.length < len) engineName += ' '
  return engineName
}

const dbPath = dbType => {
  return path.join(DB_ROOT, '_benchdb_' + dbType + '_' + dbIdx++)
}

const createDatabaseInstance = function (engine, location, callback) {
  rimraf(location, engine.createDb.bind(null, location, callback))
}

const cleanUpDB = function (engine, db, location, callback) {
  engine.closeDb(db, rimraf.bind(null, location, callback))
}

const run = function (db, name, fn, color, cb) {
  const exec = function (keys) {
    new Benchmark(name, {
      defer: true,
      fn: function (deferred) {
        fn(db, PAYLOAD_SIZE, SEQUENTIAL_KEYS, keys, deferred.resolve.bind(deferred))
      }
    })
      .on('complete', function (event) {
        console.log(String(event.target)[color].bold)
        cb()
      })
      .run({ async: true })
  }

  if (fn.setup) {
    fn.setup(db, PAYLOAD_SIZE, SEQUENTIAL_KEYS, function (err, keys) {
      if (err) return cb(err)
      exec(keys)
    })
  } else { exec() }
}

const runTest = function (testName, callback) {
  async.forEachSeries(
    Object.keys(databases), function (dbType, callback) {
      const engine = databases[dbType]
      const location = dbPath(dbType)
      createDatabaseInstance(engine, location, function (err, db) {
        if (err) return callback(err)
        if (!tests[testName][dbType]) { console.log('Skipping for', dbType, testName); return callback() }
        run(db,
          printableEngineName(dbType) + ' ' + testName,
          tests[testName][dbType],
          engine.color, function (err) {
            cleanUpDB(engine, db, location, function (_err) {
              callback(err || _err)
            })
          })
      })
    }, function (err) {
      if (err) throw err
      console.log()
      callback.apply(null, arguments)
    }
  )
}

const focusKey = Object.keys(tests).filter(function (k) { return (/=>/).test(k) })

if (focusKey.length) {
  const focusTest = tests[focusKey[0]]
  tests = {}
  tests[focusKey[0]] = focusTest
}

require('colors')
async.forEachSeries(Object.keys(tests), runTest)
