import React, { Component } from 'react';
class TipoVinculacion extends Component {
    state = { tvin:['Empleador', 'Contratante', 'Cooperativa de trabajo asociado', 'Empleado'] };
    componentDidMount(){ }
    render() { 
        const tipoVin = this.props.tipoVin;
        return( 
            <div>
                <div className="row">
                    <div className="col-lg-12">
                        <h6 className="titul2">Tipo de vinculador laboral</h6><br></br>
                    </div>
                </div>
                <div className="row">   
                {
                    this.state.tvin.map((con, i) => {
                        return (
                            tipoVin===con ? (
                                <React.Fragment key={i}><div className="col-lg-3">{con}</div>
                                    <div className="col-lg-1">
                                    <input type="radio" checked className="form-control" name="TVinculacion" required defaultValue={tipoVin} ref={this.TipoVinculacion} value={con}/></div>
                                </React.Fragment> ) : (
                                <React.Fragment key={i}><div className="col-lg-3">{con}</div>
                                    <div className="col-lg-1">
                                    <input type="radio" className="form-control" name="TVinculacion" required defaultValue={tipoVin} ref={this.TipoVinculacion} value={con}/></div>
                                </React.Fragment>
                            )
                            )
                        })
                    }
                    <br/><br/>
                </div>
            </div>
        ) 
    }
}
export default TipoVinculacion;