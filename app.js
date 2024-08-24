document.addEventListener('DOMContentLoaded', () => {
    //list all card options
    const cardArray = [
        { name: 'fries', content: "🍟" },
        { name: 'cheeseburger', content: "🍔" },
        { name: 'ice-cream', content: "🍦" },
        { name: 'pizza', content: "🍕" },
        { name: 'milkshake', content: "🥤" },
        { name: 'hotdog', content: "🌭" },
        { name: 'fries', content: "🍟" },
        { name: 'cheeseburger', content: "🍔" },
        { name: 'ice-cream', content: "🍦" },
        { name: 'pizza', content: "🍕" },
        { name: 'milkshake', content: "🥤" },
        { name: 'hotdog', content: "🌭" }
    ]
    // const caedArray = []
    cardArray.sort(() => 0.5 - Math.random())

    const grid = document.querySelector('.grid')
    const resultDisplay = document.querySelector('#result')
    let cardsChosen = []
    let cardsChosenId = []
    let cardsWon = []

    //create your board
    function createBoard() {
        for (let i = 0; i < cardArray.length; i++) {
            let card = document.createElement('div')
            card.style.width = '100px'; // Set the width of the card (optional)
            card.style.height = '100px';
            card.style.border = '2px solid black'; // Set the height of the card (optional)
            card.style.backgroundColor = 'lightblue';
            card.style.display = 'flex';
            card.style.alignItems = 'center';
            card.style.justifyContent = 'center';
            card.style.fontSize = '2em';
            card.setAttribute('data-id', i)
            card.addEventListener('click', flipCard)
            grid.appendChild(card)
        }
    }

    //check for matches
    function checkForMatch() {
        const optionOneId = cardsChosenId[0]
        const optionTwoId = cardsChosenId[1]

        if (optionOneId == optionTwoId) {
            document.querySelector(`[data-id="${optionOneId}"]`).innerHTML = '';
        }
        else if (cardsChosen[0] === cardsChosen[1]) {
            document.querySelector(`[data-id="${optionOneId}"]`).style.backgroundColor = 'green';
            document.querySelector(`[data-id="${optionTwoId}"]`).style.backgroundColor = 'green';
            document.querySelector(`[data-id="${optionOneId}"]`).removeEventListener('click', flipCard)
            document.querySelector(`[data-id="${optionTwoId}"]`).removeEventListener('click', flipCard)
            cardsWon.push(cardsChosen)
        } else {
            // console.log(document.querySelector(`[data-id="${optionOneId}"]`))
            document.querySelector(`[data-id="${optionOneId}"]`).innerHTML = '';
            document.querySelector(`[data-id="${optionTwoId}"]`).innerHTML = '';
        }
        cardsChosen = []
        cardsChosenId = []
        resultDisplay.textContent = cardsWon.length
        if (cardsWon.length === cardArray.length / 2) {
            resultDisplay.textContent = 'Congratulations! You found them all!'
        }
    }

    //flip your card
    function flipCard() {
        let cardId = this.getAttribute('data-id')
        cardsChosen.push(cardArray[cardId].name)
        cardsChosenId.push(cardId)
        this.innerHTML = cardArray[cardId].content;
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500)
        }
    }

    createBoard()
})
