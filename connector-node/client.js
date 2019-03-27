const net = require("net")
const host = process.env.host || "127.0.0.1"
const port = process.env.port || 8125
const Message = require("./message")


function MessageGenerater(seq, cmd, content) {
  const message = new Message()
  message.seq = seq++
  message.cmd = cmd
  message.content = content
  return message
}
connect = (host, port) => {
  let seq = 0
  const client = net.connect({
    port: port,
    host: host
  }, () => {

    client.write(MessageGenerater(seq++, Message.Type.Login, JSON.stringify({
      name: "soulmate"
    })).toChunk())

    setInterval(() => {
      const NewMsg = MessageGenerater(seq++, Message.Type.NewMsg, "发了一条新的的消息")
      client.write(NewMsg.toChunk())
      const heartbeatMessage = MessageGenerater(seq++, Message.Type.HB, "心跳起来")
      client.write(heartbeatMessage.toChunk())
    }, 5 * 1000)
  })

  client.on("data", (chunk) => {
    const message = Message.ReadMessage(chunk)
    console.log(message)
  })

  client.on("end", () => {
    console.log("end")
  })

  client.on("error", (error) => {
    console.log("error", error)
  })
}

connect(host, port)