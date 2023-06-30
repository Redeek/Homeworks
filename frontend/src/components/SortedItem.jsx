import React from 'react'
import { useState, useEffect } from 'react'
import Sortedsubject from './Sortedsubject'

function SortedItem({homework}) {
    const [data, setData] = useState([])
    const [details, setDetails] = useState(false)



    console.log(homework.homework)

    return (<>
        <div className='homework-list' key={homework._id}>
        <div className="boldtext">
                    subject: {homework.name}
                </div>
            <div className='li' key={homework._id}>
                

                <div className="text">
                    
                    {
                        homework.homework.map((subject)=> (
                            <>
                            {
                            homework.homework.length === [] ? ( <><p> Brak pracy</p></>):(<><Sortedsubject subject={subject} key={subject._id}/></>)
                            
                            /* <div className='homework-list' key={homework._id}>
                                <div>
                                    <p>description: {subject.text}</p>
                                </div>
                                <div className="createdAt">

                                    {details ? (<> Created at: {
                                        new Date(subject.createdAt).toLocaleString('en-US')}
                                        {subject.createdAt === subject.updatedAt ? (<></>) : (<><p>Edited at: {new Date(subject.updatedAt).toLocaleString('en-US')}</p> </>)}
                                        
                                    </>) : (<></>)}
                                    
                                </div>
                            </div> */}
                            </>
                             )
                        )
                    }
                </div>

                <div className="createdAt">

                    {/* {details ? (<> Created at: {
                        new Date(homework.createdAt).toLocaleString('en-US')}
                        {homework.createdAt === homework.updatedAt ? (<></>) : (<><p>Edited at: {new Date(homework.updatedAt).toLocaleString('en-US')}</p> </>)}
                        
                    </>) : (<></>)} */}

                </div>
                {/* <button className="edit" onClick={() => setDetails((prevState) => (!prevState))} >Click here for details</button> */}


            </div>
        </div>
    </>)
}

export default SortedItem