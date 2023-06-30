import React from 'react'
import axios from 'axios'
import {useState} from 'react'
import EditForm from '../components/EditForm'


function HomeworkItem({homework}) {
    const [edit, setEdit] = useState(false)
    const [error, setError] = useState("")
    const user = sessionStorage.getItem("user")
    let userObj = JSON.parse(user)
    const config = {
        headers: {
            Authorization: `Bearer ${userObj.token}`
        }
    }

    const deleteHomework = async (id) => {
        try {
            const url = `http://localhost:5000/api/homework/${id}`
            const res = await axios.delete(url, config)
            
          } catch (error) {
            if ( error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500) {
                setError(error.response.data.message);
              }
          }
        window.location.reload()
    }

    
    

  return (
    <div className='homework-list'>
        <div className='homework-item'>
            <div className="homework-div">
                <p>{homework.subject}</p>
                
                {userObj.type == "Teacher" ? (<> <p> id:{homework._id}</p>
                    <button className="edit" onClick={() => setEdit((prevEdit) => (!prevEdit))} >E</button>
                    <button className="close" onClick={() => deleteHomework(homework._id)}>X</button> 
                </>) : (<></>)}
            </div>
            <p className='description'>{homework.text}</p>
        </div>
        {edit ? ( <EditForm idOfItem={homework._id}/>) : (<></>)}
       
    </div>
  )
}

export default HomeworkItem