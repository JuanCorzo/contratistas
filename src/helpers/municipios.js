import React, { Component } from 'react';
import axios from 'axios';
import global from '../Global';
class Roles extends Component {
    state = { ciud:[], dept:[] };
    componentDidMount(){ this.llenar(); }
    llenar = () => {
        axios.get(global.url + "departamentos", global.autentica)
        .then(res => {
            let dept = res.data;
            this.setState({ dept });
        });
        axios.get(global.url + "ciudades", global.autentica)
        .then(res => {
            let ciud = res.data;
            this.setState({ ciud });
        });
    }
    cambiodep = () =>
    {
        const iddep = document.forma.Departamento.value;
        axios.get(global.url+"ciudades/departamento/"+ iddep, global.autentica)
        .then(res => {
            const ciud = res.data;
            this.setState({ ciud });
        });
    }
    render() { 
        const valor = this.props.valor;
        const col1 = this.props.col1 || 12;
        const col2 = this.props.col2 ||12;
        return( 
            <div>
                <div className="row">
                    <div className={`col-md-${(col1)} col-input-style`}>
                        <label>Departamento</label>
                        <select name="Departamento" onChange={this.cambiodep} className="form-control">
                            <option>Seleccione...</option>
                            {
                                this.state.dept.map((arr, i) => {
                                return (
                                    <option key={i} value={arr.iddepartamentos}>{arr.dep_nombre} </option>  
                                )
                            }
                            )}
                        </select>
                    </div>
                    <div className={`col-md-${(col2)} col-input-style`}>
                        <label>Municipio</label>
                        <select name="Municipio" className="form-control" required>
                            <option>Seleccione...</option>
                            {
                                this.state.ciud.map((arr, i) => {
                                return (
                                    arr.idciudades===valor ? (
                                        <option key={i} value={arr.idciudades} selected>{arr.ciu_nombre} </option> ) 
                                        :(<option key={i} value={arr.idciudades}>{arr.ciu_nombre} </option> )
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