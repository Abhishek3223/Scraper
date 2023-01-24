import React, { useContext, useState, } from 'react'
import '../css/productAnalysis.css'
import { useNavigate } from 'react-router-dom'
import Details from './details'
import AllContext from '../context/notes/Context'
import Carousel from './imageSlider'
import Linechart from './linechart'
import DetailsSpecs from './DetailsSpecs'
import { Loaderr } from './loader';


const ProductAnalysis = () => {
    const navigate = useNavigate();

    const context = useContext(AllContext)

    const { AnalysisData } = context;
    const [brand, setBrand] = useState(true);
    const [blur1, setBlurST1] = useState(false);
    const [blur2, setBlurST2] = useState(false);
    const [notification, setNotification] = useState(0);
    let [loading, setloding] = useState(false);

    const [price, setPrice] = useState(
        {
            Price: ""
        }
    )
    const Change = (e) => {
        setPrice({

            ...price, [e.target.name]: [e.target.value]
        })
    }
    const updateNotifyPrice = async () => {
        console.log({
            "ans data": AnalysisData,
            "newPrice": price.Price,
            "as": AnalysisData._id
        })
        const host = 'http://localhost:5000'
        const Response = await fetch(`${host}/api/notes/UpdateItem/${AnalysisData._id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token')
                },

                body: JSON.stringify(
                    {
                        "newPrice": price.Price[0]
                    }
                )
            });
        console.log(await Response.json());
    }
    const update = async () => {
        setloding(true);
        await updateNotifyPrice();
        setloding(false);
    }
    const changeBrand = (e) => {
        console.log("chnage brand fired");
        if (e === 'amazon') {
            setBlurST2(true);
            setTimeout(() => {
                setBrand(true);
                setBlurST1(false);
            }, 500)
        }
        else {
            setBlurST1(true);
            setTimeout(() => {
                setBrand(false);
                setBlurST2(false);
            }, 500)
        }
    }
    return (
        <div className='ProductAnalysis'>
            <div className="analysis-left">

                <div onClick={() => { navigate(-1) }}
                    className="back-btn" >
                    <i className="fa-solid fa-angles-left fa-3x "  ></i>
                </div>

                <div className="imageSlider">
                    <Carousel />
                </div>
                <div className='Price-offers'>
                    <div className="price">
                        <div className="link-price" onClick={() => { changeBrand('amazon') }}>
                            <div className={!brand ? "WEB-logo" : "WEB-logo-border"} >
                                <img className='amazon' src="/images/amazon.png" alt="" />
                            </div>
                            <div className="price-value" >
                                <p>Rs. 27,999</p>
                            </div>
                        </div>
                        <div className="link-price " onClick={() => { changeBrand("") }}>
                            <div className={brand ? "WEB-logo" : "WEB-logo-border"} >
                                <img className='flipkart' src="/images/flipkart.png" alt="" />
                            </div>
                            <div className="price-value" >
                                <p>Rs.27,999</p>
                            </div>
                        </div>
                    </div>
                    <div className="offers">
                        <div>
                            <p style={{ "fontSize": "20px", "marginLeft": "10px", "fontWeight": "600" }}>Offers</p>
                        </div>
                        {brand ?
                            // amazon
                            <div className={blur1 ? "blur-out-contract-bck " : "focus-in-expand"}>
                                <p><span> OuT for delivery</span>: Excepturi sint quasi mollitia blanditiis unde, facilis tempora, eligendi dolor at, labore voluptatibus. </p>
                                <p><span> GST FREE</span>: Get GST  invoice and save up to 28% on business purchases.</p>
                            </div>
                            :
                            // for flipkart
                            <div className={blur2 ? "blur-out-contract-bck " : "focus-in-expand"}>
                                <p><span> GST FREE</span>: Get GST  invoice and save up to 28% on business purchases.</p>
                            </div>
                        }

                    </div>

                </div>
                <div className="notification">
                    <div className="bell" onClick={() => { setNotification(!notification) }}>
                        {
                            notification ?
                                <i class=" scale-up-top  fa-5x fa-solid fa-bell-slash"></i> :
                                <i class=" scale-up-top  fa-solid fa-bell fa-5x"></i>
                        }

                    </div>
                    <div className='notify'>
                        <p> Alert me when price is less then </p>
                        <div className={"notify-para"}>
                            <input onChange={Change} name="Price" />
                            <div className='btn' onClick={update}>
                                Notify
                                <span >
                                    {
                                        loading ?
                                            <Loaderr /> :
                                            <i className="fa-solid fa-location-arrow send"></i>

                                    }
                                </span>
                            </div>
                        </div>


                    </div>

                </div>
            </div>

            <div className="analysis-right">

                <p className='analysis-title scale-up-top'>
                    {AnalysisData.title ?
                        AnalysisData.title : "Techno Phantom X2"
                    }

                </p>


                <div className="analysis-chart">
                    <Linechart data={AnalysisData} />
                </div>
                {/* <div className="analysis-details">
                    <Details data={AnalysisData} />
                </div> */}
                <div className="analysis-details">
                    <DetailsSpecs data={AnalysisData} />
                    {/* <Details data={AnalysisData} /> */}
                </div>

            </div>



        </div >
    )
}

export default ProductAnalysis