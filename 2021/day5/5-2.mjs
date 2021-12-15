import {processData} from '../FileReader.mjs'

processData('day-5-input.txt').then(inputArr => { 
  let convolutedLines = inputArr.map(row => row.split(' -> ')).map(line => line.map(arrow => arrow.split(',')))
  
  let lineClasses = convolutedLines.map(line => new Line(parseInt(line[0][0]), parseInt(line[0][1]), parseInt(line[1][0]), parseInt(line[1][1])))

  let desiredLines = lineClasses;

  let linePassthroughs = desiredLines.map(line => { return line.getPassThroughCoords() });

  //console.log(linePassthroughs)

  let maxX = Math.max(...[...lineClasses.map(line => line.greaterX())])
  let maxY = Math.max(...[...lineClasses.map(line => line.greaterY())])
  
  console.log(maxX, maxY)
  
  let grid = new Grid(maxX, maxY)

  linePassthroughs.forEach(pt => {
    pt.forEach(coord => {
      grid.increment(coord.x, coord.y)
    })
  })

  // console.log(grid.board)

  console.log(`Num of Lines: ${desiredLines.length}`)

  console.log(`Answer: ${grid.calculateOverlaps(2)}`)
});

class Line {
  constructor(x1, y1, x2, y2){
    this.x1 = x1
    this.y1 = y1
    this.x2 = x2
    this.y2 = y2
  }

  isHorizontalOrVertical = () => {
    return this.x1 === this.x2 || this.y1 == this.y2
  }

  lesserX = () => {
    return Math.min(...[this.x1, this.x2])
  }

  greaterX = () => {
    return Math.max(...[this.x1, this.x2])
  }

  lesserY = () => {
    return Math.min(...[this.y1, this.y2])
  }

  greaterY = () => {
    return Math.max(...[this.y1, this.y2])
  }

  getPassThroughCoords = () => {
    let coords = []
    // console.log(this.isHorizontalOrVertical() ? "horizontal/vertical" : "diagonal")
    if(this.isHorizontalOrVertical()){
      for(let x=this.lesserX(); x<=this.greaterX(); x++){
        for(let y=this.lesserY(); y<=this.greaterY(); y++){
          coords.push({x, y})
        }
      }
    }else{
      let xDiff = this.x1 - this.x2
      let yDiff = this.y1 - this.y2

      let xMultiplier = xDiff < 0 ? 1 : -1
      let yMulitplier = yDiff < 0 ? 1 : -1

      for(let i=0; i<=this.greaterX()-this.lesserX(); i++){
        let newX = this.x1 + (i*xMultiplier)
        let newY = this.y1 + (i*yMulitplier)
        coords.push({x: newX, y: newY})
      }
    }
    // console.log(coords)
    return coords
  }
}

class Grid {
  constructor(maxX, maxY){
    this.board = []
    for(let x=0; x<=maxX; x++){
      this.board.push(Array(maxY+1))
      for(let y=0; y<=maxY; y++){
        this.board[x][y] = 0
      }
    }
    // console.log(this.board)
  }

  increment = (x, y) => {
    // console.log(x, y)
    this.board[x][y]++
  }

  calculateOverlaps = (numOfOverlaps) => {
    let count = 0;
    this.board.forEach(row => {
      row.forEach(column => {
        if(column >= numOfOverlaps)
          count++
      })
    })
    return count
  }
}

