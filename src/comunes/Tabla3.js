import React, { Component } from 'react'
import MaterialTable from 'material-table';
import definiciones from './definiciones';

class Tabla3 extends Component {
    render() {
        const titul = this.props.titulo;
        //const link = this.props.link;
        const columnas = this.props.columnas;
        const valores = this.props.valores;
        return (
            <MaterialTable columns={columnas} data={valores} 
                title={titul} style={{"padding": "1px 1px 1px 1px", "fontSize": "12px"}}
                actions={[
                ]}
                options={{ actionsColumnIndex: -1 }}
                localization={{ header:{ actions: 'Acciones'}}}
                icons={definiciones}
                rowsPerPageOptions={[25, 50, 100]}
            ></MaterialTable> 
        )
    }
}
export default Tabla3;
