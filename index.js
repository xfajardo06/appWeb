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
        array_dato.forEach((usuario, index) => {
            console.log('usuario',usuario);
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
        
    )
    .catch(err => console.log(err))
}

function deleteRow(id) {
    var index = array_dato.findIndex(function(item, i){
        return item.id === id
      });
    array_dato.splice(index, 1)
    dato.innerHTML=""
    array_dato.forEach(usuario => {
        dato.innerHTML += 
        `<tr> 
            <td>${usuario.userId}</td>
            <td>${usuario.id}</td>
            <td>${usuario.title}</td>
            <td>${usuario.completed}</td>
            <td><button style="background-color: red; color: white; border:1px" onclick="deleteRow(${usuario.id})">${'Eliminar'}</button></td>
        </tr>`
        
    });
    if(array_dato.length===0){
        mensaje.innerHTML=""
        mensaje.innerHTML="Todos los registros eliminados"
    }

    
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
                array_dato.forEach(user => {
                    
                    dato.innerHTML += 
                    `<tr> 
                        <td>${user.userId}</td>
                        <td>${user.id}</td>
                        <td>${user.title}</td>
                        <td>${user.completed}</td>
                        <td><button style="background-color: red; color: white; border:1px" onclick="deleteRow(${user.id})">${'Eliminar'}</button></td>
                    </tr>`
                })
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
                array_dato.forEach(user => {
                    
                    dato.innerHTML += 
                    `<tr> 
                        <td>${user.userId}</td>
                        <td>${user.id}</td>
                        <td>${user.title}</td>
                        <td>${user.completed}</td>
                        <td><button style="background-color: red; color: white; border:1px" onclick="deleteRow(${user.id})">${'Eliminar'}</button></td>
                    </tr>`
                })
            } else{
                mensaje.innerHTML=""
                mensaje.innerHTML="No se ha encontrado ningún registro"
            }
    })
}

