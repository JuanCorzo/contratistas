import React, { Component } from 'react';
import axios from 'axios';
import global from '../Global';
class Macrozonas extends Component {
    state = { role:[] };
    componentDidMount(){ this.llenar(); }
    llenar = () => {
        axios.get(global.url + "macrozonas", global.autentica)
        .then(res => {
            let role = res.data;
            this.setState({ role });
        });
    }
    render() { 
        return( 
            <div>
                <div className="row">
                    <div className="col-md-6 izqq">Macrozonas</div>
                    <div className="col-md-6 derechas">
                        <select name="Macro" className="form-control" required>
                            <option>Seleccione...</option>
                            {
                                this.state.role.map((arr, i) => {
                                return (
                                        <option key={i} value={arr.mac_nombre}>{arr.mac_nombre} </option>  
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
            </div>
        ) 
    }
}
export default Macrozonas;