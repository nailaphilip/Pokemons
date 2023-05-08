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
  if (choice == "4") {
    limit = generations[3].limit;
    offset = generations[3].offset;
  }
  if (choice == "5") {
    limit = generations[4].limit;
    offset = generations[4].offset;
  }
  if (choice == "6") {
    limit = generations[5].limit;
    offset = generations[5].offset;
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
  const filteredData = json.filter((pokemon) => {
    const searchValue = searchInput.value.toLowerCase();
    return pokemon.types.some((type) =>
      type.type.name.toLowerCase().includes(searchValue)
    );
  });

  pokeGrid.innerHTML = filteredData
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

searchInput.addEventListener("input", () => {
  const currentChoice = document.querySelector(".btn.active").id;
  buttonPressed({ target: { id: currentChoice } });
});
