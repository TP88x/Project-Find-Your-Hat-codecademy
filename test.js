const prompt = require('prompt-sync')({ sigint: true }); // This sends a SIGINT, or “signal interrupt” message indicating that a user wants to exit a program by press Crtl+c
const clear = require('clear-screen'); //every turn clear the screen that meant you will not get new field in time you choose the direction

const hat = '👑';
const hole = '💣';
const fieldCharacter = '⬜';
const pathCharacter = '👺';
let andField = [];
const fieldRange = 10
const manyO = 50

//create field
for (let i = 0; i < fieldRange; i++) {
    andField.push([]);
    for (let j = 0; j < fieldRange; j++) {
        andField[i].push(fieldCharacter);
    }
}

class Field {
    constructor(field = addCaretToField(andField)) {
        this.field = field;
        this.positionX = 0;
        this.positionY = 0;
        this.field[0][0] = pathCharacter;
        this.isEnd = false
    }

    move() {
        while (this.isEnd === false) {
            this.print()
            console.log('X === ', this.positionX, ' || Y === ', this.positionY)
            const moveSet = prompt('Move WASD :')
            this.field[this.positionX][this.positionY] = fieldCharacter
            if (moveSet.toUpperCase() === 'W')(this.positionX - 1) < 0 ? this.positionX : this.positionX -= 1
            if (moveSet.toUpperCase() === 'A')(this.positionY - 1) < 0 ? this.positionX : this.positionY -= 1
            if (moveSet.toUpperCase() === 'S')((this.positionX + 1) < fieldRange) ? this.positionX += 1 : this.positionX
            if (moveSet.toUpperCase() === 'D')((this.positionY + 1) < fieldRange) ? this.positionY += 1 : this.positionY
            if (this.field[this.positionX][this.positionY] === hole) {
                this.isEnd = true
                console.log('LOSE')
            }
            if (this.field[this.positionX][this.positionY] === hat) {
                this.isEnd = true
                console.log('WIN')
            }
            this.field[this.positionX][this.positionY] = pathCharacter
        }
    }

    print() {
        clear();
        // console.log(this.field.join('\n'))
        console.log(this.field.map(row => row.join('')).join('\n'))
        console.log(pathCharacter.indexOf())
    }
}

// run
const YourField = new Field();
// YourField.move()
YourField.print()

function addCaretToField(field) {
    const numRows = field.length;
    const numCols = field[0].length;
    let randomRowO, randomColO;

    for (let i = 0; i < manyO; i++) {
        do {
            randomRowO = Math.floor(Math.random() * numRows);
            randomColO = Math.floor(Math.random() * numCols);
        } while (field[randomRowO][randomColO] === pathCharacter 
            || (randomRowO === 0 && randomColO === 1) 
            || (randomRowO === 1 && randomColO === 0) 
            || (randomRowO === 0 && randomColO === 0)
            || (randomRowO === 0 && randomColO === 2) 
            || (randomRowO === 0 && randomColO === 3) 
            || (randomRowO === 0 && randomColO === 4)
            || (randomRowO === 0 && randomColO === 5)
            || (randomRowO === 1 && randomColO === 5) 
            || (randomRowO === 2 && randomColO === 5) 
            || (randomRowO === 3 && randomColO === 5))
        field[randomRowO][randomColO] = hole;
    }

    let randomRowCaret, randomColCaret;
    do {
        randomRowCaret = Math.floor(Math.random() * numRows);
        randomColCaret = Math.floor(Math.random() * numCols);
    } while ((randomRowCaret === randomRowO && randomColCaret === randomColO) || randomRowCaret === 0 && randomColCaret === 0);

    field[randomRowCaret][randomColCaret] = hat;

    return field;
}

let addField1 = [] ;
for(let i = 0; i < 5; i++) {
  addField1.push([]);
  for(let n = 0; n < 5; n++) {
    addField1[i].push(fieldCharacter);
  }
}
console.log(addField1)