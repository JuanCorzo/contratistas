import React, { Component } from 'react'
class Fila3 extends Component {
    render() {
        const valor = this.props.valor;
        const nombre = this.props.nombre;
        var ancho = this.props.ancho;
        return (
            <React.Fragment>
                <div className={ancho}><b>{nombre}: </b></div>
                <div className={ancho}>{valor}</div>
            </React.Fragment>
        )
    }
}
export default Fila3;
