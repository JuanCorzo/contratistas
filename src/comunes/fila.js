import React, { Component } from 'react'

class Fila extends Component {
    render() {
        const nombre = this.props.nombre;
        const refer = this.props.refer;
        const tipo = this.props.tipo;
        var arreglo = this.props.arreglo;
        var defecto = this.props.defecto;
        if(tipo==="7" && defecto!==""){
           //defecto = defecto.substr(0,10);
        }
        return (
            <div className="row">
                {
                    tipo==="11"?(<div className="col-md-6 izqq" style={{"font-size":"11px"}}>{nombre}</div>):
                    (<div className="col-md-6 izqq">{nombre}</div>)
                }
            <div className="col-md-6 derechas">
                {
                    tipo === "1"? (
                        <input name={refer} ref={this.refer} defaultValue={defecto} className="form-control" required type="text" />
                    ) :
                    tipo === "2"? (
                        <input name={refer} ref={this.refer} defaultValue={defecto} className="form-control" required type="number" />
                    ) :
                    tipo === "3"? (
                        <input name={refer} ref={this.refer} defaultValue={defecto} className="form-control" required type="email" />
                    ) :
                    tipo === "4"? (
                        <input name={refer} ref={this.refer} className="form-control" required type="password" />
                    ) :
                    tipo === "5"? (
                        <select name={refer} className="form-control" required>
                            <option>Seleccione...</option>
                            {
                                arreglo.map((arr, i) => {
                                return (
                                        <option key={arr.id} value={arr.id} >{arr.nombre}</option>
                                    )
                                })
                            }
                        </select>
                    ) :
                    tipo === "6"? (
                        <select name={refer} className="form-control" required>
                            <option>Seleccione...</option>
                            {
                               arreglo.map((con, i) => {
                                return (
                                    con===defecto ? (
                                        <option key={i} value={con} selected>{con} </option> ) 
                                        :(<option key={i} value={con}>{con} </option> )
                                    )
                                })
                            }
                        </select>
                    ) :
                    tipo === "7"? (
                        <input name={refer} ref={this.refer} defaultValue={defecto} className="form-control" required type="date" />
                    ) :
                    tipo === "8"? (
                        <input name={refer} ref={this.refer} defaultValue={defecto} className="form-control" type="text" />
                    ) :
                    tipo === "9"? (
                        <input name={refer} ref={refer} defaultValue={defecto} className="form-control" type="radio" />
                    ) :
                    tipo === "10"? (
                        <input name={refer} ref={this.refer} defaultValue={defecto} className="form-control" required type="hidden" />
                    ) :
                    tipo === "11"? (
                        <input name={refer} ref={this.refer} defaultValue={defecto} className="" style={{width:"40px","font-size":"10px"}} required type="checkbox" />
                    ) :
                    tipo === "12"? (
                        <input name={refer} ref={this.refer} defaultValue={defecto} className="form-control" type="text" />
                    ) :
                    (
                      <input name={refer} ref={this.refer} defaultValue={defecto} className="form-control" required type="number" />
                    ) 
                }
            </div>
        </div>
)
    }
}
export default Fila;
