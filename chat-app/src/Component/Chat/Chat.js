import React, { useEffect, useState } from 'react'
import {user} from '../Join/Join'
import Join from '../Join/Join'
import Message from '../Message/Message'
import socketIo from 'socket.io-client'
import ReactScrollToBottom from 'react-scroll-to-bottom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import SettingsPowerIcon from '@mui/icons-material/SettingsPower';
import { Link } from 'react-router-dom'
import { Route ,BrowserRouter,Routes,Navigate } from 'react-router-dom'

const ENDPOINT='https://hubb-chat.herokuapp.com/'

let id 
let socket
const Chat = () => {
   
    const [message, setmessage] = useState('')
    const [messages,setmessages]=useState([])

    //socket =socketIo(ENDPOINT,{transports:['websocket']})
      useEffect(() => {
         socket =socketIo(ENDPOINT,{transports:['websocket']})
        socket.on('connect',()=>{
            ///alert('connected')
            //console.log(socket.id)
            id=socket.id
            console.log('socket is connected',socket.connected)
        })
        
        //console.log(socket)
        socket.emit('new_user_joined',{user})
        
        

        return () => {
          socket.emit('disconnect')
          
          socket.off()
        }
        // eslint-disable-next-line
      }, [])
      

      useEffect(() => {
        socket.on('show_message_to_user',(data)=>{
          //console.log(data.message,data.user,data.id)
          setmessages([...messages,data])
          //console.log(messages,'messages show to user')
        })
        socket.on('user_left',(data)=>{
          //console.log(data.user,data.message)
          setmessages([...messages,data])
          //console.log(messages,'messages user left')
      })

      socket.on('anotherUserJoined',(data)=>{
        //console.log(data.user,data.message)
        setmessages([...messages,data])
        //console.log(messages,'messages another user joined')
      })

      socket.on('welcome',(data)=>{
        //console.log(data)
        setmessages([...messages,data])
        //console.log(messages,'messages welcome')

    })

        return () => {
          socket.off()
        }
      }, [messages])
      
  
    const handleChange=(e)=>{
        setmessage(e.target.value)
        //console.log(message,e.target.value)
    }

    const handleClick=()=>{
        //setmessages([...messages,message])
        //console.log(messages)
        
        //console.log(user,message,socket)
        socket.emit('send_message',{message,id})
        setmessage('')
    }

    const maping_messages=(item,index)=>{
     return <Message 
     key={index}
     message={item.message}
     user={item.id===id ? '' : item.user }
     class={item.id===id? 'text-end' : 'text-start' }
     
     />
     //console.log(item.id===id?" ":item.user)
    }

    const sendToLogInPage=()=>{
      //window.location.reload(true);
      window.location.replace("/")
      
    }

  return (
    <div className='container mt-5 '>
        <div className='card '>
            
            <div className='card-header'>
              <h3 className='d-inline-flex '>Chat here</h3>
              <Link onClick={sendToLogInPage} to='/'> <SettingsPowerIcon  color="primary" className='float-end m-2 icon'/> </Link>
              </div>
            
                <ReactScrollToBottom className='card-body'>
                  
                    <div className='card-text text_left'>
                      {messages.map(maping_messages)}
                    </div>

                </ReactScrollToBottom>
                <div className='card-footer '>
                    <input onKeyPress={(event)=>event.key==='Enter' ? handleClick() : null } onChange={handleChange} className='p-2 m-3 input ' placeholder='enter your message here' value={message} />
                    <button onClick={handleClick} className='p-2 m-3 btn btn-success'>send</button>
                </div>
            
        </div>
    </div>
  )
}

export default Chat