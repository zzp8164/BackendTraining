// Generated by CoffeeScript 1.12.7
var connections, count, net, port, responseData, server

net = require("net")
var Message = require("./message")
responseData = [0, 1, 2, 3].map(() => "0123456789").join("")

connections = {}

count = 0



function handleHeartbeat(message) {
  return
}

function handleLogin(message) {
  const user = JSON.parse(message.content)
  if (user.name)
    console.log("login successfuly with user id " + user.name)
  return
}

function handleNewMsg(message, c) {
  setTimeout(() => {
    message.content += "hoho!!"
    c.write(message.toChunk())
  }, Math.random() * 100)
  return
}

const messageHandler = {
  10001: handleHeartbeat,
  11001: handleLogin,
  12001: handleNewMsg
}
server = net.createServer((c) => {
  c.id = count++
  connections[c.id] = true
  c.on("end", () => {
    if (connections[c.id]) delete connections[c.id]

    console.log("connection end" + c.id)
  })

  c.on("error", (err) => {
    if (connections[c.id]) delete connections[c.id]
    console.log(err, c.id)

  })

  c.on("data", (chunk) => {
    const message = Message.ReadMessage(chunk)
    messageHandler[message.cmd](message, c)
  })
})

port = process.env.port || 8125

server.listen(port, () => {
  console.log("server bound")
  process.stdin.resume()
})

setInterval(() => {
  console.log("count:" + (Object.keys(connections).length) + ", \ntime:" + (new Date()))
}, 2000)