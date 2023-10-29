import React, { useEffect, useState } from "react";
import HighChartsStock from "../../components/HighCharts";
import axios from "axios";
const DOMAIN = process.env.REACT_APP_DOMAIN;
const KEY = process.env.REACT_APP_KEY;
const BieuDoCotRange = () => {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    // Gọi API từ Polygon.io và cập nhật state stockData
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${DOMAIN}/query?function=TIME_SERIES_DAILY&symbol=IBM&outputsize=full&apikey=${KEY}`
      );
      console.log("res", res);
      setStockData(res.data["Time Series (Daily)"]);
      // const res = await axios.get(
      //   "https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/new-intraday.json"
      // );
      // setStockData(res.data);
    } catch (error) {}
  };

  const dataArrayWithKeys = Object.entries(stockData);

  // Sử dụng map để chuyển đổi mỗi đối tượng thành một mảng giá trị
  const resultArray = dataArrayWithKeys.map(([timestamp, values]) => {
    return [
      new Date(timestamp).getTime(), // Convert timestamp to milliseconds
      parseFloat(values["2. high"]),
      parseFloat(values["3. low"]),
    ];
  });

  resultArray.sort((a, b) => a[0] - b[0]);

  const options = {
    title: {
      text: "Biểu đồ phân tích chứng khoán dạng phạm vi cột",
    },
    chart: {
      type: "columnrange",
    },
    xAxis: {
      type: "datetime",
    },
    yAxis: {
      title: {
        text: "Giá trị",
      },
    },

    rangeSelector: {
      selected: 2,
    },

    series: [
      {
        name: "AAPL",
        data: resultArray,
      },
    ],

    tooltip: {
      valueSuffix: "°C",
    },
  };

  // console.log(resultArray);
  return (
    <div className="App">
      <HighChartsStock options={options} />
    </div>
  );
};

export default BieuDoCotRange;
