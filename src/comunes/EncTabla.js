import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';

class EncTabla extends Component {
    render() {
        const titul = this.props.titulo;
        const titu2 = this.props.titulo2 || null;
        const link = this.props.link || "";
        let showButton = this.props.showButton || true;
        if(showButton === "false") showButton = false;
        return (
            <React.Fragment>
                <div className='row'>
                    <div className='col-lg-8 izqq '>
                        <div className="actions"><h6>{titul}</h6></div>
                    </div>
                    <div className='col-lg-4 derechas'>
                        <NavLink className={`${((showButton === false)?"d-none":"")} btn btn-primary`} to={link}><i className="icon ion-plus-round"></i> Agregar {titu2}</NavLink>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default EncTabla;




