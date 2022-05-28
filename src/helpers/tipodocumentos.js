import React, { Component } from 'react';
import axios from 'axios';
import global from '../Global';
class tiposDocumentos extends Component {
    state = { role:[] };
    componentDidMount(){ this.llenar(); }
    llenar = () => {
        axios.get(global.url + "tiposdocumentos", global.autentica)
        .then(res => {
            let role = res.data;
            this.setState({ role });
        });
    }
    render() { 
        return( 
            <div>
                <div className="row">
                    <div className="col-md-6 izqq">Tipos de documentos</div>
                    <div className="col-md-6 derechas">
                        <select name="TiDoc" className="form-control" required>
                            <option>Seleccione...</option>
                            {
                                this.state.role.map((arr, i) => {
                                return (
                                    <option key={i} value={arr.idtiposdocumentos}>{arr.tid_clasifica} - {arr.tid_nombre} </option> ) 
                                })
                            }
                        </select>
                    </div>
                </div>
            </div>
        ) 
    }
}
export default tiposDocumentos;