import React,{Component} from "react";
import Header from "../../common/header/header";

class Home extends Component{
    constructor(props) {
        super(props);

    }



    render() {

        return(
         <div>
             <Header defaultAccessToken={this.props.location.state.defaultAccessToken}/>

             <div>{this.props.location.state.accessToken}</div>


         </div>
        )
    }


}
export default Home;