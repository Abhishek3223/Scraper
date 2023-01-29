import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import { Chart as ChartJS } from "chart.js/auto";
import '../css/productAnalysis.css'


const Linechart = () => {
    const [detailsSpecs, setDetailsSpecs] = useState(false)
    const [labelData, setlabelData] = useState(false)


    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('Product_data'))
        setDetailsSpecs(data)
        changeData(data)
        // console.log(detailsSpecs);
    }, [])

    const changeData = (d) => {
        console.log(d.url1.priceData,);
        setlabelData({
            labels: d.url1.timeData,
            datasets: [
                {
                    label: "Flipkart",
                    data: d.url1.priceData,
                    fill: true,
                    backgroundColor: "rgba(75,192,192,0.2)",
                    borderColor: "rgba(75,192,192,1)"
                },
                {
                    label: "Amazon",
                    data: d.url2.priceData,
                    fill: false,
                    borderColor: "#742774"
                }
            ]
        })


    }
    // const data = {
    //     labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    //     datasets: [
    //         {
    //             label: "First dataset",
    //             data: [33, 53, 85, 41, 44, 65, 33, 53, 85, 41, 44, 65, 33, 53, 85, 41, 44, 65, 33, 53, 85, 41, 44, 65, 33, 53, 85, 41, 44, 65, 33, 53, 85, 41, 44, 65],
    //             fill: true,
    //             backgroundColor: "rgba(75,192,192,0.2)",
    //             borderColor: "rgba(75,192,192,1)"
    //         },
    //         {
    //             label: "Second dataset",
    //             data: [85, 21, 44, 65, 11, 53, 33, 25, 35, 51, 54, 76, 33, 25, 35, 51, 54, 76.33, 53, 85, 41, 44, 65, 33, 53, 85, 41, 44, 65, 33, 53, 85, 41, 44, 65],
    //             fill: false,
    //             borderColor: "#742774"
    //         }
    //     ]
    // };
    // const data = {
    //     labels: ,
    //     datasets: [
    //         {
    //             label: "First dataset",
    //             data: [33, 53, 85, 41, 44, 65, 33, 53, 85, 41, 44, 65, 33, 53, 85, 41, 44, 65, 33, 53, 85, 41, 44, 65, 33, 53, 85, 41, 44, 65, 33, 53, 85, 41, 44, 65],
    //             fill: true,
    //             backgroundColor: "rgba(75,192,192,0.2)",
    //             borderColor: "rgba(75,192,192,1)"
    //         },
    //         {
    //             label: "Second dataset",
    //             data: [85, 21, 44, 65, 11, 53, 33, 25, 35, 51, 54, 76, 33, 25, 35, 51, 54, 76.33, 53, 85, 41, 44, 65, 33, 53, 85, 41, 44, 65, 33, 53, 85, 41, 44, 65],
    //             fill: false,
    //             borderColor: "#742774"
    //         }
    //     ]
    // };

    // {
    //     labels: data.labels,
    //     datasets: [
    //         {
    //             label: "Flipkart",
    //             data: data.datasets[0].data,
    //             fill: true,
    //             backgroundColor: "rgba(75,192,192,0.2)",
    //             borderColor: "rgba(75,192,192,1)"
    //         },
    //         {
    //             label: "Amazon",
    //             data: data.datasets[1].data,
    //             fill: false,
    //             borderColor: "#742774"
    //         }
    //     ]
    // }


    const [week, setWeek] = useState(false);
    const [months, setMonths] = useState(false);
    const [Year, setYear] = useState(true);

    const setAllFalse = () => {
        setWeek(false);
        setMonths(false);
        setYear(false);
    }
    const setChart = (e) => { setAllFalse(); console.log("change chart"); }
    // const setChart = (e) => {
    //     console.log("event sfired");
    //     setAllFalse();

    //     // console.log({ week, Year, months });
    //     const arrayLength = (data.datasets[0].data).length

    //     if (e === 'week') {
    //         setWeek(true);
    //         setFirstData({
    //             labels: (data.labels).slice(arrayLength - 7, arrayLength),
    //             datasets: [
    //                 {
    //                     label: "Flipkart",
    //                     data: (data.datasets[0].data).slice(arrayLength - 7, arrayLength),
    //                     fill: true,
    //                     backgroundColor: "rgba(75,192,192,0.2)",
    //                     borderColor: "rgba(75,192,192,1)"
    //                 },
    //                 {
    //                     label: "Amazon",
    //                     data: (data.datasets[1].data).slice(arrayLength - 7, arrayLength),
    //                     fill: false,
    //                     borderColor: "#742774"
    //                 }
    //             ]
    //         })
    //     }
    //     if (e === 'months') {
    //         setMonths(true);
    //         setFirstData({
    //             labels: (data.labels).slice(arrayLength - 30, arrayLength),
    //             datasets: [
    //                 {
    //                     label: "Flipkart",
    //                     data: (data.datasets[0].data).slice(arrayLength - 30, arrayLength),
    //                     fill: true,
    //                     backgroundColor: "rgba(75,192,192,0.2)",
    //                     borderColor: "rgba(75,192,192,1)"
    //                 },
    //                 {
    //                     label: "Amazon",
    //                     data: (data.datasets[1].data).slice(arrayLength - 30, arrayLength),
    //                     fill: false,
    //                     borderColor: "#742774"
    //                 }
    //             ]
    //         })
    //     }
    //     if (e === 'year') {
    //         setYear(true);
    //         setFirstData({
    //             labels: data.labels,
    //             datasets: [
    //                 {
    //                     label: "Flipkart",
    //                     data: data.datasets[0].data,
    //                     fill: true,
    //                     backgroundColor: "rgba(75,192,192,0.2)",
    //                     borderColor: "rgba(75,192,192,1)"
    //                 },
    //                 {
    //                     label: "Amazon",
    //                     data: data.datasets[1].data,
    //                     fill: false,
    //                     borderColor: "#742774"
    //                 }
    //             ]
    //         })
    //     }
    //     console.log({ week, months, Year });
    // }

    return (
        <div style={{ 'width': '100%', 'height': "100%" }}>
            <div className="but-changePeriod">
                <button className={week ? 'bg-purple' : "bg-normal"} onClick={() => setChart('week')}>
                    last week
                </button>
                <button className={months ? 'bg-purple' : "bg-normal "} onClick={() => setChart('months')}>
                    Month
                </button>
                <button className={Year ? 'bg-purple' : "bg-normal "} onClick={() => setChart('year')}>
                    6 Months
                </button>
            </div>
            {
                labelData ?
                    <Line data={labelData} /> : ""
            }
        </div>
    )
}

export default Linechart