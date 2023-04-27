let featureContainer = document.querySelector('#feature-container')
let searchInput = document.querySelector('#search-input')
let autoContainer = document.querySelector('#autocomplete')
let charBox = document.querySelectorAll('#charBox')
let spellChar = document.querySelector('#spellChar')
let hsBox = document.querySelectorAll('#hsBox')



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
    // characters.push(data)
    
    data.forEach(item => {
        // console.log(item)
        // let obj = {}
        // obj.id = item.id
        // obj.name = item.name
        characters.push(item)
    })
    
    
    
}

getCharacters()


let loadCharBox = async () => {
    let response = await fetch(characterUrl)
    let data = await response.json()
    
    // CHARACTER BOXES 
    charBox.forEach(box => {
        let random = Math.floor(Math.random() * data.length)
        let curr = data[random]
        let h1 = document.createElement('h1')
        let p = document.createElement('p')
        let btn = document.createElement('button')
        btn.setAttribute('id', 'charInfoBtn')
        h1.innerText = curr.name
        p.innerText = curr.house
        btn.innerText = 'More Details'
        box.appendChild(h1)
        box.appendChild(p)
        box.appendChild(btn)

        // styles
        if (curr.image !== '') {
            box.style.backgroundImage = `url('${curr.image}')`
            box.style.backgroundSize = 'cover'
        } else {
            box.style.backgroundImage = `url('./images/hp-char-alt.jpeg')`
            box.style.backgroundSize = 'cover'
        }
        h1.style.fontSize = '2.5rem'
        h1.style.backgroundClip = 
        btn.style.backgroundColor = 'transparent'
        btn.style.color = 'white'
        btn.style.border = '1px solid white'

        console.log(curr)
    })
}

loadCharBox()


let getHouses = async () => {
    let response = await fetch(houseUrl)
    let data = await response.json()
    houses.push(data)
    // console.log(data)

    // hsBox.forEach(box => {
    //     let h1 = document.createElement('h1')
    //     // let
    // })
}

getHouses()




let getSpells = async () => {
    let response = await fetch(spellUrl)
    let data = await response.json()
    spells.push(data)
    // console.log(data)
    let loadSpell = () => {
        let random = Math.floor(Math.random() * data.length)
        let curr = data[random]

        let h1 = document.createElement('h1')
        let p = document.createElement('p')
        h1.innerText = curr.name
        p.innerText = curr.description
        spellChar.appendChild(h1)
        spellChar.appendChild(p)
    }
    loadSpell()
}

getSpells()


/* -------------------------------------------------------------------------- */
/*                               EVENT LISTENERS                              */
/* -------------------------------------------------------------------------- */



let matches = []

searchInput.addEventListener('keyup', (event) => {
    autoContainer.innerHTML = ''
    let matchedList = document.createElement('ul')
    autoContainer.appendChild(matchedList)
    let value = searchInput.value
    console.log(event.keyCode)
    if (event.keyCode >= 48 && event.keyCode <= 90) {
        console.log(value)
        characters.filter(character => {
            if (character['name'].includes(value)) {
                let li = document.createElement('li')
                li.setAttribute('id', 'suggestion')
                li.innerText = character.name
                matchedList.appendChild(li)
                
            }
        }) 
    }
    
  
    
})




/* -------------------------------------------------------------------------- */
/*                                APP FUNCTIONS                               */
/* -------------------------------------------------------------------------- */

let houseBox = () => {
    let houses = ['Gryffindor', 'Slytherin', 'Ravenclaw', 'Hufflepuff']

    // console.log(curr)
    hsBox.forEach(box => {
        let random = Math.floor(Math.random() * houses.length)
        let curr = houses[random]
        let h1 = document.createElement('h1')
        h1.innerText = curr

        box.appendChild(h1)

        // styles
        if (curr === 'Gryffindor') {
            box.style.backgroundImage = `url('./images/g-box.jpeg')`
            box.style.backgroundSize = 'cover'
        } else if (curr === 'Slytherin') {
            box.style.backgroundImage = `url('./images/s-box.jpeg')`
            box.style.backgroundSize = 'cover'
        } else if (curr === 'Ravenclaw') {
            box.style.backgroundImage = `url('./images/r-box.jpeg')`
            box.style.backgroundSize = 'cover'
        } else if (curr === 'Hufflepuff') {
            box.style.backgroundImage = `url('./images/h-box.jpeg')`
            box.style.backgroundSize = 'cover'
        }
    })
}

houseBox()