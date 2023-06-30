import React from 'react'
import { useNavigate } from "react-router-dom"
import {useEffect, useState} from 'react'
import axios from 'axios'
import HomeworkItem from '../components/HomeworkItem'

function HomeworkList() {
    const [data, setData] = useState([])
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const user = sessionStorage.getItem("user")
    let userObj = JSON.parse(user)

    useEffect(() => {
        if(userObj.token == null){
            navigate('/login')
        }
        checkHomework()
        
    },[user, navigate])

    
    const config = {
        headers: {
            Authorization: `Bearer ${userObj.token}`
        }
    }

    const checkHomework = async() =>{
        try {
            const url = "http://localhost:5000/api/homework"
            const res = await axios.get(url, config).then((res) => { setData(res.data) 
                sessionStorage.setItem('homework', JSON.stringify(res.data))}, (error) => {console.log(error)})
            
          } catch (error) {
            if(error.res && error.res.status >= 400 && error.res.status <= 500) {
                    setError(error.res.data.message)
              }
          }
    }
    

    return (<>
            <section className="form">
                {user ? (<><ul>
                    {data.map((homework) => (
                        <HomeworkItem key={homework._id} homework={homework}/>
                    ))}
                    </ul> </>) : (<><h1>Not authorized</h1></>)}
            </section>
        </>);
}

export default HomeworkList