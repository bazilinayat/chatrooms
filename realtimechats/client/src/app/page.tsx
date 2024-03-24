'use client'
import { API_URL, WEBSOCKET_URL } from '@/contants/constants'
import React, { useState, useEffect, useContext } from 'react'
import './page.css'
import { v4 as uuidv4 } from 'uuid'
import { AuthContext } from './modules/auth_provider'
import { WebSocketContext } from './modules/ws_provider'
import { useRouter } from 'next/navigation'

function page() {
  const [rooms, setRooms] = useState<{id: string, name: string}[]>([
    {
      id: "room1",
      name: "room1"
    },
    {
      id: "room2",
      name: "room2"
    }
  ])
  const [roomName, setRoomName] = useState('')
  const { user } = useContext(AuthContext)
  const { setConn } = useContext(WebSocketContext)


  const router = useRouter()

  const getRooms = async () => {
    try {
      const res = await fetch(`${API_URL}/ws/getRooms`, {
        method: 'GET',
      })

      const data = await res.json()
      if (res.ok) {
        setRooms(data)
      }
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getRooms()
  }, [])

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    try {
      setRoomName('')
      const res = await fetch(`${API_URL}/createRoom`, {
        method: 'POST',
        headers: { 'Content-Type': 'applicaton/json' },
        credentials: 'include',
        body: JSON.stringify({
          id: uuidv4(),
          name: roomName,
        }),
      })

      if (res.ok) {
        getRooms()
      }

    } catch (err) {
      console.log(err)
    }
  }

  const joinRoom = (roomId: string) => {
    const ws = new WebSocket(`${WEBSOCKET_URL}/ws/joinRoom/${roomId}?userId=${user.id}&username=${user.username}`)
    if (ws.OPEN) {
      setConn(ws)
      router.push('/room')
      return
    }
  }

  return (
    <div className='home__page'>
      <div className='createroom__handler'>
      <div>
        <input 
          type='text'
          className='roomname__field'
          placeholder='Room Name'
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
        <button className='roomname__button' onClick={submitHandler}>Create Room</button>
      </div>
      </div>
      
      <div className=''>
        <div className='availRooms'>Available Rooms </div>
        <div className='rooms__array'>
          {rooms.map((room, index) => (
            <div
              key={index}
              className='roomSection'
            >
              <div className='roomnames'>
                <div className=''>room</div>
                <div className=''>{room.name}</div>
              </div>
              <div className='joinroom'>
                <button className='joinButton' onClick={() => joinRoom(room.id)}>
                  join
                </button>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  )
}

export default page