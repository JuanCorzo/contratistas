import React, { Component } from 'react';
class TipoDocumento extends Component {
    state = { tdoc:['NIT', 'CC', 'CE', 'NU', 'PA'] };
    componentDidMount(){ }
    render() { 
        const tipoDoc = this.props.tipoDoc;
        const nombre = this.props.nombre;
        return( 
            <React.Fragment>
                <div className="col-lg-2">
                <select className="form-control" id={nombre} name={nombre}   required>
                {
                    this.state.tdoc.map((con, i) => {
                        return (
                            tipoDoc===con ? ( <option vaule={con} selected>{con}</option>) 
                            : ( <option vaule={con}>{con}</option> )
                            )
                        })
                    }
                    </select>
                </div>
            </React.Fragment>    
        ) 
    }
}
export default TipoDocumento;