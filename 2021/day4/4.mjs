import {processData} from '../FileReader.mjs'

function checkWinner(cards){
    for(let cardIndex = 0; cardIndex<cards.length;cardIndex++) {
        for(let i=0; i<5; i++){
            let rowMatches = cards[cardIndex][i].filter(x => !x ).length
            let colMatches = cards[cardIndex].filter(row => !row[i]).length
            
            if(colMatches >= 5 || rowMatches >= 5){
                console.log(`THERE SHOULD BE A WINNER:  CardIndex: ${cardIndex}`)
                return cardIndex
            }
        }
    }
}

function calculateAnswer(card, winningCall){
    console.log(card, winningCall)
    let remainingNumberArray = card.map(y => y.filter(z => !!z)).join(',').split(',').filter(y => !!y).map(y => parseInt(y))
    
    console.log(remainingNumberArray)

    let arrayTotal = remainingNumberArray.reduce((acc,val)=> acc+val, 0)

    console.log(arrayTotal)

    return arrayTotal * parseInt(winningCall)
}

processData('day-4-input.txt').then(inputArr => {
    let bingoCalls = inputArr[0].split(',')
    // console.log(bingoCalls)

    let rawCards = inputArr.slice(2, inputArr.length)
    let cards = []
    let cardCounter = 0;

    cards[cardCounter] = []

    rawCards.forEach(c => {
        if(c == ""){
            cardCounter++
            cards[cardCounter] = []
        }else{
            cards[cardCounter].push(c.split(' ').filter(x => !!x))
        }
    })

    console.log(`${cards.length} total cards`)

    let winningCardIndex = null
    let winningCall = null

    bingoCalls.forEach(call => {
        if(!winningCardIndex){
            cards.forEach((card, cardIndex) => {
                card.forEach((row, rowIndex) => {
                    row.forEach((number, columnIndex) => {
                        //console.log(number == call)
                        if(number == call && winningCardIndex == null){
                            cards[cardIndex][rowIndex][columnIndex] = ""
                            winningCardIndex = checkWinner(cards)
                        }
                    })
                })
            })
            // winningCardIndex = checkWinner(cards, matchIndeces)
            if(winningCardIndex != null){
                winningCall=call;
            }

        }
    })

    let answer = calculateAnswer(cards[winningCardIndex], winningCall)

    console.log(`Answer: ${answer}`)
})

