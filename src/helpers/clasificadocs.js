import React, { Component } from 'react';
import axios from 'axios';
import global from '../Global';
class Menus extends Component {
    state = { role:[] };
    componentDidMount(){ this.llenar(); }
    llenar = () => {
        axios.get(global.url + "clasificas", global.autentica)
        .then(res => {
            let role = res.data;
            this.setState({ role });
        });
    }
    render() {
        var col = this.props.col || 3;
        return( 
                <div className={`col-md-${(col)} col-input-style`}>
                        <label>Clasificación documento</label>
                        <select name="clas" className="form-control" required>
                            <option>Seleccione...</option>
                            {
                                this.state.role.map((arr, i) => {
                                return (
                                    <option key={i} value={arr.cld_nombre}>{arr.cld_nombre} </option> ) 
                                })
                            }
                        </select>
                    </div>
                
        ) 
    }
}
export default Menus;