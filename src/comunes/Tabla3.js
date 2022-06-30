import React, { Component } from 'react'
import MaterialTable from 'material-table';
import definiciones from './definiciones';
import PatchedPagination from './PatchedPagination';
import { Paper } from '@material-ui/core';
	
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
					Container: props => <Paper {...props} elevation={0}/>
                }}    
                columns={columnas} data={valores} 
                title={titul} style={{"padding": "1px 1px 1px 1px", "fontSize":"14px !important"}}
                actions={[
                ]}
                options={{ 
                    actionsColumnIndex: -1,  
                    rowStyle: { fontSize: 12 },
                    pageSize: 10,
                    emptyRowsWhenPaging: false,
                    pageSizeOptions: [10,20,50],
                }}
                localization={{ header:{ actions: 'Acciones'}}}
                icons={definiciones}
            ></MaterialTable>  
        )
    }
}
export default Tabla3;
