// Función saludar: Con esta función el usuario ingresará sus datos para saber su signo.
function saludar(e){
    e.preventDefault()
let valorNombre = $("#nombreUsuario").val();
let valorYear = $("#yearUsuario").val();

if (valorYear % 12 == 1){
    signoZodiacal = "Gallo";}
else if (valorYear % 12 == 2){
    signoZodiacal = "Perro";}
else if (valorYear % 12 == 3){
    signoZodiacal = "Cerdo";}
else if (valorYear % 12 == 4){
    signoZodiacal = "Rata";}
else if (valorYear % 12 == 5){
    signoZodiacal = "Buey";}
else if (valorYear % 12 == 6){
    signoZodiacal = "Tigre";}
else if (valorYear % 12 == 7){
    signoZodiacal = "Conejo";}
else if (valorYear % 12 == 8){
    signoZodiacal = "Dragón";}
else if (valorYear % 12 == 9){
    signoZodiacal = "Serpiente";}
else if (valorYear % 12 == 10){
    signoZodiacal = "Caballo";}
else if (valorYear % 12 == 11){
    signoZodiacal = "Cabra";}
else {
    signoZodiacal = "Mono";}

    console.log("El usuario es " + valorNombre +" y su año de nacimiento es el "+ valorYear);
    
//Evento boton: Con este evento el texto con los valores del usuario aparecerán en el modal.
$("#salidaSigno").html("").append(`
    <div class="justify-content-center">
        <p color="black">Hola ${valorNombre}! Tu signo del horóscopo chino es ${signoZodiacal}!
        Si quieres saber más, quédate en nuestra web.</p>
    </div>
`);
}   
  
//Evento saludar: este evento llama a la función Saludar.
let botonInteractivo = document.getElementById("botonEnviar");
botonInteractivo.addEventListener("click",saludar);


//Cards DOM AJAX
// El array a usar para las cards se encuentra en signos.json
let signos = []

$.get('signos.json', function(response,estado) {
    if (estado == "success"){
        console.log("La solicitud para acceder a signos.json fué exitosa")
    }
    signos = response
    mostrarSignos(signos)

})

function mostrarSignos(signosChinos){
    $("#animalCard").html("")
    for (const signo of signosChinos) {
        $("#animalCard").append(`
            <div class="signo" id="fila1">
                <div class="col">
                          <div class="card h-100">
                            <img src=${signo.img} class="card-img-top" alt="...">
                            <div class="card-body">
                            <h5>${signo.signoAnimal}</h5>
                            <p>${signo.caracteristica}</p>
                            </div>
                            
                            <!-- Boton con modal -->
                            <button type="button" class="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#modalFortuna">
                            Elementos de suerte
                            </button>
                            <!-- Modal -->
                                <div class="modal fade" id="modalFortuna" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="modalCaracteristicasLabel">Fortuna para ${signo.signoAnimal}</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                        <ul>
                                        <li>Número de suerte: ${signo.numero}</li>   
                                        <li>Color de suerte: ${signo.color}</li>  
                                        <li>Flor de suerte: ${signo.flor}</li>  
                                        <li>Dirección de suerte: ${signo.direccion}</li> 
                                        <li>Mes lunar de suerte: ${signo.mes}</li>      
                                        </ul>
                                    
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-dark" data-bs-dismiss="modal">Volver</button>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            <a class="btn btn-outline-dark" id="btn${signo.id}">Ver compatibilidad</a>
                          </div>
                        </div>
                
            </div>
        `);
       
 
    //Boton "Compatibilidad": Con esta función se activará la función Filter.
    $(`#btn${signo.id}`).on('click', function(){
        filtrarCompatibles(signo.signoAnimal);
        })   
    }
}

// Función Filter: Se usará para filtrar los signos compatibles según el Array.
function filtrarCompatibles(signo){
    const signosFiltrados = signos.filter( item => item.compatibilidad.includes(signo))
    mostrarSignos(signosFiltrados)
}

$(`#btnVolver`).on('click', ()=>{mostrarSignos(signos)})

//Local Storage: Se almacenarán los signos para escalabilidad del proyecto

const almacenLocal = (clave, valor) => { localStorage.setItem(clave, valor)};

for(const signo of signos){
    almacenLocal(signo.signoAnimal, JSON.stringify(signo));
}

// Carga
$(document).ready(function(){
    console.log("Cargado del DOM");
});
$(window).on('load', function(){
    console.log("Se cargó todo incluyendo imágenes.");
});


// Animación JQuery
// CSS
$("#signos").css("background-color", "#000");

// Concatenado
$("#titulo1").animate({
    opacity: '0.8',
    height: '2.5em',
},"2000"
);

$('#textoIntro').hide()
.delay(2000)
.fadeIn(2000);

$('#boton1').hide()
.delay(4000)
.fadeIn(2000);

$('#animalCard').hide()
.delay(6000)
.fadeIn(1000);
