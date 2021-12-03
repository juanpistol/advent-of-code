import fs from 'fs'
import readline from 'readline';

export async function processData(filepath){
    let inputArr = []
    const filestream = fs.createReadStream(filepath)
    const rl = readline.createInterface({input: filestream, crlfDelay: Infinity})

    for await (const line of rl){
        inputArr.push(line)
    }
    return inputArr
}