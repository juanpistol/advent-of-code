import {processData} from '../FileReader.mjs'

processData('day-7-input.txt').then(inputArr => {  
    let crabs = inputArr[0].split(',').map(x => parseInt(x))
    
    let sortedCrabs = crabs.sort((a,b) => a<b ? -1 : 1)

    console.log(sortedCrabs)

    let mode = sortedCrabs[sortedCrabs.length/2]

    console.log(`Mode: ${mode}`)

    let fuel = 0

    sortedCrabs.forEach(crab => {
        fuel += Math.abs(crab-mode)
    })

    console.log(`Fuel: ${fuel}`)
});
