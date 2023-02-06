import React, { useState, useEffect } from "react";

import '../css/imageCarousel.css'





const Carousel = (props) => {
    // const [detailsSpecs, setDetailsSpecs] = useState(false)
    const [_items, set_item] = useState([])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('Product_data'))
        set_item(data.url1.img)
        console.log(data.url1.img);
        console.log(_items);
    }, [])
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let [count, setCount] = useState(0);

    function prevClick() {
        console.log("perv");

        if (count) {

            setCount(--count);
        }


    }

    function nextClick() {
        console.log("next");
        if (count < _items.length - 1) {
            setCount(++count);

        }
        else {
            setCount(0)
        }

    }

    return (
        <div className="carousel__wrap">
            <div className="carousel__inner">
                <button className="carousel__btn carousel__btn--prev" onClick={() => prevClick()}>
                    <i className="carousel__btn-arrow carousel__btn-arrow--left" />
                </button>
                <div className="carousel__container">
                    <img src={_items[count]} alt="" />
                </div>
                <button className="carousel__btn carousel__btn--next" onClick={() => nextClick()}>
                    <i className="carousel__btn-arrow carousel__btn-arrow--right" />
                </button>

            </div>
        </div>
    );
};


export default Carousel