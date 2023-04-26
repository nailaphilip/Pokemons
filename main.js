const pokeGrid = document.querySelector("#pokemonGrid");
const buttons = document.querySelectorAll(".btn");
const searchInput = document.querySelector(".input");

const buttonPressed = (e) => {
  choice = e.target.id;
  console.log(choice);
  if (choice == "1") {
    limit = generations[0].limit;
    offset = generations[0].offset;
  }
  if (choice == "2") {
    limit = generations[1].limit;
    offset = generations[1].offset;
  }
  if (choice == "3") {
    limit = generations[2].limit;
    offset = generations[2].offset;
  }

  fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
    .then((res) => res.json())
    .then((json) => {
      const fetchData = json.results.map((item) => {
        return fetch(item.url).then((res) => res.json());
      });

      Promise.all(fetchData).then((res) => {
        pokeData(res);
        console.log(res);
      });
    });
};

for (let button of buttons) {
  button.addEventListener("click", buttonPressed);
}

const generations = [
  { limit: 151, offset: 0 },
  { limit: 100, offset: 151 },
  { limit: 135, offset: 251 },
  { limit: 107, offset: 386 },
  { limit: 156, offset: 493 },
  { limit: 72, offset: 649 },
  { limit: 88, offset: 721 },
  { limit: 96, offset: 809 },
  { limit: 3, offset: 905 },
];

const pokeData = (json) => {
  pokeGrid.innerHTML = json
    .map(
      (pokemon) => `<div class="pokemonGrid"> 
    <div class="pokemonCard">
        <img src=${pokemon.sprites.other.dream_world.front_default} alt="cat">
    <h2>${pokemon.id} ${pokemon.name} </h2> <p>${pokemon.types
        .map((type) => type.type.name)
        .join(", ")}</p></div>
    </div>`
    )
    .join("");
  console.log(pokeData);
};

searchInput.addEventListener("input", (e) => {
  let value = e.target.value;

  if (value && value.trim().length > 0) {
    value = value.trim().toLowerCase();
    data = pokeData();
    const filteredPokemon = data.results.filter((pokemon) => {
      return pokemon.types.some((type) => type.type.name === value);
    });
    filteredPokemon.forEach((pokemon) => {
      console.log(pokemon.type);
    });
  }
});

//   fetch('https://pokeapi.co/api/v2/pokemon')
//   .then(response => response.json())
//   .then(data => {
//     const desiredType = 'fire';
//     const filteredPokemon = data.results.filter(pokemon => {
//       return pokemon.types.some(type => type.type.name === desiredType);
//     });
//     filteredPokemon.forEach(pokemon => {
//       console.log(pokemon.name);
//     });
//   });
// });

// pokemon.types.filter((type) => {
//     return type.type.name.includes(value);
