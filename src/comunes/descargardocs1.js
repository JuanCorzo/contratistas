import React, { Component } from 'react';
import axios from 'axios'
import Global from '../Global'

const FileDownload = require('js-file-download');
const filename='reporte.xlsx'
class Descargardocs1 extends Component {
    handleDownload = async () => {
        axios({
            url: (Global.url +'documentosaportantes/descargardos'),
            method: 'GET',
            responseType: 'blob', // Important
          }).then((response) => {
              FileDownload(response.data, filename);
          })
    }
    render() {
        return (
            <React.Fragment>
                <button className="btn btn-success" onClick={() => this.handleDownload()} download>Descargar</button>
            </React.Fragment>
        )
    }
}
export default Descargardocs1;