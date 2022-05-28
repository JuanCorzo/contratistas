import React, { Component } from 'react';
import axios from 'axios';
import global from '../Global';
class Filtrap extends Component {
    state = { clap:[], estn:[], sect:[], tiad:[] };
    componentDidMount(){ this.llenar(); }
    llenar = () => {
        axios.get(global.url + "clasificacionesaportantes", global.autentica)
        .then(res => {
            let clap = res.data;
            this.setState({ clap });
        });
        axios.get(global.url + "estructuranomnina", global.autentica)
        .then(res => {
            let estn = res.data;
            this.setState({ estn });
        });
        axios.get(global.url + "sectores", global.autentica)
        .then(res => {
            let sect = res.data;
            this.setState({ sect });
        });
        axios.get(global.url + "tipoadscrita", global.autentica)
        .then(res => {
            let tiad = res.data;
            this.setState({ tiad });
        });

    }
    render() { 
        const valor1 = this.props.valor1;
        const valor2 = this.props.valor2;
        const valor3 = this.props.valor3;
        const valor4 = this.props.valor4;
        return( 
            <div>
                <div className="row">
                    <div className="col-lg-6 izqq">Clasificación aportantes</div>
                    <div className="col-md-6 derechas">
                        <select name="clap" className="form-control">
                            <option value="0">Seleccione...</option>
                            {
                                this.state.clap.map((arr, i) => {
                                return (
                                    arr.idclasificaaportantes===valor1 ? (
                                        <option key={i} value={arr.idclasificaaportantes} selected>{arr.cla_nombre} </option> ) 
                                        :(<option key={i} value={arr.idclasificaaportantes}>{arr.cla_nombre} </option> )
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 izqq">Estructura nómina</div>
                    <div className="col-md-6 derechas">
                        <select name="estn" className="form-control">
                            <option value="0">Seleccione...</option>
                            {
                                this.state.estn.map((arr, i) => {
                                return (
                                    arr.idestructuranomina===valor2 ? (
                                        <option key={i} value={arr.idestructuranomina} selected>{arr.est_nombre} </option> ) 
                                        :(<option key={i} value={arr.idestructuranomina}>{arr.est_nombre} </option> )
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 izqq">Sectores</div>
                    <div className="col-md-6 derechas">
                        <select name="sect" className="form-control">
                            <option value="0">Seleccione...</option>
                            {
                                this.state.sect.map((arr, i) => {
                                return (
                                    arr.idsectores===valor3 ? (
                                        <option key={i} value={arr.idsectores} selected>{arr.sec_nombre} </option> ) 
                                        :(<option key={i} value={arr.idsectores}>{arr.sec_nombre} </option> )
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 izqq">Tipo entidad</div>
                    <div className="col-md-6 derechas">
                        <select name="tiad" className="form-control">
                            <option value="0">Seleccione...</option>
                            {
                                this.state.tiad.map((arr, i) => {
                                return (
                                    arr.idtipoadscrita===valor4 ? (
                                        <option key={i} value={arr.idtipoadscrita} selected>{arr.tad_descripcion} </option> ) 
                                        :(<option key={i} value={arr.idtipoadscrita}>{arr.tad_descripcion} </option> )
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
export default Filtrap;