import React, { Component } from 'react';
class TipoZona extends Component {
    state = { tzon:['Rural', 'Urbana'] };
    componentDidMount(){ }
    render() { 
        const tipoZona = this.props.tipoZona;
        return( 
            <React.Fragment>
                <div className="col-lg-2">
                <select className="form-control" name="Zona" required>
                {
                    this.state.tzon.map((con, i) => {
                        return (
                            tipoZona===con ? ( <option vaule={con} selected>{con}</option>) 
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
export default TipoZona;