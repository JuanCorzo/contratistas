import React, { Component } from 'react';
import axios from 'axios';
import global from '../Global';
class Roles extends Component {
    Departamento = React.createRef(); 
    state = { tab1:[], dep:[] };
    componentDidMount(){ this.llenar(); }
    llenar = () => {
        axios.get(global.url + "departamentos", global.autentica)
        .then(res => {
            let dep = res.data;
            dep =  dep.map( (p) => { p['id'] = p.iddepartamentos; p[`nombre`] = p.dep_nombre; return p; });
            this.setState({ dep });
        });
    }
    llenamun = () =>{
        const iddep = document.forma.Departamento.value;
        axios.get(global.url+"ciudades/departamento/"+ iddep, global.autentica)
        .then(res => {
            const tabl = res.data;
            this.setState({ tabl });
        });
    }
    render() { 
        const valor = this.props.valor;
        var col = this.props.col || 3;
        return( 
            <React.Fragment>
                <div className={`col-md-${(col)} col-input-style`}>
                        <label>Departamento</label>
                        <select name="Departamento" ref={this.Departamento} onChange={this.llenamun} className="form-control" required>
                            <option>Seleccione...</option>
                            {
                                this.state.dep.map((arr, i) => {
                                return (
                                    arr.id===valor ? (
                                        <option key={i} value={arr.id} selected>{arr.nombre} </option> ) 
                                        :(<option key={i} value={arr.id}>{arr.nombre} </option> )
                                    )
                                })
                            }
                        </select>
                </div>
                <div className="row"><div className="clo-md-5">&nbsp;</div></div>
            </React.Fragment>
        ) 
    }
}
export default Roles;