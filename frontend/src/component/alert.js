import { React, useContext, useState } from 'react'
import '../css/Alert.css'
import AllContext from '../context/notes/Context'

const Alert = () => {
    // const [ShowAlert, SetAlert] = useState(true)
    const contexts = useContext(AllContext)
    const { ShowAlert, SetAlert } = contexts;
    console.log(ShowAlert);

    return (
        <div className={ShowAlert.status ? "fade-in-image cont " : "opacity-zero cont"}>

            <div className={`wrapper-${ShowAlert.signal}`}>
                <div className="card">
                    <div className="icon">
                        <i className="fas fa-check-circle"></i>
                    </div>
                    <div className="subject">
                        <h3>{ShowAlert.signal}</h3>
                        <p>{ShowAlert.message}</p>
                    </div>
                    <div className="icon-times"
                        onClick={() => {
                            SetAlert({
                                status: false,
                                message: "",
                                signal: "",
                            })
                        }}><i className="fas fa-times"></i></div>
                </div>
            </div>
        </div>
    )
}

export default Alert