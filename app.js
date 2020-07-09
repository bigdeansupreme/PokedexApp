
const pokeContainer = document.querySelector('.pokemon-container')
const gen1Url = 'https://pokeapi.co/api/v2/pokemon?limit=151'
const gen2Url = 'https://pokeapi.co/api/v2/pokemon/?limit=100&offset=151'
const gen3Url = 'https://pokeapi.co/api/v2/pokemon/?limit=135&offset=251'
const shinySwitch = document.querySelector('input[type="checkbox"]')
const gen1Btn = document.getElementById('gen-one')
const gen2Btn = document.getElementById('gen-two')
const gen3Btn = document.getElementById('gen-three')
// const proxyUrl = 'https://cors-anywhere.herokuapp.com/'


// fetch list of pokemon
const fetchPokemon = (url) => {
    pokeContainer.innerHTML = ''
    fetch(url)
    .then(res => res.json())
    .then(allPokemon => {
        allPokemon.results.forEach(pokemon => fetchPokemonData(pokemon))
    })
}


// fetch each pokemon's data
const fetchPokemonData = (pokemon) => {
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
    // pokeImg.src = pokeData.sprites['front_default']
    pokeImg.className = 'images'
    pokeNum.innerText = `Pokedex #${pokeData.id}`
    pokeType.innerText = `Type: ${pokeData.types[0].type.name}`
    
    shinySwitch.addEventListener('change', e => {
        if (e.target.checked) {
            pokeImg.src = pokeData.sprites['front_shiny']
        } else {
            pokeImg.src = pokeData.sprites['front_default']
        }
    })
    
    pokeDiv.append(pokeName, pokeImg, pokeNum, pokeType)
    pokeContainer.appendChild(pokeDiv)
}

//event listeners

gen1Btn.addEventListener('click', () => {
    fetchPokemon(gen1Url)
})

gen2Btn.addEventListener('click', () => {
    fetchPokemon(gen2Url)
})

gen3Btn.addEventListener('click', () => {
    fetchPokemon(gen3Url)
})














