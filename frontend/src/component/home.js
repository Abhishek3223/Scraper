import { React, useContext, useEffect } from 'react'
import '../css/Home.css'
import AllContext from '../context/notes/Context'
import { useNavigate } from 'react-router-dom';

import { SvgComponent, SvgComponent1 } from '../images/undraw';

const Home = () => {
    const context = useContext(AllContext)
    const { LoginStatus, setloginStatus } = context;
    const login = () => {
        navigate('/login')
    }
    const navigate = useNavigate();


    useEffect(() => {
        if (localStorage.token) {
            setloginStatus(true)
        }
    }, [LoginStatus])

    const signup = () => {
        navigate('/signup')

    }
    const movetoDashboard = () => {
        navigate('/dashboard')
    }
    const templateArray = ["Save money with ease using our price tracking and reminder site.", " Get more for less with our effortless price tracking and reminder site. "]

    return (
        <div className='home_page'>
            {/* <div className="design1">

            </div>
            <div className="design2">

            </div> */}
            <div className="logo_design">
                <p className='first_para'>Scraper.co</p>
            </div>
            <div className="home_nav">
                <div className="home_logo">
                    <img src="/logo/logo2.png" alt="" srcset="" />
                </div>

                <div className="authentication">
                    <div className='buttons'>

                        {!(LoginStatus) ?
                            <div className='button-div'>
                                <button onClick={login} className="login-button">Join us</button>
                            </div>
                            :
                            // if logged in then add the value 
                            <div className='button-div'>
                                <button onClick={movetoDashboard} className="login-button">Dashboard</button>
                            </div>
                        }
                    </div>
                </div>
            </div>

            <div className='main_body'>
                <div className="main_discription">
                    <p className='second_para'>

                        {templateArray[0]}
                    </p>
                    <div id="container" onclick={movetoDashboard}>
                        <button class="learn-more" >
                            <span class="circle" aria-hidden="true">
                                <span class="icon arrow"></span>
                            </span>
                            <span class="button-text">Get started</span>
                        </button>
                    </div>
                </div>
                <div className="main_image">
                    {/* <img src="/images/sitelogo3.png" alt="" srcset="" /> */}
                    {/* <Img /> */}
                    <SvgComponent1 className="first_img" />
                    <SvgComponent className="second_img" />
                </div>
            </div>

        </div>
    )
}

export default Home