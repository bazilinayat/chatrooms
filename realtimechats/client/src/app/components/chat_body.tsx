import React from 'react'
import { Message } from '../room/page'

const ChatBody = ({ data }: { data: Array<Message> }) => {
  return (
    <div>
      {data.map((message: Message, index: number) => {
        if (message.type == 'self') {
            return (
                <div className='' key={index}>
                    <div className=''>{message.username}</div>
                    <div>
                        <div className=''>
                            {message.content}
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className='' key={index}>
                    <div className=''>{message.username}</div>
                    <div>
                        <div className=''>
                            {message.content}
                        </div>
                    </div>
                </div>
            )
        }
      })}
    </div>
  )
}

export default ChatBody
