import React, { Component } from 'react';
import axios from 'axios';
import global from '../Global';
class DepMunicipio2 extends Component {
    Departamento = React.createRef(); 
    state = { dept:[], ciud:[] };
    componentDidMount(){ this.llenar(); }
    llenar = () => {
        axios.get(global.url + "departamentos", global.autentica)
        .then(res => {
            let dept = res.data;
            dept =  dept.map( (p) => { p['id'] = p.iddepartamentos; p[`nombre`] = p.dep_nombre; return p; });
            this.setState({ dept });
            this.llenamun();
        });
    }
    llenamun = () =>{
        const iddep = this.Departamento.current.value;
        axios.get(global.url+"ciudades/departamento/"+ iddep, global.autentica)
        .then(res => {
            const ciud = res.data;
            this.setState({ ciud });
        });
    }
    render() { 
        const idciudades = this.props.idciudades;
        const iddepartamentos = this.props.iddepartamentos;
        return( 
            <React.Fragment>
                <div className="col-lg-4">
                <select className="form-control" defaultValue={iddepartamentos} ref={this.Departamento} 
                name="depa" onChange={this.llenamun} required>
                    <option vaule="0">Departamento</option>
                    {
                            this.state.dept.map((con, i) => {
                            return (
                                iddepartamentos===con.iddepartamentos ? (
                                    <option key={i} value={con.iddepartamentos} selected>{con.dep_nombre} </option> ) 
                                    :(<option key={i} value={con.iddepartamentos}>{con.dep_nombre} </option> )
                                )
                            })
                        }
                </select>
                </div>
                <div className="col-lg-4">
                <select className="form-control" defaultValue={idciudades} ref="Municipio" name="ciud" required>
                    <option vaule="0">Municipio</option>
                    {
                            this.state.ciud.map((con, i) => {
                            return (
                                idciudades===con.idciudades ? (
                                    <option key={i} value={con.idciudades} selected>{con.ciu_nombre} </option> ) 
                                    :(<option key={i} value={con.idciudades}>{con.ciu_nombre} </option> )
                                )
                            })
                        }
                </select>
                </div>
            </React.Fragment>
        ) 
    }
}
export default DepMunicipio2;