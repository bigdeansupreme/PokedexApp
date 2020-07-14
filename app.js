// global variables
const pokeContainer = document.querySelector('.all-pokemon-container')
const gen1Url = 'https://pokeapi.co/api/v2/pokemon?limit=151'
const gen2Url = 'https://pokeapi.co/api/v2/pokemon/?limit=100&offset=151'
const gen3Url = 'https://pokeapi.co/api/v2/pokemon/?limit=135&offset=251'
const shinySwitch = document.querySelector('input[type="checkbox"]')
const gen1Btn = document.getElementById('gen-one')
const gen2Btn = document.getElementById('gen-two')
const gen3Btn = document.getElementById('gen-three')


// fetch list of pokemon urls
const fetchAllPokemon = (url) => {
    allPokemonContainer()
    fetch(url)
    .then(res => res.json())
    .then(allPokemon => {
        allPokemon.results.forEach(pokemon => fetchPokemonData(pokemon))
    })
}


// fetch each pokemon's data from urls
const fetchPokemonData = (pokemon) => {
    let pokeInfoUrl = pokemon.url
    fetch(pokeInfoUrl)
    .then(res => res.json())
    .then(pokeData => renderAllPokemon(pokeData))
    
}

// fetch 1 specific pokemon
const fetch1Pokemon = (e) => {
    let pokeId = e.target.dataset.id
    const specificPokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokeId}/`
    fetch(specificPokemonUrl)
    .then(res => res.json())
    .then(onePokemonData => render1Pokemon(onePokemonData))

}

// display pokemon with data retrieved
const renderAllPokemon = pokeData => {
    createAllGenPokemon(pokeData)
}


// create all pokemon for a generation
const createAllGenPokemon = pokeData => {
    const pokeDiv = document.createElement('div')
    const pokeName = document.createElement('h3')
    const pokeImg = document.createElement('img')
    const pokeNum = document.createElement('p')
    const pokeType = document.createElement('p')
    
    pokeDiv.dataset.id = pokeData.id
    pokeName.dataset.id = pokeData.id
    pokeImg.dataset.id = pokeData.id
    pokeDiv.className = 'pokemon' 
    pokeName.innerText = pokeData.name
    pokeImg.src = pokeData.sprites['front_default']
    pokeNum.innerText = `Pokedex #${pokeData.id}`
    pokeType.innerText = `Type: ${pokeData.types[0].type.name}`
    
    shinySwitch.addEventListener('change', e => {
        if (e.target.checked) {
            pokeImg.src = pokeData.sprites['front_shiny']
        } else {
            pokeImg.src = pokeData.sprites['front_default']
        }
    })
    
    pokeDiv.addEventListener('click', fetch1Pokemon)
    
    pokeDiv.append(pokeName, pokeImg, pokeNum, pokeType)
    pokeContainer.appendChild(pokeDiv)
}

// render 1 specific pokemon with more information
const render1Pokemon = (onePokemonData) => {
    onePokemonContainer()
    console.log(onePokemonData)
    createPokemonName(onePokemonData)
    createPokemonImages(onePokemonData)
    createPokemonTypes(onePokemonData)
    createPokemonStats(onePokemonData)




 
    
}

// create name of one pokemon, slap on dom
const createPokemonName = pokemon => {
    
    const nameDiv = document.createElement('div')
    nameDiv.id = 'name-div'
    const pokemonName = document.createElement('h2')
    pokemonName.className = 'pokemon-name'
    pokemonName.innerText = pokemon.name
    nameDiv.appendChild(pokemonName)
    pokeContainer.appendChild(nameDiv)
}

// create images of one pokemon, slap on dom
const createPokemonImages = pokemon => {
    const imagesDiv = document.createElement('div')
    imagesDiv.id = 'images-div'

    const pokemonFrontImage = document.createElement('img')
    const pokemonBackImage = document.createElement('img')
    pokemonFrontImage.className = 'pokemon-image'
    pokemonBackImage.className = 'pokemon-image'
    pokemonFrontImage.src = pokemon.sprites['front_default']
    pokemonBackImage.src = pokemon.sprites['back_default']

    shinySwitch.addEventListener('change', e => {
        if (e.target.checked) {
            pokemonFrontImage.src = pokemon.sprites['front_shiny']
            pokemonBackImage.src = pokemon.sprites['back_shiny']
        } else {
            pokemonFrontImage.src = pokemon.sprites['front_default']
            pokemonBackImage.src = pokemon.sprites['back_default']
        }
    })

    imagesDiv.append(pokemonFrontImage, pokemonBackImage)
    pokeContainer.appendChild(imagesDiv)
}

// create types of one pokemon, slap on dom
const createPokemonTypes = pokemon => {
    const typesDiv = document.createElement('div')
    typesDiv.id = 'types-div'
    
    pokemon.types.forEach(type => {
        let pokemonType = document.createElement('h4')
        pokemonType.innerText = type.type.name
        typesDiv.append(pokemonType)
    })

    pokeContainer.appendChild(typesDiv)
}

// create stats of one pokemon, slap on dom
const createPokemonStats = onePokemonData => {
    const statsDiv = document.createElement('div')
    statsDiv.id = 'stats-div'

    const baseStats = document.createElement('h3')
    baseStats.innerText = 'Base Stats:'
    statsDiv.appendChild(baseStats)
    
    let counter = 1
    onePokemonData.stats.forEach(stat => {
        let pokemonStat = document.createElement('p')
        pokemonStat.id = `poke-stat-${counter}`
        pokemonStat.innerText = `${stat.stat.name}: ${stat.base_stat}`
        counter++
        statsDiv.append(pokemonStat)
    })

    pokeContainer.appendChild(statsDiv)
}

// refresh container to style for 1 pokemon
const onePokemonContainer = () => {
    pokeContainer.innerHTML = ''
    pokeContainer.className = 'pokemon-container'
}

// refresh container to style all pokemon
const allPokemonContainer = () => {
    pokeContainer.innerHTML = ''
    pokeContainer.className = 'all-pokemon-container'
}

//event listeners

gen1Btn.addEventListener('click', () => {
    fetchAllPokemon(gen1Url)
})

gen2Btn.addEventListener('click', () => {
    fetchAllPokemon(gen2Url)
})

gen3Btn.addEventListener('click', () => {
    fetchAllPokemon(gen3Url)
})














