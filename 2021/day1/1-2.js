const fs = require('fs')
const readline = require('readline');

let inputArr = []
let count = 0
let iterations = 0
async function processData(){
    const filestream = fs.createReadStream('./day-1-input.txt')
    const rl = readline.createInterface({input: filestream, crlfDelay: Infinity})

    for await (const line of rl){
        let reading = parseInt(line);
        inputArr.push(reading)
    }

    const maxIndex = inputArr.length-1;

    console.log(`maxIndex: ${maxIndex}`)

    for(i=0; i<=maxIndex; i++){
        if(i+3 > maxIndex){
            break;
        }
        
        let currSum = inputArr[i] + inputArr[i+1] + inputArr[i+2]
        let nextSum = inputArr[i+1] + inputArr[i+2] + inputArr[i+3]

        if(nextSum > currSum){
            count++
        }
        iterations++;
    }

    console.log(`Iterations: ${iterations}`)
    console.log(`Total: ${count}`)
}

processData()