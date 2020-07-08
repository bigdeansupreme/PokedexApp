const pokeContainer = document.querySelector('.pokemon-container')
const gen1 = 'https://pokeapi.co/api/v2/pokemon?limit=151'


// fetch  gen1 pokemon
const fetchGen1Pokemon = () => {
    fetch(gen1)
    .then(res => res.json())
    .then(allPokemon => {
        allPokemon.results.forEach(pokemon => fetchGen1PokemonData(pokemon))
    })
}

// fetch each pokemon's data
const fetchGen1PokemonData = (pokemon) => {
    let pokeInfoUrl = pokemon.url
    fetch(pokeInfoUrl)
    .then(res => res.json())
    .then(pokeData => renderPokemon(pokeData))

}

// display pokemon with data retrieved
const renderPokemon = pokeData => {
    const pokeDiv = document.createElement('div')
    const pokeName = document.createElement('h3')
    const pokeImg = document.createElement('img')
    const pokeNum = document.createElement('p')
    const pokeType = document.createElement('p')

    pokeDiv.dataset.id = pokeData.id
    pokeDiv.className = 'pokemon' 
    pokeName.innerText = pokeData.name
    pokeImg.src = pokeData.sprites['front_default']
    pokeNum.innerText = `Pokedex #${pokeData.order}`
    pokeType.innerText = `Type: ${pokeData.types[0].type.name}`

    pokeDiv.append(pokeName, pokeImg, pokeNum, pokeType)
    pokeContainer.appendChild(pokeDiv)
}


fetchGen1Pokemon()