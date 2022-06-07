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
        
        var col = this.props.col || 3;
        return( 
            
                <div className={`col-md-${(col)} col-input-style`}>
                        <label>Macrozonas</label>
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
                
        ) 
    }
}
export default Macrozonas;