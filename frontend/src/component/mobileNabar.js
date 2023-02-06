import React from 'react'
import AllContext from '../context/notes/Context'
import { useState, useContext } from 'react';
import '../css/mobile-navbar.css'
import { Link, useLocation } from 'react-router-dom'
import '../css/sideBar.css';


export default function MobileNav(props) {


    const location = useLocation().pathname;
    const [checked, setChecked] = useState(false);
    const showFullMenue = useState(true)
    const context = useContext(AllContext)
    const { ActivateAlert, setloginStatus } = context;

    return (

        <div class="navbar-mob">
            <div class="container nav-container">
                <input class="checkbox" type="checkbox" checked={checked}
                    onChange={e => setChecked(e.target.checked)} name="" id="check" />
                <div class="hamburger-lines">
                    <span class="line line1"></span>
                    <span class="line line2"></span>
                    <span class="line line3"></span>
                </div>

                <div class="menu-items">
                    <li>
                        <Link className={location === "/" ? 'background-phone Link' : 'Link'} to="/" onClick={() => (setChecked(false))}   >
                            <span className='option-img'>
                                <i className="fa-solid fa-chart-line fa-xs dash-img"></i>
                            </span>
                            <p className={`${showFullMenue ? 'item selected-para' : "display-none"} `}>Home</p>
                        </Link>
                    </li>
                    <li>
                        <Link className={location === "/dashboard" ? 'background-phone Link' : 'Link'} to="/dashboard" onClick={() => (setChecked(false))} >
                            <span className='option-img'>
                                <i className="fa-solid fa-chart-line fa-xs  dash-img"></i>
                            </span>

                            <p className={`${showFullMenue ? 'item selected-para' : "display-none"} `}>Dashbord</p>
                        </Link>
                    </li>
                    <li>
                        <Link className={location === "/comment" ? 'background-phone Link' : 'Link'} to='/comment' onClick={() => (setChecked(false))}  >
                            <span className='option-img' >
                                <i className="fa-regular fa-message fa-xs dash-img"></i>
                            </span>
                            <p className={`${showFullMenue ? 'item selected-para' : "display-none"} `}>Feedback</p></Link>
                    </li>
                    <li>
                        <Link className={location === "/productAnalysis" ? 'background-phone Link' : 'Link'} to="/productAnalysis" onClick={() => (setChecked(false))} >
                            <span className='option-img'>
                                <i className="fa-regular fa-message fa-xs dash-img"></i>
                            </span>
                            <p className={`${showFullMenue ? 'item selected-para' : "display-none"} `}></p>
                        </Link>
                    </li>
                    <li >
                        <Link className={location === "/" ? 'background-phone Link' : 'Link'} to="/productAnalysis" onClick={
                            () => {
                                localStorage.removeItem('token');
                                setloginStatus(false);
                                ActivateAlert("logged out", "warning")
                            }
                        } >
                            <span className='option-img'>
                                <i className="fa-regular fa-message fa-xs dash-img"></i>
                            </span>
                            <p className={`${showFullMenue ? 'item selected-para' : "display-none"} `}>Logout</p>
                        </Link>
                    </li>

                </div>
            </div>
        </div>



    )
}
