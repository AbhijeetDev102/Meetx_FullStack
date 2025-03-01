import React, { createContext, useState } from 'react'
export const GlobalContext= createContext(null);

export const GlobalContextProvider=(props)=>{
    const [token , setToken] = useState('')
    const [roomName , setRoomName] = useState('')
    const [participantName , setParticipantName] = useState('')

    return(
        <GlobalContext.Provider value={{token , setToken, roomName , setRoomName, participantName , setParticipantName}}>
            {props.children}
        </GlobalContext.Provider>
    )
} 