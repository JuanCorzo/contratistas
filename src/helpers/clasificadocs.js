import React, { Component } from 'react';
import axios from 'axios';
import global from '../Global';
class Menus extends Component {
    state = { role:[] };
    componentDidMount(){ this.llenar(); }
    llenar = () => {
        axios.get(global.url + "clasificas", global.autentica)
        .then(res => {
            let role = res.data;
            this.setState({ role });
        });
    }
    render() { 
        return( 
            <div>
                <div className="row">
                    <div className="col-md-6 izqq">Clasificación documento</div>
                    <div className="col-md-6 derechas">
                        <select name="clas" className="form-control" required>
                            <option>Seleccione...</option>
                            {
                                this.state.role.map((arr, i) => {
                                return (
                                    <option key={i} value={arr.cld_nombre}>{arr.cld_nombre} </option> ) 
                                })
                            }
                        </select>
                    </div>
                </div>
            </div>
        ) 
    }
}
export default Menus;