import axios from 'axios';
import global from '../Global';
import swal from 'sweetalert';
import Cookies from 'universal-cookie';

const cookies = new Cookies(); 

export const actual = (tabela) =>
{
  axios.get(global.url + "roles", global.autentica)
  .then(res => {
      let rols = res.data;
      rols =  rols.map( (p) => { p['idc'] = p.idroles; p[`nombre`] = p.rol_nombre; return p; });
      this.setState({ rols });
  });
}

export const guarda = (arreglo, direccion, tabela, redire) => 
{
  axios.post(global.url+"" + direccion , arreglo, global.autentica)
    .then(res =>{
        const current = new Date();
        const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;      
        const tablal = tabela ; 
        const tabe = { 
          "log_fecha": date, 
          "log_accion": "Crear",
          "log_objeto": tablal, 
          "log_idusuarios": cookies.get("idusuarios")
        } 
        axios.post(global.url + "logs", tabe,  global.autentica);
        swal(tabela + ' creado', 'Se ha creado el registro correctamente', 'success' );
    }).catch((error) => {
        swal(tabela + " no creado", "Hubo un error al crear el registro", "error");
    });
}
export const actualiza = (arreglo, direccion, tabela, id, redire) =>
{
    axios.put(global.url + "" + direccion + "/" + id, arreglo, global.autentica).then(res =>{
        const current = new Date();
        const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;      
        const tablal = tabela + " id:" + id; 
        const tabe = { 
          "log_fecha": date, 
          "log_accion": "Actualizar",
          "log_objeto": tablal, 
          "log_idusuarios": cookies.get("idusuarios")
        }
        axios.post(global.url + "logs", tabe,  global.autentica);
        swal(tabela + ' editado', 'Se ha editado el registro correctamente', 'success' );
    }).catch((error) => {
        swal(tabela + " no editado", "Hubo un error al editar registro", "error");
    });
}
export const eliminar = (direccion, tabela, id, redire) =>
{
    swal({
        title: "Está seguro?", text: "Una vez lo elimine no podrá recuperarlo!",
        icon: "warning", buttons: true, dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          axios.delete(global.url+ direccion + "/" + id, 
          global.autentica)
          .then((res) => { 
              const current = new Date();
              const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;      
              const tablal = tabela + " id:" + id; 
              const tabe = { 
                "log_fecha": date, 
                "log_accion": "Eliminar",
                "log_objeto": tablal, 
                "log_idusuarios": cookies.get("idusuarios")
              }
              axios.post(global.url + "logs", tabe,  global.autentica);
              //swal("Registro Eliminado", "Se ha eliminado el registro", "success"); 
          });
        } else {
        swal("Eliminación cancelada");
        }
      }).catch((error) => {
        swal("Error al eliminar", "Hubo un error al intentar eliminar el registro", "error");
      });
}

