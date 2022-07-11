import React, { useState } from 'react'
import { Link } from 'react-router-dom'

let user=''

const Join = () => {

    const [Name, setName] = useState('');

     

    function haandleChange(event ) {
        setName(event.target.value)
        
    }
    
    
    

    const buttonClick=()=>{
           user=Name;
           setName('')
           
    }

    const sendToChatPage=(event)=>{
        return (!Name?event.preventDefault() : null
        )
        
    }

   

  return (
    <div className='container mt-5  ' >
        <div className='py-3 text-center  ' >
            <h2 className='py-3 text-center ' >Chat_App</h2>
            <div className='row py-5 ' >
                <div className='col-md-4 mx-auto'>
                    <div className=' ' >
                        <input onChange={haandleChange} placeholder='enter name to login' type='text' value={Name} />
                    </div>
                   <Link onClick={sendToChatPage} to='/chat' ><button onClick={buttonClick}  >log in </button> </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Join
export {user}