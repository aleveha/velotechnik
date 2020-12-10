import React from 'react';
import './css/App.css';
import {BrowserRouter as Router, Redirect, Switch, Route} from 'react-router-dom';
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import StartPage from "./components/pages/StartPage";
import Booking from "./components/pages/Booking";
import BookingPage from './components/pages/BookingPage';

function App() {
    return (
        <div className="App">
            <Router>
                <Header />
                <div className="mainContent">
                    <Switch>
                        <Route path="/home" component={StartPage}/>
                        <Route path="/booking" component={BookingPage}/>
                        <Route path="/contacts"/>
                        <Route path="/services"/>
                        <Route path="/photos"/>
                        <Redirect to="/home" from="/"/>
                    </Switch>
                </div>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
