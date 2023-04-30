let body = document.querySelector('body')
let suggestions = document.querySelectorAll('#suggestion')
let featureContainer = document.querySelector('#feature-container')
let searchInput = document.querySelector('#search-input')
let autoContainer = document.querySelector('#autocomplete')
let charBox = document.querySelectorAll('#charBox')
let spellBox = document.querySelector('#spellBox')
let hsBox = document.querySelectorAll('#hsBox')
let li = document.querySelectorAll('li')
let btn = document.querySelector('#charInfoBtn')
let popupContainer = document.querySelector('#popup')
let cardImg = document.querySelector('#popup-img')
let cardName = document.querySelector('#card-name')
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

// spans



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
            console.log(data)

            cardName.innerText = curr.name
            altName.innerText = curr.alternate_names[0]
            // cardBday.innerText
            cardGenderS.innerText = curr.gender
            cardAncestryS.innerText = curr.ancestry
            if (curr.alive === true) {
                cardAliveS.innerText = 'Alive'
            } else {
                cardAliveS.innerText = 'Deceased'
            }
            cardSpeciesS.innerText = curr.species
            cardActorS.innerText = curr.actor
            if (curr.hogwartsStudent === true && curr.hogwartsStaff === false) {
                cardStudentS.innerText = 'Student'
            } else if (curr.hogwartsStudent === false && curr.hogwartsStaff === true) {
                cardStudentS.innerText = 'Staff'
            }
            cardHouseS.innerText = curr.house
            cardPatronusS.innerText = curr.patronus
            if (curr.wand.length !== null) {
                wandLength.innerText = `${curr.wand.length}"`
            } else if (curr.wand.length === null) {
                wandLength.innerText = ` "`
            }
            wandWood.innerText = curr.wand.wood
            wandCore.innerText = curr.wand.core

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
        btn.style.border = '1px solid white'

        
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
                
            }
        }) 
    }
    
    
    console.log(suggestions)
    
    
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