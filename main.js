let featureContainer = document.querySelector('#feature-container')
let searchInput = document.querySelector('#search-input')
let autoContainer = document.querySelector('#autocomplete')
let suggestions = document.querySelectorAll('#suggestion')

/* -------------------------------------------------------------------------- */
/*                                    URLS                                    */
/* -------------------------------------------------------------------------- */
let characterUrl = 'https://hp-api.onrender.com/api/characters'
let oneCharacterUrl = 'https://hp-api.onrender.com/api/character/:id'
let houseUrl = 'https://hp-api.onrender.com/api/characters/house/:house'
let spellUrl = 'https://hp-api.onrender.com/api/spells'


/* -------------------------------------------------------------------------- */
/*                                   ARRAYS                                   */
/* -------------------------------------------------------------------------- */
let characters = []
let houses = []
let spells = []



/* -------------------------------------------------------------------------- */
/*                                API FUNCTIONS                               */
/* -------------------------------------------------------------------------- */

let getCharacters = async () => {
    let response = await fetch(characterUrl)
    let data = await response.json()
    characters.push(data)
    // console.log(data)
}

getCharacters()


let getOneCharacter = async () => {
    let response = await fetch(characterUrl)
    let data = await response.json()
    characters.push(data)
    // console.log(data)
}

getCharacters()


let getHouses = async () => {
    let response = await fetch(houseUrl)
    let data = await response.json()
    houses.push(data)
    // console.log(data)
}

getHouses()


let getSpells = async () => {
    let response = await fetch(spellUrl)
    let data = await response.json()
    houses.push(data)
    // console.log(data)
}

getSpells()




/* -------------------------------------------------------------------------- */
/*                                APP FUNCTIONS                               */
/* -------------------------------------------------------------------------- */






/* -------------------------------------------------------------------------- */
/*                               EVENT LISTENERS                              */
/* -------------------------------------------------------------------------- */



