import React, {Component} from 'react';
import './home.css';
import Header from '../common/header/header'
class Home extends Component {

    render() {
       return(
           <div>
               <Header/>
               <div className="card">

                      {/* <div className="containercard">
                           <h4><b>John Doe</b></h4>
                           <p>Architect & Engineer</p>
                       </div>*/}
               </div>


           </div>
       )
    }
}

export default Home;