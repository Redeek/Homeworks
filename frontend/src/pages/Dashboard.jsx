import React from 'react'
import { useNavigate } from "react-router-dom"
import {useEffect} from 'react'
import HomeworkForm from '../components/HomeworkForm'
import HomeworkList from '../components/HomeworkList'

function Dashboard() {
  
  const user = sessionStorage.getItem("user")
  let userObj = JSON.parse(user)
  const navigate = useNavigate()
 
  useEffect(() => {
    if(!user){
      navigate('/login')
    }
  },[user,navigate])

  return (<>
    <div>
      {user ? (<div className='form-group'> 
                <h1>Welcome {userObj.name}</h1>
                <button className='button' onClick={(e)=>navigate('/me')}>Details of user</button>
                <button className='button' onClick={(e)=>navigate('/sorted')}>Sorted homeworks</button>
        </div>): (<h1>Not authorized</h1>)
      }

      {(user && userObj.type==="Teacher") ? (<><HomeworkForm /> <HomeworkList /> </>) : (<h1> </h1>)}
      {(user && userObj.type==="Student") ? (<><HomeworkList /></>) : (<h1> </h1>)}
    </div>
    </>
  )
}

export default Dashboard