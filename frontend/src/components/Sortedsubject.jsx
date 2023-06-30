import React from 'react'
import { useState, useEffect } from 'react'

function Sortedsubject({subject}) {
    const [data, setData] = useState([])
    const [details, setDetails] = useState(false)


    //console.log(subject)
  return (
    <div className='homework-list' key={subject._id}>
        
        <div>
            <p className='desc'>description: {subject.text}</p>
        </div>
         <div className="createdAt">

            {details ? (<> Created at: {
                new Date(subject.createdAt).toLocaleString('en-US')}
                {subject.createdAt === subject.updatedAt ? (<></>) : (<><p>Edited at: {new Date(subject.updatedAt).toLocaleString('en-US')}</p> </>)}
                                            
                </>) : (<></>)}
                                    
        </div>
        <button className="edit" onClick={() => setDetails((prevState) => (!prevState))} >Click here for details</button>
    </div> 
  )
}

export default Sortedsubject