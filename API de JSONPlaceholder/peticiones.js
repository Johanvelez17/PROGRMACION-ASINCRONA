// //variables globales
// let boton = document.querySelector(".btn-consultar");
// let resultado = document.querySelector(".resultado");

// //evento al boton
// boton.addEventListener("click", ()=>{
//    // alert("estamos melos");
//    peticion();
// });

//funcion para realizar la peticion a la API
function peticion() {
    let url = "http://localhost/apiPeliculas/datos.txt";
    //metodo fetch para realizar la peticion
    fetch(url, {
        method:"GET",
        headers: {
            "Content-type":"application/json"
        }
    }).then((d)=> d.json())
    .then((peliculas)=>{
        peliculas.forEach((peli, pos)=>{
            resultado.innerHTML += `
                <div class="card" style="width: 18rem;">
                    <img src="${peli.imagen}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${peli.titulo}</h5>
                        <p class="card-text">${peli.lanzamiento} - ${peli.genero}</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            `;
        });
    }).catch((error)=>console.log(error))
}

// Seleccionar los elementos necesarios del DOM
const resultado = document.querySelector(".resultado");
const boton = document.querySelector(".btn-consultar");

// Evento al botón para cargar las fotos
boton.addEventListener("click", async () => {
    try {
        // Consumir la API
        const response = await fetch("https://jsonplaceholder.typicode.com/photos");
        const photos = await response.json();

        // Seleccionar las primeras 10 fotos
        const selectedPhotos = photos.slice(0, 10);

        // Generar el HTML dinámico
        const galleryHTML = selectedPhotos.map(photo => `
            <div class="card" style="width: 18rem; margin: 10px;">
                <img src="${photo.thumbnailUrl}" class="card-img-top" alt="${photo.title}">
                <div class="card-body">
                    <h5 class="card-title">ID: ${photo.id}</h5>
                    <p class="card-text">${photo.title}</p>
                </div>
            </div>
        `).join("");

        // Insertar el HTML generado en el contenedor
        resultado.innerHTML = galleryHTML;
    } catch (error) {
        console.error("Error al cargar las fotos:", error);
        resultado.innerHTML = `<p class="text-danger">Error al cargar las fotos.</p>`;
    }
});

// (Opcional: Otros fragmentos de código existentes en peticiones.js pueden mantenerse aquí)
