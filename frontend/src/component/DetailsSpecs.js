import React from 'react'
import { useState, useEffect } from 'react';
import '../css/Details-specs.css'
import Details from './details';


const DetailsSpecs = (props) => {
    // const details_specs =  JSON.parse(props.data.url1.discription)
    const [detailsSpecs, setDetailsSpecs] = useState("")
    useEffect(() => {


        const data = JSON.parse(localStorage.getItem('Product_data'))
        // console.log(data);
        const d1 = JSON.parse(data.url1.discription)
        const d2 = data.url2.link ? JSON.parse(data.url2.discription) : ""
        console.log(d1, d2);

        if (d1 === [[], []]) { setDetailsSpecs(d2) } else { setDetailsSpecs(d1) }
        console.log(detailsSpecs);

    }, [])
    return (
        <div>
            <section>

                {/* <h1>Fixed Table header</h1> */}
                <div className="tbl-header">
                    <table cellPadding="0" cellSpacing="0" border="0">
                        <thead>
                            <tr>
                                <th>Specs_Name</th>
                                <th>Specs_Details</th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div className="tbl-content">
                    <table cellPadding="0" cellSpacing="0" border="0">
                        <tbody>
                            {
                                detailsSpecs ?
                                    detailsSpecs[0].map((i, k) => {
                                        return (
                                            <tr key={k}>
                                                <td>{i}</td>
                                                <td>{detailsSpecs[1][k]} </td>
                                            </tr>
                                        )
                                    })
                                    :
                                    <tr>
                                        <td>nod ata</td>
                                        <td>dtata </td>
                                    </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </section>




        </div>
    )
}

export default DetailsSpecs