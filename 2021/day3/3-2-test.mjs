function mostCommonForColumn(arr, col, isFewest, equalityFallback){
    const totalOnes = arr.filter(x => x[col]).length;
    const midpoint = arr.length/2;

    if(totalOnes == midpoint)
        return equalityFallback;

    if(isFewest)
        return totalOnes > midpoint ? 0 : 1

    return totalOnes > midpoint ? 1 : 0
}

function processRating(arrayOfArrays){
    let oxyArr = arrayOfArrays.slice()
    let co2Arr = arrayOfArrays.slice()

    let oxyWinner
    let co2Winner
    
    for(let i=0; i < arrayOfArrays[0].length; i++) {
        const oxyCommon = mostCommonForColumn(oxyArr, i, false, 1)
        const co2Common = mostCommonForColumn(co2Arr, i, true, 0)
        
        if(!oxyWinner){
            oxyArr = oxyArr.filter(row => row[i] == oxyCommon)
            console.log("oxyarr", oxyArr)
        }
        
        if(!co2Winner){
            co2Arr = co2Arr.filter(row => row[i] == co2Common)
            console.log("co2arr", co2Arr)
        }

        if(oxyArr.length <= 1)
            oxyWinner = oxyArr[0]
        if(co2Arr.length <= 1)
            co2Winner = co2Arr[0]
    }
    
    return [oxyWinner, co2Winner]
}


    let inputArr = [
    '00100',
    '11110',
    '10110',
    '10111',
    '10101',
    '01111',
    '00111',
    '11100',
    '10000',
    '11001',
    '00010',
    '01010'];

    let arrayOfArrays = inputArr.map(line => line.split('').map(char => parseInt(char)))

    let [oxygen, carbondioxide] = processRating(arrayOfArrays)
    
    console.log(oxygen)
    console.log(carbondioxide)

    let oxyInt = parseInt(oxygen.join(''), 2)
    let co2Int = parseInt(carbondioxide.join(''), 2)

    let answer = oxyInt * co2Int
    
    console.log(`oxyInt: ${oxyInt}`)
    console.log(`co2Int: ${co2Int}`)
    console.log(`Answer: ${answer}`)
