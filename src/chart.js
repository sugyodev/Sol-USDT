import React, { useEffect, useCallback, useState } from "react";
import { createChart } from "lightweight-charts";
import moment from 'moment';
import Chart from 'react-apexcharts'
import axios from "axios";
import { GiWhiteBook } from "react-icons/gi";
// import { BACKEND_URL } from "../config";
const BACKEND_URL = "https://api.etherscan.io/apis";

    // const init = useCallback(() => {
    //     var chart = createChart(document.getElementById("chart1"), {
    //         priceScale: {
    //             scaleMargins: {
    //                 top: 0.3,
    //                 bottom: 0.25
    //             },
    //             borderVisible: false
    //         },
    //         layout: {
    //             backgroundColor: "#2f3136",
    //             textColor: "#d1d4dc"
    //         },
    //         grid: {
    //             vertLines: {
    //                 color: "rgba(42, 46, 57, 0)"
    //             },
    //             horzLines: {
    //                 color: "rgba(42, 46, 57, 0.6)"
    //             }
    //         },
    //         timeScale: {
    //             visible: false,
    //         },
    //     });

//         setArea(
//             chart.addAreaSeries({
//                 topColor: "rgba(243,126,86, 0.56)",
//                 bottomColor: "rgba(200,150,86, 0.04)",
//                 lineColor: "rgba(231,81,30, 1)",
//                 lineWidth: 2
//             })
//         );
//         let prviouspair = "BTCUSDT";
//         let tempTime = new Date().getTime();
//         const getData = async function () {
//             let prevdata = data;
//             let tempTime = new Date(graphLoadingTime.setDate(graphLoadingTime.getDate() + 1));
//             investInfo.map((item, index) => {
//                 console.log("Item: ", item, ": ", index);
//                 prevdata.push({ time: moment(tempTime).format("YYYY-MM-DD"), value: item[0] });
//             })
//             setGraphLoadingTime(tempTime);
//             setSeriesData(prevdata);
//             if (areaSeries != null) {
//                 areaSeries.setData(prevdata);
//             }
//         }
//         // setInterval(() => {
//             getData()
//         // }, 1000);
//     }, []);

//     return (
//         <div className="App">
//             <span>Hello</span>
//             <div id="chart1" />
//         </div>
//     );
// }
const ApexChart = (props) => {
  const [ options, setOptions ] = useState({
    chart: {
      id: 'apexchart-example'
    },
    xaxis: {
      categories: []
    },
    // theme: {
    //   mode: 'dark'
    // }
  });

  const [ series, setSeries ] = useState([{
    name: 'BUSD Amount',
    data: []
  }]);

  useEffect(()=> {
    // console.log("chatjs =====>    ",props);
    const categoryData = props.investInfo.map((v, i)=> moment(1000 * v[1]).format("YYYY-MM-DD"));
    const data0 = props.investInfo.map((v, i) => v[0]);
    console.log("data0: ", data0);
    setOptions({
      ...options,
      xaxis: {
        categories: categoryData
      } 
    })

    setSeries([{
      ...series,
      data: data0
    }])
  },[props])

  return (
    <Chart options={options} series={series} type="bar" className="chart1" />
  )
}

export default ApexChart;