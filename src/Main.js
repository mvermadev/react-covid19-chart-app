import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Charts from './components/Charts';
import Header from './components/Header';
import Regional from './components/Regional';
import Footer from './components/Footer';

function Main(props) {
    return (
        <Router>
            <Header/>
            <Switch>
                <Route path="/" exact component={Charts} />
                <Route path="/country/:countryName" component={Regional} />
            </Switch>
            <Footer/>
        </Router>
      );
}


export default Main;