import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//login
import Login from '../components/login/Login';
import Inicio from '../components/login/Inicio';
import Error from '../layout/Error';
import navigate from '../layout/navigate';

//usuarios
import Roles from '../components/usuarios/roles/Roles';
import Usuarios from '../components/usuarios/usuarios/Usuarios';
import Departamentos from '../components/usuarios/departamentos/Departamentos';
import Municipios from '../components/usuarios/municipios/Municipios';
import Paises from '../components/usuarios/paises/Paises';
import Territoriales from '../components/usuarios/territoriales/territoriales';
import Menus from '../components/usuarios/menus/Menus';
import Permisos from '../components/usuarios/permisos/permisos';
import editamiusuario from '../components/usuarios/usuarios/editamiusuario';

//Parametrizacion
import estNomina from '../components/parametrizacion/estNomina/estNomina';
import clasificaAportantes from '../components/parametrizacion/clasificaAportantes/clasificaAportantes';
import sectores from '../components/parametrizacion/sectores/sectores';
import tiposDocumentos from '../components/parametrizacion/tiposDocumentos/tiposDocumentos';
import tiposEntidades from '../components/parametrizacion/tiposEntidades/tiposEntidades';
import macrozonas from '../components/parametrizacion/macrozonas/macrozonas';
import clasificaDocumentos from '../components/parametrizacion/clasificaDocumentos/clasificaDocumentos'

//Aportantes
import sedes from '../components/aportantes/sedes/sedes';
import aportantes from '../components/aportantes/aportantes/aportantes';
import responsables from '../components/aportantes/aportantes/responsables';
import anexos from '../components/aportantes/aportantes/anexos';
import descarga_txt from '../components/aportantes/aportantes/descarga_txt';

//Reportes
import consultaAportantes from '../components/reportes/reportes/consultasaportantes';
import fichaAportantes from '../components/reportes/reportes/fichaaportante';
import fichaAportantes1 from '../components/reportes/reportes/fichaaportante1';
import consolidadosaportanes from '../components/reportes/reportes/consolidadosaportantes';
import lineasdetiempo from '../components/reportes/reportes/lineasdetiempo';
import logEventos from '../components/reportes/logEventos/logEventos';
import localizacion from '../components/reportes/reportes/mapas';
import zonas from '../components/reportes/reportes/zonas';

//Crear
import Crearrol from '../components/usuarios/roles/Creaarrol';
import Crearusuario from '../components/usuarios/usuarios/Crearusuario';
import Crearpais from '../components/usuarios/paises/Crearpais';
import Creardpto from '../components/usuarios/departamentos/Creardpto';
import Crearmuni from '../components/usuarios/municipios/Crearmuni';
import Crearmenu from '../components/usuarios/menus/Crearmenu';
import Crearperm from '../components/usuarios/permisos/Crearperm';
import Crearterr from '../components/usuarios/territoriales/Crearterr';

import Crearestn from '../components/parametrizacion/estNomina/Crearestn';
import Crearcapo from '../components/parametrizacion/clasificaAportantes/Crearcapo';
import Crearsect from '../components/parametrizacion/sectores/Crearsect';
import Creartdoc from '../components/parametrizacion/tiposDocumentos/Creartdoc';
import Creartent from '../components/parametrizacion/tiposEntidades/Creartent';
import Crearmacr from '../components/parametrizacion/macrozonas/Creaarmacr';
import Crearclad from '../components/parametrizacion/clasificaDocumentos/Crearclad';

import Crearsede from '../components/aportantes/sedes/Crearsede';
import Crearapor from '../components/aportantes/aportantes/Crearapor';
import Crearresp from '../components/aportantes/aportantes/Crearresp';
import Crearanex from '../components/aportantes/aportantes/Crearanex';

//Editar
import editarol from '../components/usuarios/roles/editarol';
import editausuario from '../components/usuarios/usuarios/editausuario';
import editapais from '../components/usuarios/paises/editapais';
import editadpto from '../components/usuarios/departamentos/editadpto';
import editamuni from '../components/usuarios/municipios/editamuni';
import editamenu from '../components/usuarios/menus/editamenu';
import editaperm from '../components/usuarios/permisos/editaperm';
import editaterr from '../components/usuarios/territoriales/editaterr';

import editaestn from '../components/parametrizacion/estNomina/editaestn';
import editacapo from '../components/parametrizacion/clasificaAportantes/editacapo';
import editasect from '../components/parametrizacion/sectores/editasect';
import editatdoc from '../components/parametrizacion/tiposDocumentos/editatdoc';
import editatent from '../components/parametrizacion/tiposEntidades/editatent';
import editamacr from '../components/parametrizacion/macrozonas/editamacr';
import editaclad from '../components/parametrizacion/clasificaDocumentos/editaclad';

import editasede from '../components/aportantes/sedes/editasede';
import editaapor from '../components/aportantes/aportantes/editaapor';
import editaresp from '../components/aportantes/aportantes/editaresp';

