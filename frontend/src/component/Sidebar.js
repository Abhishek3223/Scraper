import React, { useContext } from 'react'
import '../css/sideBar.css';
import AllContext from '../context/notes/Context';
import { Logo, Home, DashboardImage } from '../images/image';
import { Link, useLocation } from 'react-router-dom'
import Logout from '../images/logout';
import Burger from './burger';

const SideBar = (props) => {

    const location = useLocation().pathname;
    const context = useContext(AllContext)
    const { setloginStatus, showFullMenue, ActivateAlert, setMenue } = context;


    const changeWidth = () => {
        setMenue(!(showFullMenue));
        // props.changeWidth()
    }

    return (
        <div className={(location === '/') || (location === '/login') || (location === '/signup') ? "display-none" : 'navbar'
        } >

            <div className='ul'>
                <div className='li'>
                    <div className='menue-button' onClick={changeWidth}>
                        <Burger />
                    </div>
                </div>
                <div className='li'>
                    <Link to="/" className={location === "/" ? "active selected-item" : "active"}>
                        <span className='option-img'>
                            <Home />
                        </span>
                        <p className={`${showFullMenue ? 'item selected-para' : "display-none"} `}>Home</p>
                    </Link>
                </div>
                <div className='li'>
                    <Link to="/dashboard" className={location === "/dashboard" ? "active selected-item" : "active"}>
                        <span className='option-img'>
                            <i className="fa-solid fa-chart-line fa-3x dash-img"></i>
                        </span>

                        <p className={`${showFullMenue ? 'item selected-para' : "display-none"} `}>Dashbord</p>
                    </Link>
                </div>
                <div className='li'>
                    <Link to="/comment" className={location === "/comment" ? "active selected-item" : "active"}>
                        <span className='option-img' >
                            <i className="fa-regular fa-message fa-3x dash-img"></i>
                        </span>
                        <p className={`${showFullMenue ? 'item selected-para' : "display-none"} `}>Feedback</p>
                    </Link>
                </div>
                {/* <div className='li'>
                    <Link to="/productAnalysis" className={location === "/productAnalysis" ? "active selected-item" : "active"}>
                        <span className='option-img'> <Home /></span>
                        <p className={`${showFullMenue ? 'item selected-para' : "display-none"} `}></p>
                    </Link>
                </div> */}
                {/* <div className='li'>
                    <Link to="/" className={location === "/dashboard" ? "active selected-item" : "active"}>
                        <span className='option-img'> <Home /></span>
                        <p className={`${showFullMenue ? 'item selected-para' : "display-none"} `}>Admin</p>

                    </Link>
                </div> */}

            </div>
            <div className="li logout">
                <Link to="/" className={`${showFullMenue ? "active selected-item" : " logout-less"}`} >
                    <span
                        onClick={
                            () => {
                                localStorage.removeItem('token');
                                setloginStatus(false);
                                ActivateAlert("logged out", "warning")
                            }
                        }
                        className='option-img'>

                        <Logout />
                    </span>
                    <p className={`${showFullMenue ? ' item logout-para' : "display-none"} `}>Logout</p>
                </Link>
            </div>
        </div >

    )
}

export default SideBar