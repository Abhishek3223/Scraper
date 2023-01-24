import React, { useState, useContext } from 'react'
import AllContext from '../context/notes/Context'
import '../css/Newcomp.css'
import { Loaderr } from './loader';


const Newcomp = () => {

    const [addComp, setaddComp] = useState(false);
    const [height, setheight] = useState(false);
    let [loading, setloding] = useState(false);


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
    const contexts = useContext(AllContext)
    const { Addrepel } = contexts;

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
        console.log("submit button cliekced");
        console.log(credentials)
        const res = await Addrepel(credentials)

        increaseheight();

    }
    return (
        <div className={height ? "increaseWidth NewComp " :
            "NewComp"} >
            <div className='plus'>

                <p className='create-new-para'>
                    Lets create a new repel for u
                </p>
                <p onClick={() => { increaseheight() }} className='plus-left rotate'>
                    {
                        loading ? <Loaderr /> : '+'
                    }
                </p>

            </div>

            <div className={addComp ? "Add-deatails" :
                " display-none"}>
                <div className='title-part'>
                    <div className='div-label title-div'>
                        <p className='label'>Title </p>
                        <input className='input' type="text" id="fname" name="title" onChange={change} />
                    </div>
                    <div className="genrate-btn" onClick={submit}>
                        gernate comporator
                        <span >
                            {
                                loading ?
                                    <Loaderr /> :
                                    <i className="fa-solid fa-location-arrow send"></i>

                            }
                        </span>
                    </div>
                </div>

                <div className='div-label'>
                    <p className='label'>Link 1</p>
                    <input className='input' type="text" id="fname" name="link1" onChange={change} />
                </div>

                <div className='div-label'>
                    <p className='label'>Link 2</p>
                    <input className='input' type="text" id="fname" name="link2" onChange={change} />
                </div>

            </div>

        </div>
    )
}

export default Newcomp