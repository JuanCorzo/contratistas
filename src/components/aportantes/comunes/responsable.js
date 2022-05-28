import React, { Component } from 'react';
import TipoDocumento from '../../../helpers/tipodocumento';
class PersonaResponsable extends Component {
    componentDidMount(){ }
    render() { 
        return( 
            <React.Fragment>
                <div className="row">
                    <div className="col-lg-12"><h6 className="titul2">PERSONA RESPONSABLE DEL INFORME</h6><br/></div>
                </div>    
                <div className="row">
                    <div className="col-lg-4">
                        <input className="form-control" ref={this.Responsable} placeholder="Apellidos y Nombres completos" type="text" name="resp"/>
                    </div>    
                    <div className="col-lg-3">
                        <input className="form-control" ref={this.CargoResponsable} placeholder="Cargo" type="text" name="cres"/>
                    </div>   
                    <TipoDocumento tipoDoc="CC" nombre="tres"  /> 
                    <div className="col-lg-3">
                        <input type="text" ref={this.CedulaResponsable} className="form-control" name="dres" placeholder="Documento"/><br/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4">Fecha de diligenciamiento del informe<br/>
                        <input className="form-control" ref={this.FechaDiligenciamiento} type="date" name="fdil" required/><br/>
                    </div>    
                </div>
                <div className="row">
                    <div className="col-lg-6">Firma<br/></div>
                    <div className="col-lg-6">Antes de continuar, por favor verifique que la información es correcta<br/>
                    </div>    
                </div>
                <div className="row">
                    <div className="col-lg-6"></div>
                    <div className="col-lg-6" align="right"><br/>
                        <input type="submit" className="btn btn-info pd-x-20" value="Guardar Cambios" />
                    </div>
                </div>
            </React.Fragment>
        ) 
    }
}
export default PersonaResponsable;