import React, {Component} from 'react'
import './header.css';
import SearchIcon from '@material-ui/icons/Search';
import {Avatar} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from "@material-ui/core/styles";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, {bindTrigger, bindMenu} from 'material-ui-popup-state';
import Button from '@material-ui/core/Button';


class Header extends Component {

    constructor(props) {

        super(props);
        this.state = {
            isUserLoggedIn: "dispNone",
        }


    }

    componentWillReceiveProps(props) {
        this.setState({isUserLoggedIn: this.props.value})
    }

    componentDidMount() {
        console.log(this.props.value)
    }


    returnDiv(value, profileImage) {
        if (value === "true")
            return (

                <div className="container-search-avatar">
                    <div className="searchContainer">
                        <SearchIcon/>

                        <TextField className="searchinput" placeholder="Search" onChange={this.props.onChanged}
                                   InputProps={{disableUnderline: true}}
                        />
                    </div>

                    <PopupState variant="popover" popupId="demo-popup-menu">
                        {(popupState) => (
                            <React.Fragment>
                                <div className="avatar"  {...bindTrigger(popupState)}>
                                    <Avatar alt="P"
                                            src={profileImage}/>
                                </div>
                                <Menu {...bindMenu(popupState)} style={{marginTop: 45}}>
                                    <MenuItem onClick={this.props.onMyProfileClickHandler}>My Profile</MenuItem>
                                    <MenuItem onClick={this.props.onLogoutClickHandler}>Logout</MenuItem>
                                </Menu>
                            </React.Fragment>
                        )}
                    </PopupState>

                </div>
            );
        if (value == "profile")
            return (

                <div className="container-search-avatar">

                    <PopupState variant="popover" popupId="demo-popup-menu">
                        {(popupState) => (
                            <React.Fragment>
                                <div className="avatar"  {...bindTrigger(popupState)}>
                                    <Avatar alt="P"
                                            src={profileImage}
                                            style={{backgroundColor: "red", borderColor: "red", borderWidth: 2}}/>
                                </div>
                                <Menu {...bindMenu(popupState)}>
                                    <MenuItem onClick={this.props.onLogoutClickHandler}>Logout</MenuItem>
                                </Menu>
                            </React.Fragment>
                        )}
                    </PopupState>

                </div>
            );

    }

    render() {

        /*className={this.state.isUserLoggedIn}*/
        return (

            <div>

                <header className="app-header">

                     <span className="app-title">
                         Image Viewer
                     </span>
                    {this.returnDiv(this.props.isUserLoggedIn, this.props.profilePicture)}

                </header>
            </div>
        )
    }
}

export default Header;