const aplicacion = document.querySelector('data')

const url = 'https://jsonplaceholder.typicode.com/todos'
const dato = document.getElementById('data')
const mensaje = document.getElementById('registro')
let array_dato = [];
function getAll() {
    fetch(url)
    .then(res => res.json())
    .then(data => {
        dato.innerHTML=""
        mensaje.innerHTML=""
        array_dato = data
        mostrarDato(array_dato);
        }
    )
    .catch(err => console.log(err))
}

function deleteRow(id) {
    
    console.log('Elemento a borrar',id);
    alertify.confirm("¿Seguro que desea eliminar el registro?",
    function(){
        // SIMULACION DE DELET EN JSONPLACE HOLDER
        fetch(url+'/'+id, {
            method: 'DELETE',
        })

        // ELIMINANDO DE LA VISTA
        var index = array_dato.findIndex(function(item, i){
            return item.id === id
          });
        array_dato.splice(index, 1)
        dato.innerHTML=""
        mostrarDato(array_dato);
        if(array_dato.length===0){
            mensaje.innerHTML=""
            mensaje.innerHTML="Todos los registros eliminados"
        }
        alertify.success('Hecho');
    },
    function(){ 
        alertify.error('Cancel');
    }); 
}

function changeSelect() {
    const busqueda = document.getElementById('valorselect').value;
    fetch(url)
    .then(res => res.json())
    .then(data => {
            mensaje.innerHTML=""
            dato.innerHTML =""
            let filter = []
            console.log(busqueda);
            if(busqueda === "true" || busqueda === "false"){
                filter = data.filter((usuario) => String(usuario.completed) === busqueda);
            } else {
                filter = data.filter((usuario) => usuario.userId === Number(busqueda));
            }
            array_dato = filter
            if(array_dato.length !==0){
                mostrarDato(array_dato);
        } else{
            mensaje.innerHTML=""
            mensaje.innerHTML="No se ha encontrado ningún registro"
        }
        }
        
    )
    .catch(err => console.log(err))
}

function filter() {
    const busqueda = document.getElementById('busqueda').value
    console.log(busqueda)
    fetch(url)
    .then(res => res.json())
    .then(data => {
            mensaje.innerHTML=""
            dato.innerHTML =""
            const filter = data.filter((usuario) => usuario.title.includes(busqueda.toLowerCase().trim()))
            array_dato = filter

            if(array_dato.length !==0 && busqueda!==''){
                mostrarDato(array_dato);
            } else{
                mensaje.innerHTML=""
                mensaje.innerHTML="No se ha encontrado ningún registro"
            }
    })
    .catch(err => console.log(err))
}

function mostrarDato(data){
    data.forEach((usuario) => {
        dato.innerHTML += 
        `<tr> 
            <td>${usuario.userId}</td>
            <td>${usuario.id}</td>
            <td>${usuario.title}</td>
            <td>${usuario.completed}</td>
            <td><button style="background-color: red; color: white; border:1px" onclick="deleteRow(${usuario.id})">${'Eliminar'}</button></td>
        </tr>`
        
    });
}

