import React, { useState, useContext } from 'react'
import AllContext from '../context/notes/Context'
import '../css/Newcomp.css'
import { Loaderr } from './loader';


const Newcomp = () => {
   
    const [addComp, setaddComp] = useState(false);
    const [height, setheight] = useState(false);
    let [loading, setloding] = useState(false);
    const contexts = useContext(AllContext)
    const { Addrepel,  ActivateAlert } = contexts;


    const increaseheight = () => {
        if (addComp) {
            setaddComp(!(addComp));
            setheight(!height)
        }
        else {
            setheight(!height)
            setTimeout(() => {
                setaddComp(!(addComp))

            }, 100);
        }
    }

    const [credentials, setCredentials] = useState(
        {
            title: "",
            link1: "",
            link2: ""
        }
    )


    const change = (e) => {
        setCredentials({
            ...credentials, [e.target.name]: [e.target.value]
        })
    }
    const submit = async () => {
        setloding(!loading)
       // console.log("submit button cliekced");
       // console.log(credentials)
        if (credentials.link1) {
            const res = await Addrepel(credentials)
        }
        else {
            ActivateAlert("Atleast add one link", "warning")

        }
        setloding(false)

        increaseheight();

    }
    return (
        <div className={height ? "increaseWidth NewComp " :
            "NewComp"} >
            <div className='plus'>
                <p onClick={() => { increaseheight() }} className='plus-left '>
                    {
                        loading ? <Loaderr /> : '+'
                    }
                </p>
                <p className='create-new-para'>
                    Lets create a new repel for u
                </p>


            </div>

            <div className={addComp ? "Add-deatails" :
                " display-none"}>

                <div className='div-label'>
                    <p className='label'>Link 1</p>
                    <input className='input' type="text" id="fname" name="link1" onChange={change} />
                </div>

                <div className='div-label'>
                    <p className='label'>Link 2</p>
                    <input className='input' type="text" id="fname" name="link2" onChange={change} />
                </div>
                <div className='title-part'>


                    <div className="genrate-btn" onClick={submit}>
                        Genrate comporator
                        <span >
                            {
                                loading ?
                                    <Loaderr /> :
                                    <i style={{ "color": "white" }} className="fa-solid fa-2x fa-location-arrow send"></i>

                            }
                        </span>
                    </div>
                </div>

            </div>

        </div >
    )
}

export default Newcomp