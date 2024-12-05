let cartas = document.querySelector("#cartas"); //tomamos el section
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");

let limit = 10;
let offset = 1;

previous.addEventListener("click", () => {
  console.log(offset);
  if (offset != 1) {
    offset -= 9;
    limit -=9;
    removeChildNodes(cartas);
    getCards(offset, limit);
  }
});

next.addEventListener("click", () => {
  console.log(offset);
  offset += 9;
  limit +=9;
  removeChildNodes(cartas);
  getCards(offset, limit);
});

function removeChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

//crear una funcion asincrona para traer los datos de la api
async function getCards(inicio, fin) {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/photos"); //hacemos la petición
    //coger las 10 primeras cartas de la api
    const data = await response.json();
    console.log(data);
    const cards = await data.slice(inicio, fin);
    console.log(cards);
    //mostrar las cartas en el dom
    cards.forEach((card) => {
      const tarjeta = document.createElement("div");
      tarjeta.classList.add("card", "my-3", "shadow"); //<div class="card my-3 shadow" aria-hidden="true" style="width: 18rem;">
      tarjeta.style = "width: 18rem;";
      tarjeta.setAttribute("aria-hidden", "true");
      tarjeta.innerHTML = `
            <img src="${card.url}" class="card-img-top placeholder" alt="..." width="286" height="286">
            <div class="card-body">
              <h5 class="card-title placeholder-glow">
                <span class="col-6 placeholder w-100 placeholder-lg">${card.title}</span>
              </h5>
              <p class="card-text placeholder-glow">
              </p>
            </div>
          </div>
            `;
      //agregar las cartas al dom
      cartas.appendChild(tarjeta);
      console.log(card.title);
      console.log(card.url);
    });
  } catch (error) {
    console.log(error);
  }
}

getCards(offset, limit);