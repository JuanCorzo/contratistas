import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import global from '../../../Global';
import { Redirect } from 'react-router-dom';
const cookies = new Cookies(); 

class descarga_txt extends Component {
    state = { tabe:[], tabe1:"", status: null };
    componentDidMount() {
        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        const separator='-';
        var datae= `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
        axios.get(global.url + "aportantes/filtros/1,3/0/1/0/0", global.autentica ).then((res) => {
            var tabe1 = res.data;
            var n = 0; 
            for (var i=0; i<tabe1.length; i++) {
            }
            n=i+1;
            this.setState({ tabe1: n });
          }); 
  
        axios.get(global.url + "aportantes/filtros/1,3/0/1/0/0", global.autentica ).then((res) => {
            var tabe = res.data;
            this.setState({ tabe });
            console.log(tabe);
            var exporte = "1|NI|899999054|"+datae+"|"+this.state.tabe1+"<br><br>";
            for (var i=0; i<tabe.length; i++) {
                var p=i+2;
                exporte += p + "|NI|"+tabe[i].apo_identificacion+"<br><br>";
            }
            document.getElementById("mensa").innerHTML = exporte;

        }); 
    }
    render() {
        if(!cookies.get("idroles")){ return <Redirect to="./"/>; }
        return (
            <div id="mensa"></div>
        )
    }
}
export default descarga_txt;