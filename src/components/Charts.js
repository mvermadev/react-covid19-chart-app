import React, { useState, useEffect } from 'react';
import {Doughnut, Bar, Polar} from 'react-chartjs-2'
import './Charts.css'


var globConfirm = '';
var globRecover = '';
var globDeath = '';

function Charts(){
    
    const [covidData, setCovidData] = useState({
        cases : '',
        recover : '',
        death : '',
        loading : true
    })

    // const [cases, setCases] = useState();
    // const [recover, setRecover] = useState();
    // const [death, setDeath] = useState();
    // const [loading, setLoading] =useState(true);

    const result = ''

    useEffect(()=>{
        const url = 'https://covid19.mathdro.id/api'
        fetch(url)
        .then(res=>res.json())
        .then((data)=>{
            // setCases(data.confirmed.value)
            // setRecover(data.recovered.value)
            // setDeath(data.deaths.value)
            setCovidData({ cases: data.confirmed.value,
                           recover: data.recovered.value,
                           death: data.deaths.value,
                            loading: false})
        })
        .catch(err=>console.log(err))
    });

    const data = {
        labels: ['Confiremed', 'Recovered', 'Deaths'],
        datasets: [
            {
                label: '',
                data: [covidData.cases, covidData.recover, covidData.death],
                backgroundColor: [
                    'rgba(245, 213, 142)',
                    'rgba(142, 245, 180)',
                    'rgba(245, 142, 142)',
                    
                ],
                borderColor: [
                    'rgba(191, 131, 0)',
                    'rgba(9, 186, 0)',
                    'rgba(168, 0, 0)',
                  
                ],
            }
        ]
    }

    const options = {
        title:{
            display: true,
            text: 'Worldwide Data'
        }
    }

    globConfirm = covidData.cases
    globRecover = covidData.recover
    globDeath = covidData.death

    return(
        <div className="chartsHead">
            {covidData.loading || !covidData.cases ? (
                <p>Loading...</p>
            ): (
                <div>
                <Cards/>
                <div className="charts">
                    <div className="chart">
                    <Doughnut data={data} options={options}></Doughnut>
                    </div>
                    <div className="chart">
                    <Polar data={data} options={options}></Polar>
                    </div>
                    <div className="chart">
                    <Bar data={data} options={options}></Bar>
                    </div>
                </div>
                </div>
            )}

            

        </div>
    )
}


function Cards(){
    return (
        <div className="cards">
            <div className="card">
                <h6>Confirmed</h6>
                <h5>{globConfirm}</h5>
            </div>
            <div className="card">
                <h6>Recovered</h6>
                <h5>{globRecover}</h5>
            </div>
            <div className="card">
                <h6>Deaths</h6>
                <h5>{globDeath}</h5>
            </div>
        </div>
    )
}

export default Charts;