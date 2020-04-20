import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from "./screens/Login/Login"
import Home from "./screens/Home/home"

class Controller extends Component {

    constructor()
    {
        super();
        this.baseUrl = "";
    }
    render(){
        return(
            <Router>
                <div>
                    <Route exact path='/' component={Login}  />
                    <Route exact path='/home' component={Home} />
                </div>
            </Router>


        )
    }
}

export default Controller;
