import {processData} from '../FileReader.mjs'

processData('day-6-input.txt').then(inputArr => { 
    const days = 256
    const timerReset = '6'
    const timerBaby = '8'
    
    let timerString = inputArr[0].split(',').join('')

    let fishCounter = new FishCounter(timerString);

    // console.log(fishCounter)
    
    for(let day=1; day<=days; day++){
        Object.keys(fishCounter.object).forEach(key => {
            if(key == '0'){
                fishCounter.holder[timerReset] += fishCounter.object[key]
                fishCounter.holder[timerBaby] += fishCounter.object[key]
                fishCounter.holder[key] = 0
            }else{
                const minusKey = (parseInt(key)-1).toString()
                fishCounter.holder[minusKey] += fishCounter.object[key]
            }
        })
        fishCounter.copy()
         console.log(`Day ${day}:  ${JSON.stringify(fishCounter.holder)}`)
        fishCounter.reset()
        //console.log(`Day ${day}`)
    }
    let total = Object.keys(fishCounter.object).map(key => fishCounter.object[key]).reduce((add, x)=> add+x, 0)

    console.log(`Answer for ${days} days: ${total}`)
});

class FishCounter {
    constructor(startingString){
        this.object = {}
        this.holder = {}

        for(let i=0; i<9; i++){
            this.object[parseInt(i)] = startingString.match(new RegExp(i.toString(), "g"))?.length ?? 0
            this.holder[parseInt(i)] = 0
        }
    }

    copy = () => {
        Object.assign(this.object, this.holder)
    }

    reset = () =>{
        for(let i=0; i<9; i++){
            this.holder[parseInt(i)] = 0
        }
    }

}