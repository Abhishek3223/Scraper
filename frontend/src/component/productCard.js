import React, { useContext, } from 'react'
import '../css/productCard.css'
import AllContext from '../context/notes/Context'
import { useNavigate } from 'react-router-dom'

const ProductCard = (props) => {


    const context = useContext(AllContext)
    const navigate = useNavigate();

    const { setAnalysisData } = context;
    const title = props.data.title
    for (let index = 0; index < title.length; index++) {
        const element = title[index];
    }
    const getImage = (link) => {
        if (link.slice(0, 18) === "https://www.amazon") { return "/images/amazon.png" }
        else if (link.slice(0, 20) == "https://www.flipkart") { return "/images/flipkart.png" }
        else { return 0 }
    }
    return (
        <div className='product-card'
            onClick={async () => {
                console.log(props.data);
                localStorage.setItem('Product_data', JSON.stringify(props.data))
                navigate('/productAnalysis')
            }}
        >

            <div className='product-img'>
                <img src="https://rukminim1.flixcart.com/image/416/416/l0fm07k0/mobile/a/6/b/-original-imagc7tdwfp2gz4h.jpeg?q=70" alt="" srcset="" />

            </div>
            <div className="product-details">
                <p className="prodcut-title">
                    {props.data.title}
                </p>
                {/* <p className="prodcut-secondry-title">
                    {props.data.title}
                </p> */}
                <div className="rating">
                    ★4.3

                </div>
                <div className="details">

                    <div className="price-amazon">
                        {
                            getImage(props.data.url1.link)?
                                <>
                                    <img src={getImage(props.data.url1.link)} alt="" srcset="" />
                                    <p className='product-price'>
                                        {props.data.url1.priceData[props.data.url1.priceData.length - 1]}
                                    </p>
                                </>

                                : ""
                        }


                    </div>
                    <div className="price-flipkart">
                        {
                            getImage(props.data.url2.link) ?
                                <>
                                    <img src={getImage(props.data.url2.link)} alt="" srcset="" />
                                    <p className='product-price'>
                                        {
                                            props.data.url2.priceData[props.data.url1.priceData.length - 1]
                                        }
                                    </p>
                                </>
                                : ""
                        }

                    </div>

                </div>
                {/* <div className="price-amazon">
                    <img src="/images/amazon.png" alt="" srcset="" />
                    <p className='product-price'>
                        Rs 30,000
                    </p>
                    <div className="rating">
                        ★4.3
                    </div>
                </div> */}
                {/* <div className="price-flipkart">
                    <img src="/images/flipkart.png" alt="" srcset="" />
                    <p className='product-price'>
                        Rs 30,000
                    </p>
                    <div className="rating">
                        ★4.3
                    </div>
                </div> */}
            </div>

        </div >
    )
}

export default ProductCard