import React, { Component } from 'react';
import axios from 'axios';
import global from '../Global';
class Sedes extends Component {
    state = { role:[] };
    componentDidMount(){ this.llenar(); }
    llenar = () => {
        axios.get(global.url + "sedes", global.autentica)
        .then(res => {
            let role = res.data;
            this.setState({ role });
        });
    }
    render() { 
        return( 
            <div>
                <div className="row">
                    <div className="col-md-6 izqq">Sedes ESAP</div>
                    <div className="col-md-6 derechas">
                        <select name="Sede" className="form-control">
                            <option value="">Seleccione...</option>
                            {
                                this.state.role.map((arr, i) => {
                                return (
                                    <option key={i} value={arr.idsedes}>{arr.sed_nombre} </option> ) 
                                })
                            }
                        </select>
                    </div>
                </div>
            </div>
        ) 
    }
}
export default Sedes;