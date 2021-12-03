const fs = require('fs')
const readline = require('readline');

let inputArr = []
let count = 0
let prevReading = -1;

async function processData(){
    const filestream = fs.createReadStream('./day-1-input.txt')
    const rl = readline.createInterface({input: filestream, crlfDelay: Infinity})

    for await (const line of rl){
        let reading = parseInt(line);
        let currIsGreater = prevReading > 0 && reading > prevReading

        // inputArr.push(reading)
        //let verdict = currIsGreater ? "GREATER" : 'no'
        //console.log(`prev: ${prevReading} | current: ${reading} | ${verdict}`)

        if(currIsGreater){
            count++
        }

        prevReading = reading
    }
    console.log(`Total: ${count}`)
}

processData()