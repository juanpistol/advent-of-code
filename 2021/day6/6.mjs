import {processData} from '../FileReader.mjs'

processData('day-6-input.txt').then(inputArr => { 
    const days = 80
    
    var timers = inputArr[0].split(',')
    
    // console.log(`Initial State: ${timers}`)
    
    let fishes = timers.map(timer => new LanternFish(timer, 0))

    for(let i=1; i<=days; i++){
        fishes.forEach(fish => {fish.decreaseTimer(i)})
        // console.log(`Day ${i}:  ${fishes.map(fish => {return fish.displayTimers()}).flat()}`)
    }
    let total = fishes.map(fish => {return fish.descendantCount()}).reduce((sum, a) => sum + a, 0)

    console.log(`Answer for ${days} days: ${total}`)
});

class LanternFish{
    static resetVal = 6
    constructor(initialTimer, birthday){
        this.timer = initialTimer
        this.birthday = birthday

        this.children = []
    }

    haveBaby = (day) => {
        this.children.push(new LanternFish(8, day))
    }

    decreaseTimer = (day) => {
        if(this.timer == 0 ){
            this.timer = LanternFish.resetVal
            this.haveBaby(day)
        }else if(day > this.birthday){
            this.timer--
        }
        this.children.forEach(child => child.decreaseTimer(day))
    }

    descendantCount = () => {
        return 1 + this.children.map(child => {return child.descendantCount()}).reduce((sum, a) => sum + a, 0)
    }

    displayTimers = () =>{
        return [this.timer, ...this.children.map(child => child.displayTimers())]
    }
}