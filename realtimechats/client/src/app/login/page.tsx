'use client'
import React, { useState, useContext, useEffect } from 'react'
import "./page.css";
import { API_URL } from '@/contants/constants'
import { useRouter } from 'next/navigation'
import { AuthContext, UserInfo } from '@/app/modules/auth_provider';

const page = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { authenticated } = useContext(AuthContext)

  const router = useRouter()

  useEffect(() => {
    if (authenticated) {
      router.push('/')
      return
    }
  }, [authenticated])

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    try {
      const rest = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password}),
      })

      const data = await rest.json()
      if (rest.ok) {
        const user: UserInfo = {
          username: data.username,
          id: data.id,
        }

        localStorage.setItem('user_info', JSON.stringify(user))
        return router.push('/')
      }
    } catch(err) {
      console.log(err)
    }
  }

  return (
  <div className='login'>
      <form>
        <input placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
         />
        <input 
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />

        <button  type='submit' onClick={submitHandler}>Login</button>
      </form>
    </div>
  )
}

export default page
