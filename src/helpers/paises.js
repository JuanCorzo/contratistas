import React, { Component } from 'react';
import axios from 'axios';
import global from '../Global';
class Paises extends Component {
    state = { role:[] };
    componentDidMount(){ this.llenar(); }
    llenar = () => {
        axios.get(global.url + "paises", global.autentica)
        .then(res => {
            let role = res.data;
            role =  role.map( (p) => { p['id'] = p.idpaises; p[`nombre`] = p.pai_nombre; return p; });
            this.setState({ role });
        });
    }
    render() { 
        const valor = this.props.valor;
        var col = this.props.col || 3;
        return( 
                <div className={`col-lg-${(col)} col-input-style`}>
                        <label>País</label>
                        <select name="idpais" className="form-control" required>
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
export default Paises;