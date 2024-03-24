'use client'
import React, { useState, useRef, useContext, useEffect } from 'react'
import { WebSocketContext } from '../modules/ws_provider'
import ChatBody from '../components/chat_body'
import { useRouter } from 'next/navigation'
import { API_URL } from '@/contants/constants'
import autosize from 'autosize'
import { AuthContext } from '../modules/auth_provider'

export type Message = {
    content: string
    client_id: string
    username: string
    room_id: string
    type: 'recv' | 'self'
}

const page = () => {

    const [messages, setMessage] = useState<Array<Message>>([])
    const textarea = useRef<HTMLTextAreaElement>(null)
    const { conn } = useContext(WebSocketContext)
    const [users, setUsers] = useState<Array<{ username: string }>>([])
    const { user } = useContext(AuthContext)

    const router = useRouter()

    // get clients in the room
    useEffect(() => {
        // if (conn == null) {
        //     router.push('/')
        //     return
        // }

        // const roomId = conn.url.split('/')[5]
        // async function getUsers() {
        //     try {
        //         const res = await fetch(`${API_URL}/ws/getClients/${roomId}`, {
        //             method: 'GET',
        //             headers: { 'Content-Type': 'application/json' },
        //         })

        //         const data = await res.json()
        //         setUsers(data)
        //     } catch(e) {
        //         console.error(e)
        //     }
        // }
    }, [])

    // handle websocket connection
    useEffect(() => {
        if (textarea.current) {
            autosize(textarea.current)
        }

        // if (conn === null) {
        //     router.push('/')
        //     return
        // }

        // conn.onmessage = (message) => {
        //     const m: Message = JSON.parse(message.data)
        //     if (m.content == 'A new user has joined the room') {
        //         setUsers([...users, { username: m.username }])
        //     }

        //     if (m.content == 'user left the chat') {
        //         const deleteUser = users.filter((user) => user.username != m.username)
        //         setUsers([...deleteUser])
        //         setMessage([...messages, m])
        //         return
        //     }

        //     user?.username == m.username ? (m.type == 'self') : (m.type == 'recv')
        //     setMessage([...messages, m])
        // }

        // conn.close = () => {}
        // conn.onerror = () => {}
        // conn.onopen = () => {}

    }, [textarea, messages, conn, users])

    const sendMessage = () => {
        if (!textarea.current?.value) return

        if (conn === null) {
            router.push('/')
            return
        }

        conn.send(textarea.current.value)
        textarea.current.value = ''
    }

  return (
    <div className=''>
        <div className=''>
            <ChatBody data={messages} />
        </div>
        <div className=''>
            <div className=''>
                <div className=''>
                    <textarea
                        ref={textarea}
                        placeholder='type your message here'
                        className=''
                        style={{ resize: 'none' }}
                    />
                </div>
                <div className=''>
                    <button className='' onClick={sendMessage}>
                        Send
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default page
