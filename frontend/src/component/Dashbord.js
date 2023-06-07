import React, { useContext, useEffect, useState } from 'react'
import ProductCard from '../component/productCard';
import Newcomp from './Newcomp';
import AllContext from '../context/notes/Context'
import "../css/Dashboard.css"
import { useNavigate } from "react-router-dom"
import { Loader } from './loader';
// import { Loaderr } from './loader';
// import Badges from './Badges';


const Dashbord = () => {
    const navigate = useNavigate();
    const context = useContext(AllContext)
    // const [repel, setrepel] = useState([])
    const [isloading, setLoading] = useState(true);
    const changeLoading = () => {

        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }
    const { GetRepel, Getuser, repel, ActivateAlert, ActivateBadge } = context;

    const loadData = async () => {
        if (localStorage.getItem('token')) {
            const response = await Getuser();

            if (response.verfied) {
                const data = await GetRepel()
                // setrepel(data)
                if (await data) {
                    changeLoading();
                }
            }
            else {
                ActivateBadge("Please verify your account before proceeding", "verify-mail", "We have sent you email for account verification")
                // ActivateBadge(
                //     "Account not verified",
                //     "verify-mail",
                //     "Please verify your account before proceeding"
                //   );
                changeLoading();
            }

        }
        else {
            ActivateAlert("login first !!", "warning")
            navigate("/login")
        }
    }
    useEffect(() => {
        loadData()
    }, [])
    return (
        <div className='Dashbord'>
            <Newcomp />
            <div className="present-comp">
                {/* {
                    (isloading) ?
                        (<Loader />) :
                        (
                            (repel) ?
                                ([...repel].reverse().map((note) => {
                                    return <ProductCard key={note._id} data={note} />
                                }))
                                :
                                <div>
                                    <h1>nothing found</h1>
                                </div>
                        )
                } */}
                {/* {
                    isloading ? (
                        <Loader />
                    ) : repel && repel.length > 0 ? (
                        [...repel].reverse().map((note) => {
                            return <ProductCard key={note._id} data={note} />;
                        })
                    ) : (
                        <div>
                            <h1>Nothing found</h1>
                        </div>
                    )
                } */}


                {
                    isloading ? (
                        <Loader />
                    ) : repel && repel.length > 0 ? (
                        [...repel].reverse().map((note) => {
                            return <ProductCard key={note._id} data={note} />;
                        })
                    ) : (
                        <div className='nothing_found' style={{  }}>
                            {/* <h1>Keep calm, we will notify you soon!</h1>
                            <p>Paste a link here and we will notify you when it's ready.</p> */}
                        </div>
                    )
                }

            </div>
        </div>
    )
}

export default Dashbord