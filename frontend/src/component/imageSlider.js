import React from 'react'
import '../css/imageCarousel.css'





const Carousel = (props) => {

    const slideWidth = 30;
    const _items = [
        'https://i.postimg.cc/RhYnBf5m/er-slider.jpg', 'https://i.postimg.cc/qBGQNc37/ro-slider.jpg', 'https://i.postimg.cc/cHdMJQKG/svb-slider.jpg', 'https://i.postimg.cc/C12h7nZn/ms-1.jpg', 'https://i.postimg.cc/NfzMDVHP/willie-mosconi-slider.jpg'
    ]
    // const _items = [
    //     {
    //         player: {
    //             image: 'https://i.postimg.cc/RhYnBf5m/er-slider.jpg',
    //         },
    //     },
    //     {
    //         player: {
    //             image: 'https://i.postimg.cc/qBGQNc37/ro-slider.jpg',
    //         },
    //     },
    //     {
    //         player: {
    //             image: 'https://i.postimg.cc/cHdMJQKG/svb-slider.jpg',
    //         },
    //     },
    //     {
    //         player: {
    //             image: 'https://i.postimg.cc/C12h7nZn/ms-1.jpg',
    //         },
    //     },
    //     {
    //         player: {
    //             image: 'https://i.postimg.cc/NfzMDVHP/willie-mosconi-slider.jpg',
    //         },
    //     },
    // ];

    const length = _items.length;
    _items.push(..._items);

    const sleep = (ms = 0) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    };

    const createItem = (position, idx) => {
        const item = {
            styles: {
                transform: `translateX(${position * slideWidth}rem)`,
            },
            player: _items[idx],
        };
        // console.log(item);

        switch (position) {
            case length - 1:
            case length + 1:
                item.styles = { ...item.styles, filter: 'grayscale(1)' };
                break;
            case length:
                break;
            default:
                item.styles = { ...item.styles, opacity: 0 };
                break;
        }

        return item;
    };

    const CarouselSlideItem = ({ pos, idx, activeIdx }) => {
        const item = createItem(pos, idx, activeIdx);

        return (
            <li className="carousel__slide-item" style={item.styles}>
                <div className="carousel__slide-item-img-link">
                    <img src={item.player} alt={item.player} />
                </div>
            </li>
        );
    };

    const keys = Array.from(Array(_items.length).keys());

    const [items, setItems] = React.useState(keys);
    const [isTicking, setIsTicking] = React.useState(false);
    const [activeIdx, setActiveIdx] = React.useState(0);
    const bigLength = items.length;

    const prevClick = (jump = 1) => {
        if (!isTicking) {
            setIsTicking(true);
            setItems((prev) => {
                return prev.map((_, i) => prev[(i + jump) % bigLength]);
            });
        }
    };

    const nextClick = (jump = 1) => {
        if (!isTicking) {
            setIsTicking(true);
            setItems((prev) => {
                return prev.map(
                    (_, i) => prev[(i - jump + bigLength) % bigLength],
                );
            });
        }
    };

    // const handleDotClick = (idx) => {
    //     if (idx < activeIdx) prevClick(activeIdx - idx);
    //     if (idx > activeIdx) nextClick(idx - activeIdx);
    // };

    React.useEffect(() => {
        if (isTicking) sleep(300).then(() => setIsTicking(false));
    }, [isTicking]);

    React.useEffect(() => {
        setActiveIdx((length - (items[0] % length)) % length) // prettier-ignore
    }, [items]);

    return (
        <div className="carousel__wrap">
            <div className="carousel__inner">
                <button className="carousel__btn carousel__btn--prev" onClick={() => prevClick()}>
                    <i className="carousel__btn-arrow carousel__btn-arrow--left" />
                </button>
                <div className="carousel__container">
                    <ul className="carousel__slide-list">
                        {items.map((pos, i) => (
                            <CarouselSlideItem
                                key={i}
                                idx={i}
                                pos={pos}
                                activeIdx={activeIdx}
                            />
                        ))}
                    </ul>
                </div>
                <button className="carousel__btn carousel__btn--next" onClick={() => nextClick()}>
                    <i className="carousel__btn-arrow carousel__btn-arrow--right" />
                </button>

            </div>
        </div>
    );
};


export default Carousel