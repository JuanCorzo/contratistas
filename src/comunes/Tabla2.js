import React, { Component } from 'react'
import MaterialTable from 'material-table';
import definiciones from './definiciones';
import PatchedPagination from './PatchedPagination';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import { eliminar } from '../scripts/scripts';

class Tabla2 extends Component {
    elimina  = (id) =>{  eliminar(this.props.tabla, "Departamento", id, this.props.redire); }
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
                {
                    icon: () => <DeleteOutline style={{"transform":"scale(0.8)"}} />,
                    tooltip: 'Eliminar', 
                    onClick: (event, rowData)=>this.elimina(rowData.idc)
                }
                ]}
                options={{ actionsColumnIndex: -1,  rowStyle: { fontSize: 12 } }}
                localization={{ header:{ actions: 'Acciones'}}}
                icons={definiciones}
                rowsPerPageOptions={[25, 50, 100]}
            ></MaterialTable> 
        )
    }
}
export default Tabla2;
