const crypto = require('crypto');
const randomize = require('randomatic');

const setupFn = function (count, db, payload_size, seq_keys, cb) {
  const data = []
  const keys = []

  for (let i = 0; i < count; i++) {
    const key = parseInt((seq_keys ? i : randomize('0', 10)), 10)
    keys.push(key);

    data.push({
      type: 'put',
      key: String(key),
      value: crypto.randomBytes(payload_size)
    })
  }

  db.batch(data, err => {
    cb(err, keys)
  })
}

const fn = function (count, db, payload_size, seq_keys, keys, cb) {
  let received = 0
  const after = function (err) {
    if (err) throw err
    if (++received === count) cb()
  }

  for (key of keys) {
    db.get(String(key), after)
  }
}

module.exports = fn.bind(null, 1000)
module.exports.fn = fn
module.exports.setup = setupFn.bind(null, 1000)
module.exports.setupFn = setupFn
