import React, { FC } from 'react'
import { useAppSelector } from "../hooks";
import { selectLoggedInUser } from "../store/accountSlice";



const Dashboard:FC = ()=>{
    let loggedInUser = useAppSelector(selectLoggedInUser)

  
    return (
        <div>
            <h2>Hello {loggedInUser.name},</h2>
            <h3>Welcome to Dashboard</h3>
        </div>
    )
}

export default Dashboard

