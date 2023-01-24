import React, { useContext, useEffect, useState } from 'react'
import ProductCard from '../component/productCard';
import Newcomp from './Newcomp';
import AllContext from '../context/notes/Context'
import "../css/Dashboard.css"
import { Loader } from './loader';
import { Loaderr } from './loader';


const Dashbord = () => {
    const context = useContext(AllContext)
    const [repel, setrepel] = useState([])

    const [isloading, setLoading] = useState(true);
    const changeLoading = () => {

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }
    const { GetRepel, LoginStatus } = context;

    useEffect(() => {
        return async () => {
            if (localStorage.getItem('token')) {
                const data = await GetRepel()
                await setrepel(data)

                if (await data) {
                    console.log("chnanging the is Loading");
                    changeLoading();
                }
                console.log(repel)
            }
        }


    }, [LoginStatus])
    return (
        <div className='Dashbord'>

            <Newcomp />

            <div className="present-comp">
                {
                    (isloading) ?
                        (<Loader />) :
                        (
                            (repel) ?
                                (repel.map((note) => {
                                    return <ProductCard key={note._id} data={note} />
                                }))
                                :
                                <div>
                                    <h1>nothing found</h1>
                                </div>
                        )
                }
            </div>
        </div>
    )
}

export default Dashbord