import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Header from './Header';
import Menulat from './Menulat';
import Footer from './Footer';
import Titulo from '../comunes/Titulo';

const cookies = new Cookies(); 
class navigate extends Component {
    state = { rols:[], status: null, dato:"" };
    componentDidMount() {
    }
    render() {
        if(cookies.get("destino")){
            console.log(cookies.get("destino"))
            
            //return <Redirect to={cookies.get("destino")}/>;
        }
        return (<div>navigate
                <Header></Header>
                <Menulat></Menulat>
                <Titulo titulo="Registro eliminado"/>
                <div className="am-mainpanel">
                    <div style={{"text-align":"Center"}}>
                    <br></br>
                    <h4>Se ha eliminado el registro<br></br><br></br>
                    <NavLink style={{width:"140px"}} className="btn btn-primary pd-x-20" to={cookies.get("destino")}>Aceptar</NavLink>
                    </h4>
                    </div>
                </div>
                <Footer></Footer>
        </div>)
    }
}
export default navigate;

