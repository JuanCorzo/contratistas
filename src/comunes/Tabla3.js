import React, { Component } from 'react'
import MaterialTable from 'material-table';
import definiciones from './definiciones';
import PatchedPagination from './PatchedPagination';

class Tabla3 extends Component {
    render() {
        const titul = this.props.titulo;
        //const link = this.props.link;
        const columnas = this.props.columnas;
        const valores = this.props.valores;
        return (
            <MaterialTable 
                components={{
                    Pagination: PatchedPagination,
                }}    
                columns={columnas} data={valores} 
                title={titul} style={{"padding": "1px 1px 1px 1px"}}
                actions={[
                ]}
                options={{ actionsColumnIndex: -1,  rowStyle: { fontSize: 12 } }}
                localization={{ header:{ actions: 'Acciones'}}}
                icons={definiciones}
                rowsPerPageOptions={[25, 50, 100]}
            ></MaterialTable> 
        )
    }
}
export default Tabla3;
