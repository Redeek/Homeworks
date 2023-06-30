import React from 'react'
import { useNavigate } from "react-router-dom"
import {useEffect, useState} from 'react'
import axios from 'axios'

function InfoMe() {
  //const [data, setData] = useState()
  //const [error, setError] = useState("")
    const navigate = useNavigate()
    const user = sessionStorage.getItem("user")
    

    useEffect(() => {
        if(!user){
            navigate('/login')
        }
        
    },[user, navigate])

    let userObj = JSON.parse(user)
    

    // const checkme = async() =>{
    //   const config = {
    //     headers: {
    //         Authorization: `Bearer ${userObj.token}`
    //     }
    // }
    //     try {
    //         const url = "http://localhost:5000/api/users/me"
    //         const res = await axios.get(url, config).then((res) => { setData(res.data) 
    //         sessionStorage.setItem('me', JSON.stringify(res.data))}, (error) => {console.log(error)})
            
    //       } catch (error) {
    //         if(error.res && error.res.status >= 400 && error.res.status <= 500) {
    //                 setError(error.res.data.message)
    //           }
    //       }
    // }
    

    return (<>
            <section className="form">
                {user ? (<>
                <ul>
                  <li><button className="btn" onClick={() => {navigate("/")}}> back to check homeworks</button></li>
                  <li><p>name: {userObj.name}</p></li>
                  <li> <p>email: {userObj.email}</p></li>
                  <li> <p>type of account: {userObj.type}</p></li>
                </ul> </>) : (<><h1>Not authorized</h1></>)}
            </section>
        </>);
}

export default InfoMe