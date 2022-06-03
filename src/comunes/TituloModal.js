import React, { Component } from 'react'

class TituloModal extends Component {
    render() {
        const titulo = this.props.titulo;
        const subtitulo = this.props.subtitulo || "Digite la siguiente informacion";
        return (
            <div className="title-style">
                <h1>{titulo}
                    <span>{subtitulo}</span>
                </h1>
            </div>
        )
    }
}
export default TituloModal;
