module.exports = {
  'put(int, string) x 10': {
    LevelUP: require('./scripts/iterations/put_int_string_x10_levelup'),
    'RocksDB': require('./scripts/iterations/put_int_string_x10_rocksdb'),
    'SQLite3': require('./scripts/iterations/put_int_string_x10_sqlite3'),
  },

  'put(int, string) x 1000': {
    LevelUP: require('./scripts/put_scripts/put_int_string_x1000_levelup'),
    'RocksDB': require('./scripts/put_scripts/put_int_string_x1000_rocksdb'),
    'SQLite3': require('./scripts/put_scripts/put_int_string_x1000_sqlite3')
  },

  'put(int, string) x 100,000': {
    LevelUP: require('./scripts/iterations/put_int_string_x100000_levelup'),
    'RocksDB': require('./scripts/iterations/put_int_string_x100000_rocksdb'),
    'SQLite3': require('./scripts/iterations/put_int_string_x100000_sqlite3')
  },

  'get(int):string x 10': {
    LevelUP: require('./scripts/iterations/get_int_string_x10_levelup'),
    'RocksDB': require('./scripts/iterations/get_int_string_x10_rocksdb'),
    'SQLite3': require('./scripts/iterations/get_int_string_x10_sqlite3')
  },

  'get(int):string x 1000': {
    LevelUP: require('./scripts/get_scripts/get_int_string_x1000_levelup'),
    'RocksDB': require('./scripts/get_scripts/get_int_string_x1000_rocksdb'),
    'SQLite3': require('./scripts/get_scripts/get_int_string_x1000_sqlite3')
  },

  'batch(int, string) x 1000': {
    LevelUP: require('./scripts/batch_scripts/batch_int_string_x1000_levelup'),
    'RocksDB': require('./scripts/batch_scripts/batch_int_string_x1000_rocksdb'),
  },

  'batch(int, string) x 100,000': {
    LevelUP: require('./scripts/iterations/batch_int_string_x100000_levelup'),
    'RocksDB': require('./scripts/iterations/batch_int_string_x100000_rocksdb'),
  }
}
