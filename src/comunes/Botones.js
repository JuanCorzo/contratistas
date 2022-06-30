import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';

class Botones extends Component {
    render() {
        const enlace = this.props.enlace;
        return (
            <div className="modal-footer p-4">
                <NavLink className="btn btn-secondary pd-x-20" to={enlace}><i className="xicon icon ion-android-exit" ></i> Cancelar</NavLink>
                <button type="submit" className="btn btn-primary" ><i className="xicon icon ion-android-checkbox-outline" ></i> Guardar Cambios</button>
            </div>
        )
    }
}
export default Botones;
