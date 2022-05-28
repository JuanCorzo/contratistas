import React, { Component } from 'react'
class Fila4 extends Component {
    render() {
        const nombre = this.props.nombre;
        const refer = this.props.refer;
        const tipo = this.props.tipo;
        var arreglo = this.props.arreglo;
        var defecto = this.props.defecto;
        var ancho = this.props.ancho;
        if(ancho===""){ ancho="col-lg-3"; }
        if(tipo==="7" && defecto!==""){
           //defecto = defecto.substr(0,10);
        }
        return (
            <div className={ancho} >
                {
                    arreglo==="1"?(
                        <React.Fragment>{ nombre }</React.Fragment> 
                    ): 
                    
                    ( <React.Fragment></React.Fragment> )

                }
                {
                    tipo === "1"? (
                        <input name={refer} ref={refer} defaultValue={defecto} placeholder={nombre} className="form-control"  type="text" />
                    ) :
                    tipo === "2"? (
                        <input name={refer} ref={refer} defaultValue={defecto} placeholder={nombre} className="form-control"  type="number" />
                    ) :
                    tipo === "3"? (
                        <input name={refer} ref={refer} defaultValue={defecto} placeholder={nombre} className="form-control"  type="email" />
                    ) :
                    tipo === "4"? (
                        <input name={refer} ref={refer} className="form-control" placeholder={nombre}  type="password" />
                    ) :
                    tipo === "5"? (
                        <select name={refer} className="form-control" >
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
                        <select name={refer} className="form-control" >
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
                        <input name={refer} ref={refer} defaultValue={defecto} className="form-control"  type="date" />
                    ) :
                    tipo === "8"? (
                        <input name={refer} ref={refer} defaultValue={defecto} className="form-control" type="text" />
                    ) :
                    tipo === "9"? (
                        <input name={refer} ref={refer} defaultValue={defecto} className="form-control" type="radio" />
                    ) :
                    tipo === "10"? (
                        <textarea name={refer} ref={refer} className="form-control" >{defecto}</textarea>
                    ) :
                    (
                        <input name={refer} ref={refer} defaultValue={defecto} className="form-control"  type="number" />
                    ) 
                }
            </div>
)
    }
}
export default Fila4;
