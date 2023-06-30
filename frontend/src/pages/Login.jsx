import React from 'react'
import {useState} from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Login() {
  const [formData, setFormData] = useState({
    email:'',
    password:''
  })
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const { email, password } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const url = "http://localhost:5000/api/users/login"
      const res = await axios.post(url, formData)
      sessionStorage.setItem('user', JSON.stringify(res.data))
      navigate("/")
      toast.success("you logged in")
      
    } catch (error) {
      if ( error.res && error.res.status >= 400 && error.res.status <= 500) {
        setError(error.res.data.message)
        }
    }
    
  }

  return (
    <>
      <section className="heading">
        <h1>
          Please Log in
        </h1>
        <p>
          to see your homeworks
        </p>

        <section className="form">
          <form onSubmit={onSubmit}>
            
            <div className='form-group'>
              <label>Enter your email:</label>
              <input type="email" className="form-control" id="email" name="email" value={email} onChange={onChange}/>
            </div>

            <div className='form-group'>
              <label className='form-group'>Enter your password:</label>
              <input type="password" className="form-control" id="password" name="password" value={password} onChange={onChange}/>
            </div>
            <div className="form-group">
              <button type='submit' className="btn btn-block">Log in</button>
            </div>

            
          </form>
        </section>
      </section>
    </>
  )
}

export default Login