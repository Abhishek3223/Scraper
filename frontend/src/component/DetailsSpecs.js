import React from 'react'
import { useState, useEffect } from 'react';
import '../css/Details-specs.css'
import Details from './details';


const DetailsSpecs = (props) => {
    // const details_specs =  JSON.parse(props.data.url1.discription)
    const [detailsSpecs, setDetailsSpecs] = useState("")
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('Product_data'))
        console.log(data);
        const d = data.url1.discription
        setDetailsSpecs(JSON.parse(d))
        console.log(detailsSpecs);

    }, [])

    // const d = props.data.url1.discription
    // console.log(d);
    // const details_specs = JSON.parse(d);
    // console.log(details_specs);
    // console.log(JSON.parse(props.data.url1));
    // const Details = {
    //     "OS": 'Android 11.0',
    //     "RAM": '12 GB',
    //     'Product Dimensions': '16 x 7.3 x 0.8 cm; 177 Grams',
    //     "Batteries": '1 Lithium Polymer batteries required. (included)',
    //     'Item model number': 'CPH2249',
    //     'Wireless communication technologies': 'Cellular',
    //     'Connectivity technologies': 'Wi-Fi',
    //     ' GPS': 'GLONASS',
    //     'Special features': 'Camera Bokeh Flare Portrait Video | AI Highlight Video | OPPO Reno Glow 2.0;3D Borderless Screen',
    //     'Display technology': 'AMOLED',
    //     'Other display features': 'Wireless',
    //     'Other camera features': 'Front',
    //     'Form factor': 'Bar',
    //     ' Colour': 'Aurora',
    //     'Battery Power Rating': '4500',
    //     'Whats in the box': 'Handset, Charger, USB Cable, Earphhone, SIM Ejector Tool, Protective Case, Quick Start Guide, Safety Guide',
    //     ' Manufacturer': 'Oppo Mobiles India Private Limited',
    //     'Country of Origin': 'India',
    //     'Item Weight': '177 g'
    // }
    return (
        <div>
            <section>

                {/* <h1>Fixed Table header</h1> */}
                <div className="tbl-header">
                    <table cellpadding="0" cellSpacing="0" border="0">
                        <thead>
                            <tr>
                                <th>Specs_Name</th>
                                <th>Specs_Details</th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div className="tbl-content">
                    <table cellpadding="0" cellSpacing="0" border="0">
                        <tbody>
                            {
                                detailsSpecs ?
                                    detailsSpecs[0].map((i, k) => {
                                        return (
                                            <tr>
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