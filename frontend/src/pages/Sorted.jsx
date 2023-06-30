import React from 'react'
import { useNavigate } from "react-router-dom"
import {useEffect, useState} from 'react'
import axios from 'axios'
import SortedItem from '../components/SortedItem'

function Sorted() {
    const [data, setData] = useState([])
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const user = sessionStorage.getItem("user") 
    let userObj = JSON.parse(user) 

    useEffect(() => {
        if(!user){
            navigate('/login')
        }
        sort()
        
    },[user, navigate])

    const sort = async() =>{
        const config = {
            headers: {
                Authorization: `Bearer ${userObj.token}`
            }
        }
        try {
            const url = "http://localhost:5000/api/subject/Sorted"
            const res = await axios.get(url, config).then((res) => { setData(res.data) 
            sessionStorage.setItem('sorted', JSON.stringify(res.data))}, (error) => {console.log(error)})
            
        } catch (error) {
            if(error.res && error.res.status >= 400 && error.res.status <= 500) {
                setError(error.res.data.message)
            }
        }
    }
    

    return (<>
            <section className="form">
                {user ? (<>
                <ul>
                  <li><button className="btn" onClick={() => {navigate("/")}}> back to check homeworks</button></li>
                </ul> </>) : (<><h1>Not authorized</h1></>)}
            </section>
            <section>
                <ul>
                    {
                        data.map((homework)=> (
                            <SortedItem homework={homework} key={homework._id}/>
                            
                             )
                        )
                    }
                </ul>
            </section>
        </>);
}

export default Sorted