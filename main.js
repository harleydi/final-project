let body = document.querySelector('body')
let suggestions = document.querySelectorAll('#suggestion')
let featureContainer = document.querySelector('#feature-container')
let searchInput = document.querySelector('#search-input')
let mainCharSubmit = document.querySelector('#main-char-submit')
let mainSpellSubmit = document.querySelector('#main-spell-submit')
let autoContainer = document.querySelector('#autocomplete')
let charBox = document.querySelectorAll('#charBox')
let spellBox = document.querySelector('#spellBox')
let hsBox = document.querySelectorAll('#hsBox')
let li = document.querySelectorAll('li')
let btn = document.querySelector('#charInfoBtn')
let popupContainer = document.querySelector('#popup')
let popupImg = document.querySelector('#popup-img')
let cardImg = document.querySelector('#popup-img')
let cardName = document.querySelector('#card-name')
let favorite = document.querySelector('#favorite > .fa-star')
let altName = document.querySelector('#alt-name')
let cardBday = document.querySelector('#card-bday')
let cardGender = document.querySelector('#card-gender')
let cardGenderS = document.querySelector('#card-gender-s')
let cardAncestry = document.querySelector('#card-ancestry')
let cardAncestryS = document.querySelector('#card-ancestry-s')
let cardAlive = document.querySelector('#card-alive')
let cardAliveS = document.querySelector('#card-alive-s')
let cardSpecies = document.querySelector('#card-species')
let cardSpeciesS = document.querySelector('#card-species-s')
let cardActor = document.querySelector('#card-actor')
let cardActorS = document.querySelector('#card-actor-s')
let cardStudent = document.querySelector('#card-student')
let cardStudentS = document.querySelector('#card-student-s')
let cardHouse = document.querySelector('#card-house')
let cardHouseS = document.querySelector('#card-house-s')
let cardPatronus = document.querySelector('#card-patronus')
let cardPatronusS = document.querySelector('#card-patronus-s')
let cardWand = document.querySelector('#card-wand')
let wandLength = document.querySelector('#wand-length-s')
let wandWood = document.querySelector('#wand-wood-s')
let wandCore = document.querySelector('#wand-core-s')
let closeCardBtn = document.querySelector('#close-card-btn')
let closeFavBtn = document.querySelector('#close-fav-btn')
let favoritesBar = document.querySelector('#favorites-bar')
let favoriteBtn = document.querySelector('#fav-btn')
let spellPopup = document.querySelector('#spell-popup')
let closeScardBtn = document.querySelector('#close-scard-btn')
let spellName = document.querySelector('#spell-card-name')
let spellDesc = document.querySelector('#spell-card-description')



let favArr = []



let currCardInfo = ''



/* -------------------------------------------------------------------------- */
/*                                    URLS                                    */
/* -------------------------------------------------------------------------- */
let characterUrl = 'https://hp-api.onrender.com/api/characters'
let oneCharacterUrl = 'https://hp-api.onrender.com/api/character/'
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
        item['favorite'] = false
        characters.push(item)
        // console.log(item)
    })
    
    mainCharSubmit.addEventListener('click', async (event) => {
        event.preventDefault()
        
        
        let input = searchInput.value.toLowerCase()

        
        popupContainer.style.visibility = 'visible'
        characters.forEach(  el => {
            if (el.name.toLowerCase() === input) {
                // let respone = await fetch(`https://hp-api.onrender.com/api/character/${el.id}`)
                // let charInfo = await respone.json()
                let charInfo = el
                console.log(charInfo)
                    
                fillCard(charInfo[0])
            }
        })
  
        

        closeCardBtn.addEventListener('click', () => {
            popupContainer.style.visibility = 'hidden'
        })

        searchInput.value = ''
        autoContainer.innerHTML = ''
    })

    
    
    
}

getCharacters()


