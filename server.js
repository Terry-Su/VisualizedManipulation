const PATH = require( "path" )
const BS = require( "browser-sync" )
const output = PATH.resolve( __dirname, './build' )


const config = {
  server: {
    baseDir: __dirname
  },
  files: [ `${ output }/**` ],
  open: false,
  port: 3200
}

BS.init( config )