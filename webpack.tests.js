var testsContext = require.context('./spec', true, /\.jsx?$/)
testsContext.keys().forEach(testsContext)

var context = require.context('./src', true, /\.jsx?$/)
context.keys().forEach(context)
