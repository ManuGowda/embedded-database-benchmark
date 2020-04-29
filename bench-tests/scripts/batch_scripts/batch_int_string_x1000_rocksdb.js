const crypto = require('crypto');
const randomize = require('randomatic');

const fn = function (puts, db, payload_size, seq_keys, keys, cb) {
  const after = function (err) {
    if (err) throw err
    cb()
  }
  const data = []

  if (this.cycle == null) this.cycle = 0
  else this.cycle++

  for (let i = 0; i < puts; i++) {
    const key = parseInt(this.cycle * puts + (seq_keys ? i : randomize('0', 10)), 10)

    data.push({
      type: 'put',
      key: String(key),
      value: crypto.randomBytes(payload_size)
    })
  }

  db.batch(data, after)
}

module.exports = fn.bind(null, 1000)
module.exports.fn = fn