class Router extends Component {
    render() {

        return (
            <React.Fragment>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Login}></Route>
                    <Route path="/Inicio" component={Inicio}></Route>
                    <Route path="/Login" component={Login}></Route>  
                    <Route path="/navigate" component={navigate}></Route>  
                    <Route path="/Roles" component={Roles}></Route>
                    <Route path="/Usuarios" component={Usuarios}></Route>
                    <Route path="/Paises" component={Paises}></Route>
                    <Route path="/territoriales" component={Territoriales}></Route>
                    <Route path="/Departamentos" component={Departamentos}></Route>
                    <Route path="/Municipios" component={Municipios}></Route>
                    <Route path="/Menus" component={Menus}></Route>
                    <Route path="/permisos" component={Permisos}></Route>
                    <Route path="/editamiusuario" component={editamiusuario}></Route>

                    <Route path="/estructuranomnina" component={estNomina}></Route>
                    <Route path="/clasificacionesaportantes" component={clasificaAportantes}></Route>
                    <Route path="/tipoadscrita" component={tiposEntidades}></Route>
                    <Route path="/sectores" component={sectores}></Route>
                    <Route path="/tiposdocumentos" component={tiposDocumentos}></Route>
                    <Route path="/macrozonas" component={macrozonas}></Route>
                    <Route path="/clasificas" component={clasificaDocumentos}></Route>

                    <Route path="/sedes" component={sedes}></Route>
                    <Route path="/aportantes" component={aportantes}></Route>
                    <Route path="/enlaces/:id" component={responsables}></Route>
                    <Route path="/anexos/:id" component={anexos}></Route>
                    <Route path="/descarga_txt" component={descarga_txt}></Route>

                    <Route path="/Consulta-aportantes" component={consultaAportantes}></Route>
                    <Route path="/ficha/:id" component={fichaAportantes}></Route>
                    <Route path="/ficha1/:id" component={fichaAportantes1}></Route>
                    <Route path="/Consolidados-aportantes" component={consolidadosaportanes}></Route>
                    <Route path="/Lineas-tiempo" component={lineasdetiempo}></Route>
                    <Route path="/mapas" component={localizacion}></Route>
                    <Route path="/zonas" component={zonas}></Route>
                    <Route path="/logs" component={logEventos}></Route>

                    <Route path="/Crearrol" component={Crearrol}></Route>
                    <Route path="/Crearusuario" component={Crearusuario}></Route>
                    <Route path="/Creardpto" component={Creardpto}></Route>
                    <Route path="/Crearmuni" component={Crearmuni}></Route>
                    <Route path="/Crearpais" component={Crearpais}></Route>
                    <Route path="/Crearmenu" component={Crearmenu}></Route>
                    <Route path="/Crearperm" component={Crearperm}></Route>
                    <Route path="/Crearterr" component={Crearterr}></Route>

                    <Route path="/Crearestn" component={Crearestn}></Route>
                    <Route path="/Crearcapo" component={Crearcapo}></Route>
                    <Route path="/Crearsect" component={Crearsect}></Route>
                    <Route path="/Creartdoc" component={Creartdoc}></Route>
                    <Route path="/Creartent" component={Creartent}></Route>
                    <Route path="/Crearmacr" component={Crearmacr}></Route>
                    <Route path="/Crearclad" component={Crearclad}></Route>

                    <Route path="/Crearsede" component={Crearsede}></Route>
                    <Route path="/Crearapor" component={Crearapor}></Route>
                    <Route path="/Crearresp/:id" component={Crearresp}></Route>
                    <Route path="/Crearanex/:id" component={Crearanex}></Route>

                    <Route path="/editarol/:id" component={editarol}></Route>
                    <Route path="/editausuario/:id" component={editausuario}></Route>
                    <Route path="/editadpto/:id" component={editadpto}></Route>
                    <Route path="/editamuni/:id" component={editamuni}></Route>
                    <Route path="/editapais/:id" component={editapais}></Route>
                    <Route path="/editamenu/:id" component={editamenu}></Route>
                    <Route path="/editaperm/:id" component={editaperm}></Route>
                    <Route path="/editaterr/:id" component={editaterr}></Route>

                    <Route path="/editaestn/:id" component={editaestn}></Route>
                    <Route path="/editacapo/:id" component={editacapo}></Route>
                    <Route path="/editasect/:id" component={editasect}></Route>
                    <Route path="/editatdoc/:id" component={editatdoc}></Route>
                    <Route path="/editatent/:id" component={editatent}></Route>
                    <Route path="/editamacr/:id" component={editamacr}></Route>
                    <Route path="/editaclad/:id" component={editaclad}></Route>

                    <Route path="/editasede/:id" component={editasede}></Route>
                    <Route path="/editaapor/:id" component={editaapor}></Route>
                    <Route path="/editaresp/:id" component={editaresp}></Route>
                    <Route component={Error}></Route>
                </Switch>
            </BrowserRouter>
            </React.Fragment>
        );
    }
}

export default Router;