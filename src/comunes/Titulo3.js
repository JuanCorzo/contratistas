import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';

class Titulo2 extends Component {
    render() {
        const titul = this.props.titulo;
        const volve = this.props.volver;
        return (
            <React.Fragment>
                <div className='row'>
                    <div className='col-lg-8 izqq'>
                        <h6 className="numerosaxul">{titul}</h6>
                    </div>
                    <div className='col-lg-4 derechas'>
                    {
                        volve==="0"?(<React.Fragment></React.Fragment>):
                        (<NavLink className="btn btn-secondary" to="/aportantes">
                        <i className="icon ion-backspace"></i> Volver</NavLink>)
                    }
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                    </div>
                </div>    
            </React.Fragment>
        )
    }
}
export default Titulo2;
