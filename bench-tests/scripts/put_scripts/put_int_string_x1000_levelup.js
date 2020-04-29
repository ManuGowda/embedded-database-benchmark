const crypto = require('crypto');

const fn = function (puts, db, payload_size, seq_keys, keys, cb) {
  let received = 0
  const after = function (err) {
    if (err) throw err
    if (++received === puts) cb()
  }

  if (this.cycle == null) this.cycle = 0
  else this.cycle++

  for (let i = 0; i < puts; i++) {
    db.put(
      String(this.cycle * puts + i),
      crypto.randomBytes(payload_size),
      after
    )
  }
}

module.exports = fn.bind(null, 1000)
module.exports.fn = fn
