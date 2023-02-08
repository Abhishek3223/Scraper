import { React, useContext } from 'react'
import '../css/badge.css'
import AllContext from '../context/notes/Context'
import { Loaderr } from './loader'
import { Verify } from '../images/image'

const Badges = () => {
    const contexts = useContext(AllContext)
    const { ShowBadge, DeactivateBadge } = contexts;
    return (

        <div id='badge' className={ShowBadge.status ? 'scale-up-center badge' : 'scale-down-center'} >
            <div className="first_cont">
                <div className="badge-img">
                    {
                        ShowBadge.type === 'loader' && ShowBadge.status ? < Loaderr /> : ""
                    }
                    {
                        ShowBadge.type === 'verify' && ShowBadge.status ? <i style={{ color: "#00adb5" }} class="fa-solid fa-4x fa-circle-check"></i> : ""
                    }


                </div>
                <div className='badge-message'>
                    <p>
                        {ShowBadge.status ? ShowBadge.message : ""}
                    </p>
                </div></div>
            <div className="second_cont">
                {

                    ShowBadge.first && <div className="btn btn-first">
                        ok
                    </div>


                }

                {
                    // ShowBadge.second &&
                    ShowBadge.status && <div div className="btn btn-second" onClick={
                        () => {
                            DeactivateBadge('e');
                            console.log("clicked");
                        }

                    }>
                        cancel
                    </div>
                }
                {/* {
                    ShowBadge.type === "verify-mail" && <div className="btn btn-first" onClick={

                    }>
                        verify
                    </div>
                } */}

            </div>

        </ div >

    )
}

export default Badges