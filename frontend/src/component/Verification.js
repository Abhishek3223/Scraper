import React, { useState, useContext } from 'react'
import '../css/verify.css'
import TypeWritter from './typeWriter'
import AllContext from '../context/notes/Context'
import { useEffect } from 'react'
import { Link, useParams } from "react-router-dom";

const Verification = () => {
    const [label, setLabel] = useState(["....", "....", "....", "....", "....", "....", "....", "....", "....", "....", "....", "....", "....", "....", "....", "...."])
    const [flag, setFlag] = useState(false)
    const context = useContext(AllContext)
    const { ActivateAlert } = context;
    const host = process.env.REACT_APP_HOST
    const routeParams = useParams();

    const Analysis = async () => {
        // console.log(routeParams.id);

        const response = await fetch(`${host}/api/auth/verify/${routeParams.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });


        const json = await response.json()
        console.log(json);

        if (json.name) {
            setFlag(true)

            setLabel([`Welcome ${json.name} we welcome you to the Scaraper World `])

        }
        else {
            ActivateAlert("Invalid Credentials", "warning")
        }
        return json


    }
    useEffect(() => {
        Analysis();
    }, [])

    return (
        <div className='first-part'>
            {/* <div> */}
            {/* <div className="logo-image">

                </div> */}


            <div id='badge' className='scale-up-center badge' >
                <Link to='/'>
                    <img id="image-logo" src="/logo/Logo2.png" alt="" srcSet="" />
                </Link>

                <div className="first_cont">
                    <div className="badge-img">
                        <i style={{ color: "#00adb5" }} class="fa-sharp fa-4x fa-solid fa-circle-exclamation">
                        </i>


                    </div>
                    <div className='badge-message'>
                        <p style={{ fontWeight: "bold" }}>
                            Account Verification
                        </p>


                    </div>


                </div>

                <div className="first_cont" >
                    {flag ?
                        <p style={{ fontSize: "25px" }}>
                            <span className='fetch'><TypeWritter style={{ color: "white" }} word={label} /></span>
                        </p>
                        :
                        <p style={{ fontSize: "25px" }}>
                            Fetching  <span className='fetch'><TypeWritter style={{ color: "white" }} word={label} /></span>
                        </p>
                    }

                </div>

            </div>
        </div>
    )
}

export default Verification