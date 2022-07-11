import React from 'react'

const Message = (props) => {
 if (props.user){
    return (
        <div className={props.class}>
            <p>{`${props.user}: ${props.message}`}</p>
            </div>
    )
 }
 else{
    return(
    <div className={props.class}>
        <p>{`You: ${props.message}`}</p>
        </div>
    )
 }
}

export default Message