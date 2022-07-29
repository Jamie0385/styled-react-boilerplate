import React, { Suspense, useEffect, useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import '../public/css/Footer-Dark.css';
import '../public/css/Navigation-Clean.css';
import '../public/css/styles.css';
import '../public/bootstrap/css/bootstrap.min.css';
import '../public/fonts/fontawesome-all.min.css';
import '../public/bootstrap/js/bootstrap.min.js';
import { Presale } from './container/presale';
import axios from 'axios';
import { createChart } from 'lightweight-charts';
import moment from 'moment';

// Import assets
import 'modern-normalize/modern-normalize.css';

// Import Components
const API_URL = "https://restapi.nftscan.com/api/v2/statistics/collection/trending/0xED5AF388653567Af2F388E6224dC7C4b3241C544?time=30d"
const API_KEY = "y3MDOFDL"
// Main page
const App = () => {
  useEffect(() => {
    async function fetchData() {
      const chart = createChart('chart_view', { width: 800, height: 300 });
      const lineSeries = chart.addLineSeries();
      const res = await axios.get(API_URL, {
        headers: {
          'X-API-KEY': API_KEY
        }
      });
      const trendData = res.data.data;
      let output = []
      trendData.forEach(element => {
        const date = moment(element.begin_timestamp).format("YYYY-MM-DD");
        output.push({ time: date, value: element.average_price })
      });
      console.log(output);
      lineSeries.setData(output);
    }

    fetchData()
  }, [])

  return (
    <div className="d-flex justify-content-center container align-items-center" style={{ height: '600px' }} id="chart_view">
    </div>
    // <Suspense fallback={<div>Loading...</div>}>
    // <Presale />
    // </Suspense>
  );
};

export default App;
