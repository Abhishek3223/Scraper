import { React, useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/searchBar.css'
import AllContext from '../context/notes/Context'
// import { Menue } from '../images/image'
import '../css/hamburger.css'
import MobileNav from './mobileNabar';
// import Burger from './burger';


const SeacrhBar = (props) => {

    const navigate = useNavigate();
    const location = useLocation().pathname;
    const context = useContext(AllContext)
    const { LoginStatus, setloginStatus, Getuser } = context;

    const [title, setitle] = useState("")
    const [email, setmail] = useState("")

    const login = () => {
        navigate('/login')
    }
    const signup = () => {
        navigate('/signup')


    }
    const isVerificationPage = location.startsWith('/verify/');
    const LoadUser = async () => {
        try {
            if (localStorage.token) {
                const response = await Getuser();
                setitle(response.name)
                setmail(response.email)
                setloginStatus(true)
            }
        } catch (error) {
            console.log(error)
        }

    }


    useEffect(() => {
        LoadUser();
    }, [LoginStatus])



    return (

        <div className={(location === '/') || (location === '/login') || (location === '/verify/:id') || (location === '/signup') || (isVerificationPage) ? "display-none" : 'container'}>
            <MobileNav />
            <div className="title" style={{ "color": "white" }}>
                <img src="/logo/Logo2.png" alt="" srcSet="" />
            </div>
            <div className="authentication">
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
                                <img src="/images/avtar.png" alt="" srcSet="" />
                            </div>

                            <div className="dropdown-part">
                                <span className='avtar2'>
                                    <img src="/images/avtar.png" alt="" srcSet="" />
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
        </div >
    )
}

export default SeacrhBar