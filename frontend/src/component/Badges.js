import { React, useContext } from 'react'
import '../css/badge.css'
import AllContext from '../context/notes/Context'
import { Loaderr } from './loader'
import { useNavigate } from "react-router-dom"
// import { Verify } from '../images/image'

const Badges = () => {
    const contexts = useContext(AllContext)
    const navigate = useNavigate();

    const { ShowBadge, DeactivateBadge } = contexts;
    return (

        <div id='badge' className={ShowBadge.status ? 'scale-up-center badge' : 'scale-down-center'} >
            <div className="first_cont">
                <div className="badge-img">
                    {
                        ShowBadge.type === 'loader' && ShowBadge.status ? < Loaderr /> : ""
                    }
                    {
                        ((ShowBadge.type === 'verify' || ShowBadge.type === 'verify-mail') && ShowBadge.status)
                            ?
                            <i style={{ color: "#00adb5" }} class="fa-sharp fa-4x fa-solid fa-circle-exclamation"></i> : ""
                    },
                    {
                        ShowBadge.type === 'error' && ShowBadge.status ? <a
                            href="https://www.flaticon.com/free-icons/error" title="error icons" ></a> : ""
                    }


                </div>
                <div className='badge-message'>
                    <p>
                        {ShowBadge.status ? ShowBadge.message : ""}
                    </p>

                </div>

            </div>
            {
                ShowBadge.status && ShowBadge.message_2 ?
                    <div className='badge-message-2'>
                        <p>
                            {ShowBadge.message_2}
                        </p>

                    </div> : ""
            }

            <div className="second_cont">
                {

                    ShowBadge.first && <div className="btn btn-first">
                        ok
                    </div>


                }
                {
                    ShowBadge.type === 'verify-mail' ?
                        <div div className="btn btn-first">
                            <a href="https://mail.google.com/mail/u/0/#inbox">
                                verify
                            </a>

                        </div>
                        : ""
                }
                {
                    // ShowBadge.second &&
                    ShowBadge.status && <div div className="btn btn-second" onClick={
                        () => {
                            DeactivateBadge('e');
                            if (ShowBadge.type === 'verify-mail') {
                                navigate('/');
                            }
                        }
                    }>
                        cancel
                    </div>
                }

            </div>

        </ div >

    )
}

export default Badges