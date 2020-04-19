import React, {Component} from 'react';
import './header.css';
import {Avatar} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

class Header extends Component {
    render() {
        return (

            <div>

                <header className="app-header">

                     <span className="app-title">
                         Image Viewer
                     </span>

                    <div className="searchContainer">
                        <SearchIcon/>
                        <input className="searchinput" placeholder="Search"/>
                    </div>
                    <div className="avatar">
                        <Avatar alt="P" src="https://upload.wikimedia.org/wikipedia/en/e/e7/5-cube_solved_close.png"/>

                    </div>


                </header>
            </div>
        )
    }
}

export default Header;