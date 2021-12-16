import {processData} from '../FileReader.mjs'

processData('day-7-test-input.txt').then(inputArr => {  
    let crabs = inputArr[0].split(',').map(x => parseInt(x)+1)
    
    let occurrences = crabs.reduce(function (acc, curr) {
        return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
      }, {});

    console.log(`Crab Total: ${crabs.length}`)

    console.log(occurrences)

    let weightedTotal = 0
    Object.keys(occurrences).forEach(value => {
        console.log(`Value: ${value}, Count: ${occurrences[value]}`)
        weightedTotal += parseInt(value) * parseInt(occurrences[value])
    })

    console.log(`WeightedTOtal: ${weightedTotal}`)

    let mode = crabs[crabs.length/2]

    let median = crabs.reduce((a,b) => a+b) / (crabs.length/2)
    
    let target = Math.floor((median+mode)/2)

    console.log(`Mode: ${mode}`)
    console.log(`Median: ${median}`)

    console.log(`Target: ${target}`)

    let fuel = 0

    crabs.forEach(crab => {
        fuel += calculate(crab, target)
    })

    console.log(`Fuel: ${fuel}`)
});

function calculate(x, y){
    let val = 0
    for(let i=1; i<=Math.abs(x-y); i++){
        val += i
    }
    return val
}