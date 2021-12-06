import {processData} from '../FileReader.mjs'

function processColumn(arr, col){
    return arr.filter(x => x[col] == "1").length > (arr.length/2) ? "1" : "0"
}

processData('day-3-input.txt').then(inputArr => {
    let arrayOfArrays = inputArr.map(line => line.split(''))

    console.log(arrayOfArrays[0])

    let gamma = []
    
    arrayOfArrays[0].forEach((row, index) => {
        const oneOrZero = processColumn(arrayOfArrays, index)
        gamma.push(oneOrZero)
    })
    
    let epsilon = gamma.map(bit => bit == "1" ? "0" : "1")

    let gammaInt = parseInt(gamma.join(''), 2)
    let epsilonInt = parseInt(epsilon.join(''), 2)
    
    let answer = gammaInt * epsilonInt
    
    console.log(`GammaInt: ${gammaInt}`)
    console.log(`EpsilonInt: ${epsilonInt}`)
    console.log(`Answer: ${answer}`)
});