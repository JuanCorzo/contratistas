import React, { Component } from 'react'

class Titulo2 extends Component {
    render() {
        const titul = this.props.titulo;
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-lg-12"><br></br><h2 className="card-body-title">{titul}</h2><br></br></div>
                </div>
            </React.Fragment>
        )
    }
}
export default Titulo2;
