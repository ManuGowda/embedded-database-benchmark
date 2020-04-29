const async = require('async');
const crypto = require('crypto');
const randomize = require('randomatic');

const setupFn = function (count, db, payload_size, seq_keys, cb) {
  const keys = []

  const queue = async.queue(function (key, callback) {
    db.exec(
      'INSERT INTO bench VALUES(' +
      key +
      `, "${crypto.randomBytes(payload_size).toString('hex')}"` +
      ')'
      , callback)
  }, 20)
  queue.drain = () => {
    cb(null, keys)
  }

  for (let i = 0; i < count; i++) {
    const key = parseInt((seq_keys ? i : randomize('0', 10)), 10)
    keys.push(key);

    queue.push(String(key))
  }
}

const fn = function (count, db, payload_size, seq_keys, keys, cb) {
  let received = 0
  const after = function (err) {
    if (err) throw err
    if (++received === count) cb()
  }

  for (key of keys) {
    db.get('SELECT value FROM bench WHERE key = "' + key + '"', after)
  }
}

module.exports = fn.bind(null, 1000)
module.exports.fn = fn
module.exports.setup = setupFn.bind(null, 1000)
module.exports.setupFn = setupFn
