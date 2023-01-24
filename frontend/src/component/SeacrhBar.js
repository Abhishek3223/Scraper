import { React, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../css/searchBar.css'
import AllContext from '../context/notes/Context'
// import { Menue } from '../images/image'
import '../css/hamburger.css'
import Burger from './burger';


const SeacrhBar = (props) => {

    const navigate = useNavigate();

    const context = useContext(AllContext)
    const { LoginStatus, setloginStatus, Getuser, showFullMenue, setMenue } = context;

    const [title, setitle] = useState("")
    const [email, setmail] = useState("")

    const login = () => {
        navigate('/login')
    }
    const signup = () => {
        navigate('/signup')

    }
    const changeWidth = () => {
        setMenue(!(showFullMenue));
        props.changeWidth()
    }


    useEffect(() => {
        return async () => {
            if (localStorage.token) {

                const response = await Getuser();
                setitle(response.name)
                setmail(response.email)
                setloginStatus(true)

            }
        }
    }, [])



    return (

        <div className='container'>
            <div className='menue-button' onClick={changeWidth}>
                {/* svg here */}
                {/* < Menue className='menue' /> */}
                <Burger />

                {/* 
                <div id="menuToggle">

                    <input type="checkbox" />
                    <span></span>
                    <span></span>
                    <span></span>
                </div> */}

            </div>
            <div className="title" style={{ "color": "white" }}>
                Scarpper<span style={{ "color": "orange" }}>.Store</span>
            </div>
            <div className="authentication">
                {/* <div className="searchBar">

                </div> */}
                <div className='buttons'>

                    {!(LoginStatus) ?
                        <div className='button-div'>
                            <button onClick={signup} className="signup-button">
                                Signup
                            </button>
                            <button onClick={login} className="login-button">Login</button>
                        </div>
                        :
                        // if logged in then add the value 
                        <div className='user_id'>

                            <div className="div1 avtar">
                                <img src="/images/avtar.png" alt="" srcset="" />
                            </div>

                            <div className="dropdown-part">
                                <span className='avtar2'>
                                    <img src="/images/avtar.png" alt="" srcset="" />
                                </span>
                                <span className="dropdown-content">
                                    <p className='drop-title'>{title}</p>
                                    <p className='drop-email'>{email}</p>

                                </span>

                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default SeacrhBar