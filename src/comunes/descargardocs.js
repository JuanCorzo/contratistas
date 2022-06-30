import React, { Component } from 'react';
import axios from 'axios'
import Global from '../Global'

const FileDownload = require('js-file-download');
class Descargardocs extends Component {
    handleDownload = async (e) => {
        //e.preventDefault();
        const docid = this.props.docid;
        const tipo = this.props.tipo;
        if(tipo==="responsable"){
            axios.get(Global.url + "responsables/"+docid, global.autentica).then(res => {
                let tidc = res.data;  
                axios({
                    url: (Global.url + 'documentosaportantes/downloadenla/'+docid),
                    method: 'GET', responseType: 'blob', // Important
                }).then((response) => {
                  FileDownload(response.data, tidc[0].res_documento);
                })
            });
        }
        else if(tipo==="factores")
        {
            axios.get(Global.url + "documentosaportantes/factoresdocs/"+docid, global.autentica).then(res => {
                let tidc = res.data;  
                console.log(tidc);
                axios({
                    url: (Global.url + 'documentosaportantes/downloadfaca/'+docid),
                    method: 'GET', responseType: 'blob', // Important
                }).then((response) => {
                  //console.log(response.data);
                  FileDownload(response.data, tidc[0].faa_documento);
                })
            });
        }
        else if(tipo==="transicion")
        {
            axios.get(Global.url + "documentosaportantes/transicionesdocs/"+docid, global.autentica).then(res => {
                let tidc = res.data;  
                axios({
                    url: (Global.url + 'documentosaportantes/downloadtran/'+docid),
                    method: 'GET', responseType: 'blob', // Important
                }).then((response) => {
                  //console.log(response.data);
                  FileDownload(response.data, tidc[0].tra_ruta);
                })
            });
        }
        else{
            axios.get(Global.url + "documentosaportantes/"+docid, global.autentica).then(res => {
                let tidc = res.data;
                axios({
                    url: (Global.url + 'documentosaportantes/descargaruno/'+docid),
                    method: 'GET', responseType: 'blob', // Important
                }).then((response) => {
                  FileDownload(response.data, tidc[0].apo_nombre);
                })
            });
        }
    }
    render() {
        return (
            <React.Fragment>
                <button className='xbackicon' style={{"border":"none", "font-size":"20px", "color": "#12337a"}} onClick={() => this.handleDownload()} download><i className="icon ion-document-text xbackicon"></i></button>
            </React.Fragment>
        )
    }
}
export default Descargardocs;
