import React from 'react'
import {useState} from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"


function Register() {
  const [formData, setFormData] = useState({
    name:'',
    surname: '',
    email:'',
    password:'',
    type: 'Student',
  })
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const { name, surname, email, password, type } = formData
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      
      const url = "http://localhost:5000/api/users";
      const res = await axios.post(url, formData)
      sessionStorage.setItem('user', JSON.stringify(res.data))
      navigate("/")
      
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  }

  const options = [
    { value: "Student", label: 'Student'},
    { value: "Teacher", label: 'Teacher'}
  ]
  console.log(options)

  return (
    <>
      <section className="heading">
        <h1>
          Please create account
        </h1>

        <section className="form">
          <form onSubmit={onSubmit}>
            <div className='form-group'>
              <label className='form-group'>Name please</label>
              <input type="text" className="form-control" id="name" name="name" value={name} onChange={onChange}/>
            </div>

            <div className='form-group'>
              <label className='form-group'>Surname please</label>
              <input type="text" className="form-control" id="surname" name="surname" value={surname} onChange={onChange}/>
            </div>

            <div className='form-group'>
              <label className='form-group'>Email please</label>
              <input type="email" className="form-control" id="email" name="email" value={email} onChange={onChange}/>
            </div>

            <div className='form-group'>
              <label className='form-group'>Password please</label>
              <input type="password" className="form-control" id="password" name="password" value={password} onChange={onChange}/>
            </div>
          

            <select className='form-select' value={setFormData.type} onChange={(e)=>{setFormData((prevState) => ({
                ...prevState,
                type: e.target.value
            }))} 
            }>
            {options.map((option) => (
              <option className='form-select' value={option.value} key={option.value} >{option.label}</option>
            ))}
          </select>

            <div className="form-group">
              <button type='submit' className="btn btn-block">Register</button>
            </div>

          </form>
        </section>
      </section>
    </>
  )
}

export default Register