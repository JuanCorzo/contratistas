import React, { Component } from 'react';
import axios from 'axios';
import global from '../Global';
class Roles extends Component {
    state = { role:[] };
    componentDidMount(){ this.llenar(); }
    
    llenar = () => {
        axios.get(global.url + "roles", global.autentica)
        .then(res => {
            let role = res.data;
            role =  role.map( (p) => { p['id'] = p.idroles; p[`nombre`] = p.rol_nombre; return p; });
            this.setState({ role });
        });
    }
    render() { 
        const valor = this.props.valor;
        return( 
            <div>
                <div className="row">
                    <div className="col-md-6 izqq">Nombre de rol</div>
                    <div className="col-md-6 derechas">
                        <select name="irol" className="form-control" required>
                            <option>Seleccione...</option>
                            {
                                this.state.role.map((arr, i) => {
                                return (
                                    arr.id===valor ? (
                                        <option key={i} value={arr.id} selected>{arr.nombre} </option> ) 
                                        :(<option key={i} value={arr.id}>{arr.nombre} </option> )
                                    )
                                })
                            }
                        </select>

                    </div>
                </div>
            </div>
        ) 
    }
}
export default Roles;