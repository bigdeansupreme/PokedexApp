// global variables
const pokeContainer = document.querySelector('.all-pokemon-container')
const gen1Url = 'https://pokeapi.co/api/v2/pokemon?limit=151'
const gen2Url = 'https://pokeapi.co/api/v2/pokemon/?limit=100&offset=151'
const gen3Url = 'https://pokeapi.co/api/v2/pokemon/?limit=135&offset=251'
const gen4Url = 'https://pokeapi.co/api/v2/pokemon/?limit=107&offset=386'
const gen5Url = 'https://pokeapi.co/api/v2/pokemon/?limit=156&offset=493'
const shinySwitch = document.querySelector('input[type="checkbox"]')
const gen1Btn = document.getElementById('gen-one')
const gen2Btn = document.getElementById('gen-two')
const gen3Btn = document.getElementById('gen-three')
const gen4Btn = document.getElementById('gen-four')
const gen5Btn = document.getElementById('gen-five')

//creating 3 containers for single pokemon display
const pokeInfoContainer = document.createElement('div')
const pokeLeftCardsContainer = document.createElement('div')
const pokeRightCardsContainer = document.createElement('div')
pokeInfoContainer.id = 'poke-info-container'
pokeLeftCardsContainer.id = 'poke-cards-left-container'
pokeRightCardsContainer.id = 'poke-cards-right-container'


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
const fetch1Pokemon = e => {
    let pokeId = e.target.dataset.id
    const specificPokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokeId}/`
    fetch(specificPokemonUrl)
    .then(res => res.json())
    .then(onePokemonData => render1Pokemon(onePokemonData))

}

// const handleErrors = res => {
//     if (!res.ok) {
//         throw Error(res.statusText)
//     }
//     return res
// }

//fetch pokemon cards for that one pokemon
const fetchPokemonCards = e => {
    let name = e.target.parentElement.firstElementChild.innerText
    const pokemonCardUrl = `https://api.pokemontcg.io/v1/cards?name=${name}`
    fetch(pokemonCardUrl)
    .then(res => res.json())
    .then(cardsData => renderCards(cardsData))

}

const fetchPokemonAndCards = e => {
    fetch1Pokemon(e)
    fetchPokemonCards(e)
}

// display pokemon with data retrieved
const renderAllPokemon = pokeData => {
    createAllGenPokemon(pokeData)
}

const renderCards = cardsData => {

    console.log(cardsData)

    for(let i = 0; i < cardsData.cards.length; i++) {
        if(i % 2 === 0) {
            let leftCardImage = document.createElement('img')
            leftCardImage.className = 'card-image-left-side'
            leftCardImage.src = cardsData.cards[i].imageUrl
            pokeLeftCardsContainer.appendChild(leftCardImage)
        } else {
            let rightCardImage = document.createElement('img')
            rightCardImage.className = 'card-image-right-side'
            rightCardImage.src = cardsData.cards[i].imageUrl
            pokeRightCardsContainer.appendChild(rightCardImage)
        }
    }
         

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
    
    pokeDiv.addEventListener('click', fetchPokemonAndCards)
    
    pokeDiv.append(pokeName, pokeImg, pokeNum, pokeType)
    pokeContainer.appendChild(pokeDiv)
}

// render 1 specific pokemon with more information
const render1Pokemon = (pokemon) => {
    onePokemonContainer()
    console.log(pokemon)
    createPokemonName(pokemon)
    createPokemonImages(pokemon)
    createPokemonAbility(pokemon)
    createPokemonTypes(pokemon)
    createPokemonStats(pokemon)

    
 
    
}

// create name of one pokemon, slap on dom
const createPokemonName = pokemon => {
    
    const nameDiv = document.createElement('div')
    nameDiv.id = 'name-div'
    const pokemonName = document.createElement('h2')
    pokemonName.className = 'pokemon-name'
    pokemonName.innerText = pokemon.name
    nameDiv.appendChild(pokemonName)
    pokeInfoContainer.appendChild(nameDiv)
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
    pokeInfoContainer.appendChild(imagesDiv)
}

// create types of one pokemon, slap on dom
const createPokemonTypes = pokemon => {
    const typesDiv = document.createElement('div')
    typesDiv.id = 'types-div'
    
    pokemon.types.forEach(type => {
        let pokemonType = document.createElement('h4')
        pokemonType.innerText = type.type.name
        switch (pokemonType.innerText) {
            case 'normal':
                pokemonType.style.color = '#f5f5dc'
                break;
            case 'fire':
                pokemonType.style.color = '#ff4500'
                break;
            case 'flying':
                pokemonType.style.color = '#967BB6'
                break;
            case 'water':
                pokemonType.style.color = '#326aff' 
                break;
            case 'grass':
                pokemonType.style.color = '#00b600'
                break;
            case 'electric':
                pokemonType.style.color = '#eef010'
                break;
            case 'ground':
                pokemonType.style.color = '#d59d77'
                break;
            case 'rock':
                pokemonType.style.color = '#88512b'
                break;
            case 'fighting':
                pokemonType.style.color = '#a85f67'
                break;
            case 'ice':
                pokemonType.style.color = '#7fcfff'
                break;
            case 'poison':
                pokemonType.style.color = '#993299'
                break;
            case 'dragon':
                pokemonType.style.color = '#5500ae'
                break;
            case 'bug':
                pokemonType.style.color = '#9cc971'
                break;
            case 'ghost':
                pokemonType.style.color = '#7b5887'
                break;
            case 'psychic':
                pokemonType.style.color = '#f1415f'
                break;
            case 'dark':
                pokemonType.style.color = '#323232'
                break;
            case 'steel':
                pokemonType.style.color = '#a6a6a6'
                break;
            case 'fairy':
                pokemonType.style.color = '#ffc0cb'
                break;     
            default:
                pokemonType.style.color = 'white'

        }
        typesDiv.append(pokemonType)
    })

    pokeInfoContainer.appendChild(typesDiv)
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

    pokeInfoContainer.appendChild(statsDiv)
}

// create ability of one pokemon
const createPokemonAbility = pokemon => {
    const abilityDiv = document.createElement('div')
    abilityDiv.id = 'ability-div'

    const abilityName = document.createElement('h3')
    abilityName.innerText = `ability: ${pokemon.abilities[0].ability.name}`

    abilityDiv.appendChild(abilityName)
    pokeInfoContainer.appendChild(abilityDiv)
}

// refresh container to style for 1 pokemon
const onePokemonContainer = () => {
    pokeContainer.innerHTML = ''
    pokeContainer.append(pokeLeftCardsContainer, pokeInfoContainer, pokeRightCardsContainer)
    pokeContainer.className = 'pokemon-container'
    pokeLeftCardsContainer.innerHTML = ''
    pokeInfoContainer.innerHTML = ''
    pokeRightCardsContainer.innerHTML = ''
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














