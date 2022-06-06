import React, { Component } from 'react';
import axios from 'axios';
import global from '../Global';
class Territorial extends Component {
    state = { role:[] };
    componentDidMount(){ this.llenar(); }
    llenar = () => {
        axios.get(global.url + "aportantes//terri", global.autentica)
        .then(res => {
            let role = res.data;
            role =  role.map( (p) => { p['id'] = p.idterritorial; p[`nombre`] = p.ter_nombre; return p; });
            this.setState({ role });
        });
    }
    render() { 
        const valor = this.props.valor;
        let col = this.props.col || 12;
        return( 
            <div className={`col-md-${(col)} col-input-style`}>
                <label>Nombre de territorial</label>
                <select name="idterritorial" className="form-control" required>
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
export default Territorial;