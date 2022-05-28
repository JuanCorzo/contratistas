import React, { Component } from 'react';
class TipoVincluacionL extends Component {
    state = { tvil:['Planta', 'Misión', 'Cooperado', 'Estudiante/Aprendíz', 'Independiente'] };
    componentDidMount(){ }
    render() { 
        const tipoVincL = this.props.tipoVincL;
        const TipoVinculacion = this.props.TipoVinculacion;
        return( 
            <React.Fragment>
                {
                    this.state.tvil.map((con, i) => {
                        return (
                            tipoVincL===con ? (
                                <React.Fragment key={i}><div className="col-lg-3">{con}</div>
                                    <div className="col-lg-1">
                                    <input type="radio" checked className="form-control" name="Tvinculacion2" required defaultValue={tipoVincL} ref={TipoVinculacion} value={con}/></div>
                                </React.Fragment> ) : (
                                <React.Fragment key={i}><div className="col-lg-3">{con}</div>
                                    <div className="col-lg-1">
                                    <input type="radio" className="form-control" name="Tvinculacion2" required defaultValue={tipoVincL} ref={TipoVinculacion} value={con}/></div>
                                </React.Fragment>
                            )
                        )
                    })
                }
            </React.Fragment>    
        ) 
    }
}
export default TipoVincluacionL;