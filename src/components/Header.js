import React, { useState } from 'react';
import {Button, Form, Col} from 'react-bootstrap'
import {useHistory, useParams, Link} from 'react-router-dom';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import './Charts.css'

function Header(props) {

    const history = useHistory();

    const [form, setForm] = useState({
        newValue: ''
    });

    const [country, setCountry] = useState();

    // select country
    const selectCountry = (val)=>{
        // this.setState({ country: val });
        // e.preventDefault();
        
        // const val = form.newValue;
        
        if(val) 
        {
            setCountry(val)
            history.push(`/country/${country}`);
        }     
      }

    //   Storing change or new value
    const onchange = e =>{
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    };

    // process operation by clicking on submit
    const onsubmit = e =>{

        e.preventDefault();

        const val = form.newValue;
        history.push(`/country/${val}`);       

    };  
    // <Form.Control type="text" placeholder="Enter country OR Code" name="newValue" value={form.newValue} onChange={onchange} required />
    // <CountryDropdown className="form-control"
    // onChange={(e)=>{selectCountry(e)}} />
    return (
        <div className="header">
            <div className="headerFirst">
            <Link to="/"><p>COVID-19 </p></Link>
            <p>Statistics.</p>
            </div>

            <div className="headerSec">
                <div className="headerSec1">
                <Link to="/"><Button variant="outline-info">Worldwide</Button></Link>
                </div>
                <div className="headerSec1">
                <Form onSubmit={onsubmit}>
                 <Form.Control type="text" placeholder="Enter country OR Code" name="newValue" value={form.newValue} onChange={onchange} autoComplete="OFF" required />
                </Form>
                </div>
                </div>

        </div>
    );
}

export default Header;