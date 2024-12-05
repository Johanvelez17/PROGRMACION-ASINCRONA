// Variables y selectores
const searchBtn = document.querySelector("#search-btn"); // Botón de búsqueda
const pokemonInput = document.querySelector("#pokemon-input"); // Input de búsqueda
const result = document.querySelector("#result"); // Contenedor del resultado

// Evento para el botón de búsqueda
searchBtn.addEventListener("click", async () => {
    const pokemonName = pokemonInput.value.trim().toLowerCase(); // Obtener el nombre del Pokémon
    if (pokemonName === "") {
        result.innerHTML = `<p class="text-primary" style="margin:100px 0 0 420px;">Por favor ingresa un nombre de un Pokémon.</p>`;
        return;
    }
    
    try {
        // URL de la API de PokeAPI
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
        
        // Petición a la API
        const response = await fetch(url);
        if (!response.ok) throw new Error("Resultado no encontrado.");
        
        const data = await response.json();
        
        // Desplegar los resultados
        result.innerHTML = `
            <div class="card" style="width: 18rem; background-color:#33AAFFAA; border:1px solid orangered; margin:100px 0 0 440px;box-shadow">
                <img src="${data.sprites.front_default}" class="card-img-top" alt="${data.name}">
                <div class="card-body text-justify">
                    <h5 class="card-title">${data.name.toUpperCase()}</h5>
                    <p class="card-text"><strong>Habilidades:</strong> ${data.abilities.map(ability => ability.ability.name).join(", ")}</p>
                    <p class="card-text"><strong>Poderes:</strong> ${data.moves.slice(0, 5).map(move => move.move.name).join(", ")}</p>
                </div>
            </div>
        `;
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        result.innerHTML = `<p class="text-white bg-secondary w-25  fw-bold" style="margin:100px 0 0 440px;">¡Error en la búsqueda. Ingresa el nombre correctamente!.</p>`;
    }
});