let loadCharBox = async () => {
    let response = await fetch(characterUrl)
    let data = await response.json()
    
    
    // CHARACTER BOXES 
    charBox.forEach( async (box) => {
        let random = Math.floor(Math.random() * data.length)
        let curr = data[random]
        // console.log(curr.id)
        let respone = await fetch(oneCharacterUrl + curr.id)
        let oneData = await respone.json()

        // console.log(oneData)

        let boximg = document.createElement('img')
        let div = document.createElement('div')
        let h1 = document.createElement('h1')
        let p = document.createElement('p')
        let btn = document.createElement('button')
        boximg.setAttribute('class', 'card-img')
        div.setAttribute('class', 'card-img-overlay')
        btn.setAttribute('id', 'charInfoBtn')
        h1.innerText = curr.name
        p.innerText = curr.house
        btn.innerText = 'More Details'

        div.appendChild(h1)
        div.appendChild(p)
        div.appendChild(btn)
        box.appendChild(boximg)
        box.appendChild(div)

        // Load individual character profile

        btn.addEventListener('click', async () => {
            popupContainer.style.visibility = 'visible'
            let respone = await fetch(oneCharacterUrl + curr.id)
            let data = await respone.json()
            // console.log(data)

            
            fillCard(data[0])

            closeCardBtn.addEventListener('click', () => {
                popupContainer.style.visibility = 'hidden'
            })

        })
        

        // styles
        if (curr.image !== '') {
            boximg.src = `${curr.image}`
            // box.style.backgroundSize = 'cover'
        } else {
            boximg.src = './images/hp-char-alt.jpeg'
            // box.style.backgroundSize = 'cover'
        }
        h1.style.fontSize = '2.5rem'
        h1.style.backgroundClip = 
        btn.style.backgroundColor = 'transparent'
        btn.style.color = 'white'
        

        
        // console.log(curr)
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
    
    // Load spell box
    let loadSpell = () => {
        let random = Math.floor(Math.random() * data.length)
        let curr = data[random]

        let h1 = document.createElement('h1')
        let p = document.createElement('p')
        h1.innerText = curr.name
        p.innerText = curr.description
        spellBox.appendChild(h1)
        spellBox.appendChild(p)
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
    

    if (event.keyCode >= 48 && event.keyCode <= 90) {
        console.log(value)
        characters.filter(character => {
            if (character['name'].includes(value)) {
                let li = document.createElement('li')
                li.setAttribute('id', 'suggestion')
                li.innerText = character.name
                matchedList.appendChild(li)

                li.addEventListener('click', () => {
                    searchInput.value = li.innerText
                })
                
            }
        })

        
        spells[0].filter(spell => {
            // console.log(spell.name)
            if (spell.name.includes(value)) {
                let li = document.createElement('li')
                li.setAttribute('id', 'suggestion')
                li.style.color = 'green'
                li.innerText = spell.name
                matchedList.appendChild(li)

                li.addEventListener('click', () => {
                    searchInput.value = li.innerText
                })
                
            }
        })
    }

    
    
})

mainSpellSubmit.addEventListener('click', (event) => {
    event.preventDefault()
    spellPopup.style.visibility = 'visible'
    spells[0].forEach(spell => {
        if (searchInput.value.toLowerCase() === spell.name.toLowerCase()) {
            fillSpellCard(spell)
            console.log(spell.name)
        }
    })

    closeScardBtn.addEventListener('click', () => {
        spellPopup.style.visibility = 'hidden'
    })
})







favoriteBtn.addEventListener('click', () => {
    favoritesBar.style.visibility = 'visible'

    
    favArr.forEach(fave => {
        let div = document.createElement('div')
        let img = document.createElement('img')
        let name = document.createElement('h2')
        img.setAttribute('class', 'img-thumbnail')
        img.setAttribute('id', 'fave-card-img')
        div.setAttribute('id', 'fav-card')
        div.setAttribute('class', 'card')
        if (fave.image !== '') {
            img.src = fave.image
        } else {
            img.src = './images/missing-card-img.webp'
        }
        name.innerText = fave.name
        div.appendChild(img)
        div.appendChild(name)
        favoritesBar.appendChild(div)

    })
})

closeFavBtn.addEventListener('click' , () => {
    favoritesBar.style.visibility = 'hidden'
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
        
        let img = document.createElement('img')
        

        box.appendChild(img)
        

        // styles
        if (curr === 'Gryffindor') {
            img.src = './images/g-box.jpeg'
        } else if (curr === 'Slytherin') {
            img.src = './images/s-box.jpeg'
        } else if (curr === 'Ravenclaw') {
            img.src = './images/r-box.jpeg'
        } else if (curr === 'Hufflepuff') {
            img.src = './images/h-box.jpeg'
        }

        img.style.height = '100%'
    })
}

houseBox()


function fillCard(char) {
    currCardInfo = char
    cardName.innerText = char.name
    if (char.favorite === false) {
        favorite.style.color = 'black'
    } else if (char.favorite === true) {
        favorite.style.color = '#ffc007'
    }
    if (char.image !== '') {
        popupImg.src = char.image
    } else {
        popupImg.src = './images/missing-card-img.webp'
    }
    
    if (char.alternate_names) {
        altName.innerText = char.alternate_names[0]
    } else {
        altName.innerText = ''
    }
    // cardBday.innerText
    cardGenderS.innerText = char.gender
    cardAncestryS.innerText = char.ancestry
    if (char.alive === true) {
        cardAliveS.innerText = 'Alive'
    } else {
        cardAliveS.innerText = 'Deceased'
    }
    cardSpeciesS.innerText = char.species
    cardActorS.innerText = char.actor
    if (char.hogwartsStudent === true && char.hogwartsStaff === false) {
        cardStudentS.innerText = 'Student'
    } else if (char.hogwartsStudent === false && char.hogwartsStaff === true) {
        cardStudentS.innerText = 'Staff'
    }
    cardHouseS.innerText = char.house
    cardPatronusS.innerText = char.patronus
    if (char.wand['length'] !== null) {
        wandLength.innerText = `${char.wand.length}"`
    } else if (char.wand['length'] === null) {
        wandLength.innerText = ` "`
    }
    wandWood.innerText = char.wand.wood
    wandCore.innerText = char.wand.core

    favorite.addEventListener('click', () => {
        if (char.favorite === false) {
            favorite.style.color = '#ffc007'
            char.favorite = true
            favArr.push(char)
            console.log(char)
        } else {
            favorite.style.color = 'black'
            char.favorite = false
            console.log(char)
        }
    })
    
}

function fillSpellCard(char) {
    spellName.innerText = char.name
    spellDesc.innerText = char.description
}


