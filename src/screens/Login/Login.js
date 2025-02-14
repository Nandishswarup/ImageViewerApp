import React, {Component} from 'react';
import './Login.css';
import Header from './../../common/header/header'
import { Card } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import { Button } from '@material-ui/core';
import { FormHelperText } from '@material-ui/core';

class Login extends Component {
        constructor(props) {
            super(props);
            this.loginHandler = this.loginHandler.bind(this)

            this.state = {
                username:"",
                password:"",
                usernameRequired: "dispNone",
                passwordRequired: "dispNone",
                defaultAccessToken: "8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784",
                isUserLoggedIn:"dispNone",


            }

        }


    render() {
       return(
           <div>
               <Header defaultAccessToken={this.state.defaultAccessToken}/>

               <Card className="containercard">
                       <div >
                           <div className="loginHeading">LOGIN</div>
                           <FormControl required>
                               <InputLabel htmlFor="username">Username</InputLabel>
                               <Input id="username" type="text" onChange={this.usernameOnchange}/>

                               <FormHelperText className={this.state.usernameRequired}>
                                   <span className="red">required</span>
                               </FormHelperText>

                           </FormControl>
                           < br /><br />

                           <FormControl required>
                               <InputLabel htmlFor="password">Password</InputLabel>
                               <Input id="password" type="password" onChange={this.passwordOnChangeListener}/>
                               <FormHelperText className={this.state.passwordRequired}>
                                   <span className="red">required</span>
                               </FormHelperText>
                           </FormControl>
                          < br /><br />
                           <Button variant="contained" color="primary" onClick={this.loginHandler}>LOGIN</Button>
                       </div>
               </Card>

           </div>
       )
    }





    loginHandler= (event) => {
        this.state.username === "" ? this.setState({ usernameRequired: "dispBlock" }) : this.setState({ usernameRequired: "dispNone" });
        this.state.password === "" ? this.setState({ passwordRequired: "dispBlock" }) : this.setState({ passwordRequired: "dispNone" });

        if(this.state.username=="nandish" && this.state.password=="241192")
        {
            sessionStorage.setItem('access-token',this.state.defaultAccessToken);

            this.props.history.push({
                pathname:"/home",
                state:{
                    defaultAccessToken:this.state.defaultAccessToken

                }
            })
        }



    }
    usernameOnchange=(e)=>
    {
        this.setState({username:e.target.value})
    }
    passwordOnChangeListener=(e)=>
    {
        this.setState({password:e.target.value})
    }
}

export default Login;