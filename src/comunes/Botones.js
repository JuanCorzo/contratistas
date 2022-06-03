import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';

class Botones extends Component {
    render() {
        const enlace = this.props.enlace;
        return (
            <div className="modal-footer p-4">
                <NavLink className="btn btn-secondary pd-x-20" to={enlace}>Cancelar</NavLink>
                <input type="submit" className="btn btn-info pd-x-20" value="Guardar Cambios" />
            </div>
        )
    }
}
export default Botones;
