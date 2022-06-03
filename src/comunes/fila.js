import React, { Component } from 'react'

class Fila extends Component {
    render() {
        const nombre = this.props.nombre;
        const refer = this.props.refer;
        const tipoInput = this.props.tipo;
        var dataArreglo = this.props.arreglo;
        var defecto = this.props.defecto;
        var col = this.props.col || 3;
        return (
            <div className={`col-md-${(col)} col-input-style`}>
                <label>{nombre}</label>
                {
                    tipoInput === "1"? (
                        <input name={refer} ref={this.refer} defaultValue={defecto} className="form-control" required type="text" />
                    ) :
                    tipoInput === "2"? (
                        <input name={refer} ref={this.refer} defaultValue={defecto} className="form-control" required type="number" />
                    ) :
                    tipoInput === "3"? (
                        <input name={refer} ref={this.refer} defaultValue={defecto} className="form-control" required type="email" />
                    ) :
                    tipoInput === "4"? (
                        <input name={refer} ref={this.refer} className="form-control" required type="password" />
                    ) :
                    tipoInput === "5"? (
                        <select name={refer} className="form-control" required>
                            <option>Seleccione...</option>
                            {
                                dataArreglo.map((arr, i) => {
                                return (
                                        <option key={arr.id} value={arr.id}>{arr.nombre}</option>
                                    )
                                })
                            }
                        </select>
                    ) :
                    tipoInput === "6"? (
                        <select name={refer} className="form-control" required>
                            <option>Seleccione...</option>
                            {
                               dataArreglo.map((con, i) => {
                                return (
                                    con===defecto ? (
                                        <option key={i} value={con} selected>{con} </option>):(<option key={i} value={con}>{con} </option> )
                                    )
                                })
                            }
                        </select>
                    ) :
                    tipoInput === "7"? (
                        <input name={refer} ref={this.refer} defaultValue={defecto} className="form-control" required type="date" />
                    ) :
                    tipoInput === "8"? (
                        <input name={refer} ref={this.refer} defaultValue={defecto} className="form-control" type="text" />
                    ) :
                    tipoInput === "9"? (
                        <input name={refer} ref={refer} defaultValue={defecto} className="form-control" type="radio" />
                    ) :
                    tipoInput === "10"? (
                        <input name={refer} ref={this.refer} defaultValue={defecto} className="form-control" required type="hidden" />
                    ) :
                    tipoInput === "11"? (
                        <input name={refer} ref={this.refer} defaultValue={defecto} className="" style={{width:"40px","font-size":"10px"}} required type="checkbox" />
                    ) :
                    tipoInput === "12"? (
                        <input name={refer} ref={this.refer} defaultValue={defecto} className="form-control" type="text" />
                    ) :
                    (
                      <input name={refer} ref={this.refer} defaultValue={defecto} className="form-control" required type="number" />
                    ) 
                }
            </div>
        )
    }
}
export default Fila;
