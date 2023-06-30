import React from 'react'
import {Link} from 'react-router-dom'
import { useNavigate } from "react-router-dom"

function Header() {
    const user = sessionStorage.getItem("user")
    let userObj = JSON.parse(user)
    const navigate = useNavigate()

    const logout = () => {
        sessionStorage.removeItem('user')
        sessionStorage.removeItem('me')
        sessionStorage.removeItem('homework')
        navigate('/login')
    }

  return (
    <header className='header'>
        <div className="logo">
            <Link to='/'>ClassRoom</Link>
        </div>
        <ul>
            {user ? (<> 
                        <li>
                            Zalogowano jako: {userObj.type}
                        </li>
                        <li>
                            <button className='btn' onClick={logout}> Logout
                            </button>
                        </li>
                    </>) : (<>
                        <li>
                            <Link to='/login'>Login</Link>
                        </li>
                        <li>
                            <Link to='/register'>Register</Link>
                        </li>
                    </>)} 
            
        </ul>
    </header>
  )
}

export default Header