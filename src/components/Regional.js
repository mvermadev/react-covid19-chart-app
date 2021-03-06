import React,{useState, useEffect} from 'react';
import {Doughnut, Polar, Bar} from 'react-chartjs-2'
import {useParams, useHistory} from 'react-router-dom'
import NumberFormat from 'react-number-format'

function Regional(props) {

    const history = useHistory();
    const {countryName} = useParams();
    const [covidData, setCovidData] = useState({
        cases : '',
        recover : '',
        death : '',
        todayCases:'',
        critical: '',
        todayDeath : '',
        flag: '',
        countryFullName: '',
        continents: 'a',
        loading : true
    })
    // const [cases, setCases] = useState();
    // const [recover, setRecover] = useState();
    // const [death, setDeath] = useState();
    // const [loading, setLoading] =useState(true);

    const result = ''

    useEffect(()=>{
        var url = `https://corona.lmao.ninja/v2/countries/${countryName}`
        fetch(url)
        .then(res=>res.json())
        .then((data)=>{
            // setCases(data.confirmed.value)
            // setRecover(data.recovered.value)
            // setDeath(data.deaths.value)
                
            setCovidData({ cases: data.cases,
                    recover: data.recovered,
                    death: data.deaths,
                    todayCases: data.todayCases,
                    critical: data.critical,
                    todayDeath: data.todayDeaths,
                    flag: data.countryInfo.flag,
                    countryFullName: data.country,
                    continents: data.continent,
                    loading: false})
        })
        .catch(err=>console.log(err));

    });

    const [latestCovidData, setLatestCovidData] = useState({
        cases : '',
        recover : '-',
        death : ''
    })

    const data = {
        labels: ['Confirmed', 'Recovered', 'Deaths'],
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
            text: `${covidData.countryFullName}`
        }
    }

    return(
        <div className="chartsHead">
            {covidData.loading || !covidData.cases ? (
                <p style={{textAlign:'center'}}>Stay Home...</p>
            ): (
                <div>

                <ShowFlag 
                    imgSrc={covidData.flag}
                    fullName={covidData.countryFullName}
                />

                <Cards 
                    globTodayCases={covidData.todayCases} 
                    globTodayRecover={covidData.todayRecover} 
                    globTodayDeath={covidData.todayDeath}
                    globConfirm={covidData.cases}
                    globCritical={covidData.critical}
                    globDeath={covidData.death}
                    globRecover={covidData.recover}
                    globContinent={covidData.continents}
                />
                <div className="charts">
                    <div className="chart">
                    <Doughnut data={data} options={options}></Doughnut>
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


function Cards(props){

    return (
        <div>
        
        <div className="cards">
            <div className="card">
                <div>
                <h6>Total Confirmed</h6>
                <h5><NumberFormat value={props.globConfirm} displayType={'text'} thousandSeparator={true} renderText={value => <div>{value}</div>} /></h5>
                </div>
                <div>
                <h6>Today</h6>
                <h5><NumberFormat value={props.globTodayCases} displayType={'text'} thousandSeparator={true} renderText={value => <div>{value}</div>} /></h5>
                </div>
            </div>
            <div className="card">
                <div>
                <h6>Total Recovered</h6>
                <h5><NumberFormat value={props.globRecover} displayType={'text'} thousandSeparator={true} renderText={value => <div>{value}</div>} /></h5>
                </div>
            </div>
    </div>
        
        <div className="cards1">
            <div className="card">
                <div>
                <h6>Total Deaths</h6>
                <h5><NumberFormat value={props.globDeath} displayType={'text'} thousandSeparator={true} renderText={value => <div>{value}</div>} /></h5>
                </div>
                <div>
                <h6>Today</h6>
                <h5><NumberFormat value={props.globTodayDeath} displayType={'text'} thousandSeparator={true} renderText={value => <div>{value}</div>} /></h5>
                </div>
            </div>
            <div className="card">
                <div>
                <h6>Critical</h6>
                <h5><NumberFormat value={props.globCritical} displayType={'text'} thousandSeparator={true} renderText={value => <div>{value}</div>} /></h5>
                </div>    
                <div>
                <h6>Continent</h6>
                <h5>{props.globContinent}</h5>
                </div>    
            </div>
        </div>
        <p style={{textAlign: 'center', fontSize: '13px', opacity:0.7, marginTop: '5px'}}>"Today's" data will update constantly.</p>
    </div>
    )
}

function ShowFlag(props){
    return(
        <div className="showFlag">
            <div>
            <img src={props.imgSrc} alt="flag image" />
            </div>
            <div>
                <p>Statistics of {props.fullName}</p>
            </div>
        </div>
    )
}

export default Regional;