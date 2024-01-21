import React, { useState } from 'react'
import UserContext from './UserContext'

export default function UserContextProvider({children}) {
    const [isUser , setIsUser] = useState(false)
  return (
    <div>
        <UserContext.Provider value={{isUser,setIsUser}}>
            {children}
        </UserContext.Provider>
    </div>
  )
}