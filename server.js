
var fs = require('fs')
var ws = require('ws')
var split = require('split')
var http = require('http')

var server = http.createServer(function (req, res) {
  console.log(req.path, req.url)
  if(req.url === '/')
    fs.createReadStream('./index.html').pipe(res)
  else
    fs.createReadStream('.'+req.url).pipe(res)

}).listen(8000)

var wss = new ws.Server({server: server})

var conns = []
wss.on('connection', function (wsock) {
  wsock.on('close', function () {
    conns.splice(conns.indexOf(wsock), 1)
  })
  wsock.on('message', function (data) { console.log(data) })

  conns.push(wsock)
  wsock.send(JSON.stringify({
    append: ['h1', {id: 'header'}, 'TEST?', ['span', {id: 'clock'}, new Date().toString()]]
  }))
  wsock.send(JSON.stringify({
    append: ['input', {type: 'text', id: 'text', value: 'foobar'}]
  }))

  wsock.send(JSON.stringify({
    listen: ['mouseover', 'click', 'keydown', 'focus'], id: 'header'
  }))
  wsock.send(JSON.stringify({
    listen: ['keydown', 'focus', 'change'], id: 'text'
  }))

})

function broadcast (data) {
  conns.forEach(function (con) {
    con.send('string' === typeof data ? data : JSON.stringify(data))
  })
}

process.stdin
  .pipe(split())
  .on('data', broadcast)

setInterval(function () {
  broadcast({content: new Date().toString(), id: 'clock'})
}, 1000)


