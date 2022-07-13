const http=require('http')
const express=require('express')
const cors=require('cors')
const socketIO=require('socket.io')
const { Socket } = require('engine.io')

const app=express()

const port=process.env.PORT

//let id

const users=[{}]

app.use(cors())

app.get('/',(req,res)=>{
    res.send('its working')
})

const server=http.createServer(app)

const io=socketIO(server)

io.on('connection',(socket)=>{
    console.log('new connection')
    
    socket.on('new_user_joined',({user})=>{
        users[socket.id]=user
        //id=socket.id
        //console.log(users)
        //console.log(socket.id,'socket.id')
        console.log(`${user} join`)
        //console.log(user)
        socket.broadcast.emit('anotherUserJoined',{user:'Admin :',message:`${users[socket.id]} has joined` })
        socket.emit('welcome',{Admin:'admin :',message:`${users[socket.id]} has joined`})
    })

    socket.on('send_message',({message,id})=>{
        //console.log(message,id,"send message")
        io.emit('show_message_to_user',{message,user:users[id],id})
    })
    
    socket.on('disconnect',()=>{
        socket.broadcast.emit('user_left',{user:'Admin :',message:`${users[socket.id]} has left`})
        
        //console.log(`${users[socket.id]} has left`)
    })
   
    

    
})

server.listen(port,()=>{
    console.log('server is working')
})
