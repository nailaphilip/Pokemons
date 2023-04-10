const pokeGrid = document.querySelector('#pokemonGrid');
const buttons = document.querySelectorAll('.btn');


const buttonPressed = e => {
    choice = e.target.id;
    console.log(choice)
    if (choice == '1') {
            limit=generations[0].limit;
            offset=generations[0].offset;
        };


    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${generations[1].limit}&offset=${generations[1].offset}`)
.then(res => res.json())
.then(json => {
    const fetchData = json.results.map(item => {
        return fetch(item.url).then(res => res.json())
    })

    Promise.all(fetchData).then(res => {
        pokeData(res);
        console.log(res)} 
    )});

}


for (let button of buttons) {
    button.addEventListener("click", buttonPressed);
}


const generations = [
    { limit: 151, offset:0 },
    { limit: 100, offset:151 },
    { limit: 135, offset:251 },
    { limit: 107, offset:386 },
    { limit: 156, offset:493 },
    { limit: 72, offset:649 },
    { limit: 88, offset:721 },
    { limit: 96, offset:809 },
    { limit: 3, offset:905 },
]

 




/*     userChoice = buttonPressed();
 */    /* console.log(userChoice) */
    // if (userChoice == '1') {
    //     limit=generations.limit[0];
    //     offset=generations.offset[0];
    // }






const pokeData = (json) => {
    pokeGrid.innerHTML = json.map(pokemon => `<div class="pokemonGrid"> 
    <div class="pokemonCard">
        <img src=${pokemon.sprites.other.dream_world.front_default} alt="cat">
    <h2>${pokemon.id} ${pokemon.name}</h2></div>
    </div>`).join('');
}

