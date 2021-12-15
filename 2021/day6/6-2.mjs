import {processData} from '../FileReader.mjs'

const replaceAt = (stringVar, index, replacement) => {
    return stringVar.substr(0, index) + replacement + stringVar.substr(index + replacement.length);
}

processData('day-6-test-input.txt').then(inputArr => { 
    const days = 256
    const timerReset = '6'
    
    let timerString = inputArr[0].split(',').join('')
    
    console.log(`Initial State: ${timerString}`)

    for(let day=1; day<=days; day++){
        for(let i = 0; i < timerString.length; i++){
            if(timerString[i] === ','){
                timerString = timerString.replaceAll(',', '')
                break
            }
            if(parseInt(timerString[i]) == 0){
                timerString = replaceAt(timerString, i, timerReset)
                timerString += ',8'
            }else{
                timerString = replaceAt(timerString, i, (parseInt(timerString[i]) - 1).toString())
            }
        }
        console.log(`Day ${day}:  ${timerString.length}`)
        //console.log(`Day ${day}`)
    }
    let total = timerString.length

    console.log(`Answer for ${days} days: ${total}`)
});