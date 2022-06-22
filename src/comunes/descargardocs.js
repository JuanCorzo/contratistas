import React, { Component } from 'react';
import axios from 'axios'
import Global from '../Global'

const FileDownload = require('js-file-download');
class Descargardocs extends Component {
    handleDownload = async (e) => {
        e.preventDefault();
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
