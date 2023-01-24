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
    const refineTittle = () => {

    }
    return (
        <div className='product-card'
            onClick={() => {
                setAnalysisData(props.data);
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
                        <img src="/images/amazon.png" alt="" srcset="" />
                        <p className='product-price'>
                            Rs 30,000
                        </p>

                    </div>
                    <div className="price-flipkart">
                        <img src="/images/flipkart.png" alt="" srcset="" />
                        <p className='product-price'>
                            Rs 30,000
                        </p>
                    </div>
                    {/* <ul>
                        <li>
                            6 GB RAM | 64 GB ROM | Expandable Upto 1 TB
                            
                        </li>
                        <li>16.33 cm (6.43 inch) Full HD+ AMOLED Display</li>
                        <li>64MP + 8MP + 2MP | 16MP Front Camera</li>
                        <li>5000 mAh Lithium-ion Polymer Battery</li>

                    </ul> */}
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