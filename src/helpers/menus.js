import React, { Component } from 'react';
import axios from 'axios';
import global from '../Global';
class Menus extends Component {
    state = { role:[] };
    componentDidMount(){ this.llenar(); }
    llenar = () => {
        axios.get(global.url + "menus", global.autentica)
        .then(res => {
            let role = res.data;
            this.setState({ role });
        });
    }
    render() { 
        const valor = this.props.valor;
        var col = this.props.col || 3;
        return( 
                    <div className={`col-md-${(col)} col-input-style`}>
                        <label>Menús</label>
                        <select name="menus" className="form-control" required>
                            <option>Seleccione...</option>
                            {
                                this.state.role.map((arr, i) => {
                                return (
                                    arr.idmenus===valor ? (
                                        <option key={i} value={arr.idmenus} selected>{arr.men_categoria+"-"+arr.men_nombre} </option> ) 
                                        :(<option key={i} value={arr.idmenus}>{arr.men_categoria+"-"+arr.men_nombre} </option> )
                                    )
                                })
                            }
                        </select>
                    </div>
        ) 
    }
}
export default Menus;