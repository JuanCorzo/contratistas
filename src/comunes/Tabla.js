import React, { Component } from 'react'
import MaterialTable from 'material-table';
import definiciones from './definiciones';
import Edit from '@material-ui/icons/Edit';
import { Redirect } from 'react-router-dom';
import PatchedPagination from './PatchedPagination';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import { eliminar } from '../scripts/scripts';
import Cookies from 'universal-cookie';
import { Paper } from '@material-ui/core';

const cookies = new Cookies(); 
class Tabla extends Component {
    state = { direc: "", status: null };
    elimina  = (id) =>{  
        eliminar(this.props.tabla, "Departamento", id, this.props.redire);
        cookies.set("destino", this.props.tabla, {path:"/"});
        this.setState({ status: 'Ok'})
    }
    enviar = (id) => { this.setState({ direc: id }) }
    render() {
        if(this.state.status==="Ok"){return <Redirect to={"/navigate"}/>;}
        const titul = "";
        const link = this.props.link;
        const columnas = this.props.columnas;
        const valores = this.props.valores;
        if(this.state.direc!==""){return <Redirect to={this.state.direc}/>;}
        return (
            <MaterialTable 
                components={{
                    Pagination: PatchedPagination,
                    Container: props => <Paper {...props} elevation={0}/>
                }}
                columns={columnas} data={valores} 
                title={titul} style={{"padding": "1px 1px 1px 1px"}}
                actions={[
                {
                    icon: () => <Edit style={{"transform":"scale(0.8)"}} />,
                    tooltip: 'Editar',
                    onClick: (event, rowData)=>{
                        this.enviar(link + rowData.idc);
                    }
                },
                {
                    icon: () => <DeleteOutline  style={{"transform":"scale(0.8)"}} />,
                    tooltip: 'Eliminar', 
                    onClick: (event, rowData)=>this.elimina(rowData.idc)
                }
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
export default Tabla;
