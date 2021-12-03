import {processData} from '../FileReader.mjs'

processData('day-2-input.txt').then(inputArr => {
    
    let x = 0
    let y = 0
    let aim = 0

    const dirFunc = {
        forward: (val) => {x += val; y += aim*val},
        down: (val) => {aim += val},
        up: (val) => {aim -= val}
    }

    inputArr.forEach(item => {
        let vals = item.split(' ')
        let dir = vals[0], amt = parseInt(vals[1])
        dirFunc[dir](amt)
    })
    
    console.log(`Horizontal: ${x}`)
    console.log(`Depth: ${y}`)
    console.log(`Answer: ${x*y}`)
});