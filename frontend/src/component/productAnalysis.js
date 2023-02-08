import React, { useContext, useState, useEffect } from 'react'
import '../css/productAnalysis.css'
import { useNavigate } from 'react-router-dom'
// import Details from './details'
import AllContext from '../context/notes/Context'
import Carousel from './imageSlider'
import Linechart from './linechart'
import DetailsSpecs from './DetailsSpecs'
import { Loaderr } from './loader';


const ProductAnalysis = (props) => {
    const navigate = useNavigate();

    const context = useContext(AllContext)

    const { ActivateAlert, DeactivateBadge, ActivateBadge } = context;
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
        ActivateBadge('updating the notify Price', 'loader')
        const res = await updateNotifyPrice();
        ActivateBadge('Succesfully updated the price', 'verify')
        DeactivateBadge()
        // ActivateAlert("Succesfully updated the price", "success")
        console.log(res);
        setloding(false);
    }


    const [AnalysisData, setAnalysisData] = useState(false);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('Product_data'))
        setAnalysisData(data)
        // console.log(data);
        // console.log(AnalysisData.offers);
    }, [])

    const getImage = (link) => {
        if (link.slice(0, 18) === "https://www.amazon") { return "amazon" }
        else if (link.slice(0, 20) === "https://www.flipkart") { return "flipkart" }
        else { return 0 }
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
                <div className='up-title'>
                    <p className='analysis-title-up scale-up-top'>
                        {AnalysisData.title ?
                            AnalysisData.title : "NO name"
                        }

                    </p>
                </div>

                <div className='Price-offers'>
                    <div className="price">

                        {AnalysisData.url1 && getImage(AnalysisData.url1.link) ?
                            <div className="link-price" onClick={() => { changeBrand('amazon') }}>
                                <div className={!brand ? "WEB-logo" : "WEB-logo-border"} >
                                    <img className={getImage(AnalysisData.url1.link)} src={`/images/${getImage(AnalysisData.url1.link)}.png`} alt="" />
                                </div>
                                <div className="price-value" >
                                    <p>{AnalysisData.url1.priceData[AnalysisData.url1.priceData.length - 1]}</p>
                                </div>
                            </div> : ""
                        }

                        {(AnalysisData.url2 && getImage(AnalysisData.url2.link)) ?
                            <div className="link-price " onClick={() => { changeBrand("") }}>
                                <div className={brand ? "WEB-logo" : "WEB-logo-border"} >
                                    <img className={getImage(AnalysisData.url2.link)} src={`/images/${getImage(AnalysisData.url2.link)}.png`} alt="" />
                                </div>
                                <div className="price-value" >
                                    <p>{AnalysisData.url2.priceData[AnalysisData.url2.priceData.length - 1]}</p>
                                </div>
                            </div> : ""
                        }
                    </div>
                    <div className="offers">
                        <div>
                            <p style={{ "fontSize": "20px", "marginLeft": "10px", "fontWeight": "600" }}>Offers</p>
                        </div>
                        {brand ?
                            // amazon
                            <div className={blur1 ? "blur-out-contract-bck " : "focus-in-expand"}>
                                {
                                    AnalysisData.url1?.offers ?
                                        (JSON.parse(AnalysisData.url1.offers)[0]?.map((i, k) => {
                                            return <p key={k}><span> {i}</span> :{JSON.parse(AnalysisData.url1.offers)[1][k] ? JSON.parse(AnalysisData.url1.offers)[1][k] : "Please go to site for more info."}</p>
                                        })) : ""
                                }

                            </div>
                            :
                            // for flipkart
                            <div className={blur2 ? "blur-out-contract-bck " : "focus-in-expand"}>
                                {
                                    AnalysisData.url2?.offers ?
                                        (JSON.parse(AnalysisData.url2.offers)[0]?.map((i, k) => {
                                            return <p key={k}><span> {i}</span>:{JSON.parse(AnalysisData.url2.offers)[1] !== [] ? JSON.parse(AnalysisData.url2.offers)[1][k] : ""}</p>
                                        })) : ""
                                }
                            </div>
                        }

                    </div>

                </div>
                <div className="notification">
                    <div className="bell" onClick={() => { setNotification(!notification) }}>
                        {
                            notification ?
                                <i className=" scale-up-top  fa-5x fa-solid fa-bell-slash"></i> :
                                <i className=" scale-up-top  fa-solid fa-bell fa-5x"></i>
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
                                            <Loaderr style={{ marginLeft: '10px' }} /> :
                                            <i style={{ 'color': 'white' }} className="fa-solid fa-location-arrow send"></i>

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
                        AnalysisData.title : "NO name"
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