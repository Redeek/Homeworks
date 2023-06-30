import React from 'react'
import { useNavigate } from "react-router-dom"
import {useEffect, useState} from 'react'
import axios from 'axios'

function HomeworkForm() {
    const navigate = useNavigate()
    const [subjects, setSubjects] = useState([{name: ''}])
    const [homework, setHomework] = useState({
        subject: '',
        text: ''
    })
    const {subject, text} = homework
    const [error, setError] = useState("")
    

    const onChange = (e) => {
        e.preventDefault()
        setHomework((prevState)=> ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const user = sessionStorage.getItem("user")
    let userObj = JSON.parse(user)

    useEffect(() => {
        if(userObj.token == null){
            navigate('/login')
        }
        getSubjects()
        
    },[user, navigate])

    const config = {
        headers: {
            Authorization: `Bearer ${userObj.token}`
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault()        

        try {
            const url = "http://localhost:5000/api/homework"
            const res = await axios.post(url, homework, config)
              
          } catch (error) {
            if ( error.res && error.res.status >= 400 && error.res.status <= 500) {
              setError(error.res.data.message)
              }
          }
          window.location.reload()
          
    }

    const getSubjects = async() =>{
        try {
            const url = "http://localhost:5000/api/subject"
            const res = await axios.get(url, config).then((res) => { setSubjects(res.data)
                console.log(subjects)
                sessionStorage.setItem('subjects', JSON.stringify(res.data))
                })
          } catch (error) {
            if(error.res && error.res.status >= 400 && error.res.status <= 500) {
                    setError(error.res.data.message)
              }
          }
    }
    // console.log(subjects)  // to get one id of subject: subjects[x]._id
   
   
    return (
        <>
        <section className="form">
            <fieldset className='form form-field'>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <select className='form-select' defaultValue='dis' value={subjects.name} onChange={(e) => {
                            setHomework((prevState) => ({...prevState,
                                subject: e.target.value}
                              ))
                            }}>
                                <option value="dis" disabled>Choose subject</option>
                            {
                                subjects.map((sub) => (
                                    <option className='form-select' value={sub.name} key={sub.name} >{sub.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Enter description of homework:</label>
                        <textarea type="text" className="form-group" name='text' id='text' value={text} onChange={onChange}/>
                    </div>
                    
                    {homework.subject != "" && homework.text != "" ?
                        (<div className="form-group">
                        <button type='submit' className="btn btn-block">Enter homework</button>
                        </div>) : (<></>)
                    }
                    
                </form>
            </fieldset>
        </section>   
        </>
    );
}

export default HomeworkForm