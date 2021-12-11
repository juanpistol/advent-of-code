import {processData} from '../FileReader.mjs'

function checkWinner(cards, winningCards){
    for(let cardIndex = 0; cardIndex<cards.length;cardIndex++) {
        if(!~winningCards.indexOf(cardIndex)){
            // console.log(`CHECKING WINNER: ${cardIndex}`)

            for(let i=0; i<5; i++){            
                let rowMatches = cards[cardIndex][i].filter(x => !x ).length
                let colMatches = cards[cardIndex].filter(row => !row[i]).length
                
                if(colMatches >= 5 || rowMatches >= 5){
                    console.log(`winner: ${cardIndex}`)

                    return cardIndex
                }
            }
        }
    }
    return null
}

function calculateAnswer(card, winningCall){
    console.log("CALCULATING ANSWER")
    console.log(card, winningCall)
    let remainingNumberArray = card.map(y => y.filter(z => !!z)).join(',').split(',').filter(y => !!y).map(y => parseInt(y))
    
    console.log(remainingNumberArray)

    let arrayTotal = remainingNumberArray.reduce((acc,val)=> acc+val, 0)

    console.log(`arrayTotal: ${arrayTotal}`)
    console.log(`winningCall: ${winningCall}`)

    return arrayTotal * parseInt(winningCall)
}

processData('day-4-input.txt').then(inputArr => {
    let bingoCalls = inputArr[0].split(',')
    // console.log(bingoCalls)

    let rawCards = inputArr.slice(2, inputArr.length)
    let cards = []
    let cardCounter = 0;

    let winnerArray = []

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

    let winningCall = null
    let winningCardIndex = null

    bingoCalls.forEach(call => {
        if(winnerArray.length < cards.length){
            cards.forEach((card, cardIndex) => {
                card.forEach((row, rowIndex) => {
                    row.forEach((number, columnIndex) => {
                        //console.log(number == call)
                        if(number == call){
                            cards[cardIndex][rowIndex][columnIndex] = ""
                            winningCardIndex = checkWinner(cards, winnerArray)
                            if(winningCardIndex != null){
                                winnerArray.push(winningCardIndex)
                                winningCall = call
                            }
                        }
                    })
                })
            })
        }
    })

    console.log(winnerArray)

    let answer = calculateAnswer(cards[winnerArray[winnerArray.length-1]], winningCall)

    console.log(`Answer: ${answer}`)
})

