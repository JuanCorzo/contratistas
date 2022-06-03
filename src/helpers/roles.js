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
        var col = this.props.col || 3;
        return( 
            <div className={`col-md-${(col)} col-input-style`}>
                <label>Nombre de rol</label>
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
        ) 
    }
}
export default Roles;