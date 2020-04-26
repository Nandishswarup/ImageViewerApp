import React, { Component } from 'react'
import './header.css';
import SearchIcon from '@material-ui/icons/Search';
import {Avatar} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles({
    underline: {
        "&&&:before": {
            borderBottom: "none"
        },
        "&&:after": {
            borderBottom: "none"
        }
    }
});


class Header extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (

            <div>
                <header className="app-header">

                     <span className="app-title">
                         Image Viewer
                     </span>

                    <div className="searchContainer">
                        <SearchIcon/>

                        <TextField className="searchinput" placeholder="Search" onChange={this.props.onChanged} InputProps={{ disableUnderline: true }}
                        />
                    </div>
                    <div className="avatar" onClick={this.props.onClicked}>
                        <Avatar alt="P" src="https://upload.wikimedia.org/wikipedia/en/e/e7/5-cube_solved_close.png"/>
                    </div>


                </header>
            </div>
        )
    }
}

export default Header;