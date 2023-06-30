import React from 'react'
import { useState} from 'react'
import axios from 'axios'

function HomeworkForm(idOfItem) {
    
    const [homework, setHomework] = useState({
        id: idOfItem.idOfItem,
        text: '',
        updatedAt: `${new Date().toDateString()}`
    })
    const {id, text} = homework
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

    const onSubmit = async (e) => {
        e.preventDefault()
        console.log(userObj.token)
        console.log(homework + JSON.stringify({token:'123'}))
        const config = {
            headers: {
                Authorization: `Bearer ${userObj.token}`
            }
        }

        try {
            const url = `http://localhost:5000/api/homework/${id}`
            const res = await axios.put(url, homework, config)
              
          } catch (error) {
            if ( error.res && error.res.status >= 400 && error.res.status <= 500) {
              setError(error.res.data.message)
              }
          }
          window.location.reload()
    }

    return (
        <>
        <section className="form">
            <fieldset className='form form-field'>
                <form onSubmit={onSubmit}>
                    {/* <div className="form-group">
                        <label htmlFor='text'>enter id of subject</label>
                        <input type="text" className="form-group" name='id' id='id' value={id} onChange={onChange}/>
                    </div> */}
                    <div className="form-group">
                        <label>Edit description of homework:</label>
                        <textarea type="text" className="form-group" name='text' id='text' value={text} onChange={onChange}/>
                    </div>
                    <div className="form-group">
                        <button type='submit' className="btn btn-block">Edit homework</button>
                    </div>

                </form>
            </fieldset>
        </section>   
        </>
    );
}

export default HomeworkForm