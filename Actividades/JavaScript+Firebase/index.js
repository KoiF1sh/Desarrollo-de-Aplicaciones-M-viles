var firebaseConfig = {
    apiKey: "AIzaSyASHjSNsvrnkLWf4Hd_uYA4Wf85KE4NJgY",
    authDomain: "proyectonombrespr.firebaseapp.com",
    databaseURL: "https://proyectonombrespr-default-rtdb.firebaseio.com",
    projectId: "proyectonombrespr",
    storageBucket: "proyectonombrespr.appspot.com",
    messagingSenderId: "517159642401",
    appId: "1:517159642401:web:c4ee4e2bf6d21a3e1f0a60",
    measurementId: "G-9SVRFTZXPP"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


function resetFields(){
    document.getElementById("Input1").value='';
    document.getElementById("Input2").value='';
    document.getElementById("Input3").value='selecciona';
    document.getElementById("Input4").value='';
    document.getElementById("Input5").value='selecciona';
    document.getElementById("Input6").value='selecciona';
    document.getElementById("Input7").value='selecciona';
}
function createR() {
    document.getElementById("Input1").disabled = false;
    //Guardo los datos capturados usando el id de cada control
    var id = document.getElementById("Input1").value;
    var nombre = document.getElementById("Input2").value;
    var sexo = document.getElementById("Input3").value;
    var especie = document.getElementById("Input4").value;
    var grupo = document.getElementById("Input5").value;
    var alimentacion = document.getElementById("Input6").value;
    var habitat = document.getElementById("Input7").value;

    //validaciones
    if (id.length > 0) {
        //creo un objeto que guarda los datos
        var animal = {
            id, //matricula:id
            nombre,
            sexo,
            especie,
            grupo,
            alimentacion,
            habitat,
        }

        //console.log(animal);

        firebase.database().ref('Animales/' + id).update(animal).then(() => {
           resetFields();
        }).then(()=>{
           read();
        });

        swal("Listo!", "Agregado correctamente", "success");

        
    } 
    else {
        swal("Error", "Llena todos los campos","warning");
    }

    document.getElementById("Input1").disabled = false;
        //firebase.database().ref('users/' + userId).set({
    //    username: name,
    //    email: email,
    //    profile_picture : imageUrl
    //  });
    //https://firebase.google.com/docs/database/web/read-and-write?hl=es

  
    //Esto se usa cuando no tienen un id/matricula y Firebase les genera una
    //automaticamente
    //const key = firebase.database().ref().child('Alumnos').push().key;
    //data[`Alumnos/${key}`]= animal;
    //firebase.database().ref().update(data).then(()=>{
    //  alert('Agregado exitosamente');
    //})
}

function read(){
    document.getElementById("Table1").innerHTML='';

    var ref = firebase.database().ref('Animales');
/**   
   ref.on('value', function(snapshot) {
        snapshot.forEach(row=>{
            printRow(row.val());
        })
    });
 */
   
    ref.on("child_added", function(snapshot) {
        printRow(snapshot.val());
    });

}

function printRow(animal){
    
    if(animal!=null){
        var table = document.getElementById("Table1"); 

        //creamos un nuevo elemento en la tabla en la ultima posicion
        var row = table.insertRow(-1);

        //Insertamos cada una de las celdas/columnas del registro
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        var cell8 = row.insertCell(7);
        var cell9 = row.insertCell(8);
        
        //Agregamos la informacion a cada una de las columnas del registro
        cell1.innerHTML = animal.id;
        cell2.innerHTML = animal.nombre; 
        cell3.innerHTML = animal.sexo;
        cell4.innerHTML = animal.especie;
        cell5.innerHTML = animal.grupo;
        cell6.innerHTML = animal.alimentacion; 
        cell7.innerHTML = animal.habitat; 
        cell8.innerHTML = `<button type="button" class="btn btn-delete" onClick="deleteR(${animal.id})">Eliminar</button>`;
        cell9.innerHTML = '<button type="button" class="btn btn-primary" onClick="seekR('+animal.id+')">Modificar</button>';
    }
}

function deleteR(id){
    firebase.database().ref('Animales/' + id).set(null).then(() => {
      read();
    }).then(()=>{
       swal("Listo!", "Eliminado correctamente", "success");
    });
}

function seekR(id){
    var ref = firebase.database().ref('Animales/' + id);
    ref.on('value', function(snapshot) {
      updateR(snapshot.val());
    });
}

function updateR(animal){
    if(animal!=null)
    {
        document.getElementById("Input1").value=animal.id;
        document.getElementById("Input1").disabled = true;
        document.getElementById("Input2").value=animal.nombre;
        document.getElementById("Input3").value=animal.sexo;
        document.getElementById("Input4").value=animal.especie;
        document.getElementById("Input5").value=animal.grupo;
        document.getElementById("Input6").value=animal.alimentacion;
        document.getElementById("Input7").value=animal.habitat;
    }
}


//Para consulta de carrera
function readQ(){
    document.getElementById("Table2").innerHTML='';
    var c = document.getElementById("Input7").value;

    var ref = firebase.database().ref("Animales");
    ref.orderByChild("habitat").equalTo(c).on("child_added", function(snapshot) {
        printRowQ(snapshot.val());
    });

}


function printRowQ(animal){

    var table = document.getElementById("Table2"); 
    
    //creamos un nuevo elemento en la tabla en la ultima posicion
    var row = table.insertRow(-1);

    //Insertamos cada una de las celdas/columnas del registro
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    
    //Agregamos la informacion a cada una de las columnas del registro
    cell1.innerHTML = animal.id;
    cell2.innerHTML = animal.nombre; 
    cell3.innerHTML = animal.sexo;
    cell4.innerHTML = animal.especie;
    cell5.innerHTML = animal.grupo;
    cell6.innerHTML = animal.alimentacion; 
    cell7.innerHTML = animal.habitat; 
   
}