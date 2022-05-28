import React, { Component } from 'react';
import axios from 'axios';
import global from '../Global';
import swal from 'sweetalert';
import Fila from '../comunes/fila';
import TipoDocs from './tipodocumentos';

class Docsportantes extends Component {
    state = { file: null, aport: 0}               
    handleSubmitFile = () => {
        if (this.state.file !== null) {
            let formData = new FormData();
            formData.append('docs_aportantes', this.state.file);
            formData.append('apo_fecha', document.forma.Fecha.value);
            formData.append('apo_version', 1);
            formData.append('tiposdocumentos_idtiposdocumentos', document.forma.TiDoc.value);
            formData.append('aportantes_idaportantes', this.props.aport);
            axios.post(global.url+"documentosaportantes/subiruno",formData,
            { headers: { "Content-type": "multipart/form-data;"}}
            ).then(res => { 
                swal("Documento cargado", "Se ha cargado correctamente el documento", "success");
            })
            .catch(err => {
                swal("Error de carga", "Error al cargar el documento", "error");
            })
        }
    }
    handleImagePreview = (e) => {
        this.setState({
            file: e.target.files[0]
        })
    }
    render() {
        const nombre = this.props.nombre;
        return (
            <React.Fragment>
                <br /><br />
                <TipoDocs/>
                <Fila nombre="Fecha documento" refer="Fecha" tipo="7" arreglo="" />
                <div className="row">
                    <div className="col-md-6 izqq">{nombre}</div>
                    <div className="col-md-6 derechas">
                    <input type="file" className="form-control" onChange={this.handleImagePreview} name="docs_aportantes"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-5 izqq">
                    </div>
                    <div className="col-md-7 derechas"><br></br>
                    <input type="submit" className="btn btn-info pd-x-20" onClick={this.handleSubmitFile} value="Guardar" />
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default Docsportantes;
