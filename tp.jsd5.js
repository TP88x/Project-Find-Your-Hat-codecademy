// Please copy and paste your GitHub Repo on line 2 (optional)
// <GitHub Repo> https://github.com/TP88x/Project-Find-Your-Hat-codecademy

// JavaScript Assessment Rubric: https://generation.instructure.com/courses/2342/assignments/143783

// Codecademy: https://www.codecademy.com/paths/front-end-engineer-career-path/tracks/fecp-javascript-syntax-part-iii/modules/fecp-challenge-project-find-your-hat/projects/find-your-hat

// Please break down your thinking process step-by-step (mandatory)

// JS Assessment: Find your hat //

const prompt = require('prompt-sync')({ sigint: true }); // This sends a SIGINT, or “signal interrupt” message indicating that a user wants to exit a program by press Crtl+c
const clear = require('clear-screen');//every turn clear the screen that meant you will not get new field in time you choose the direction
const hat = '👑';
const hole = '💣';
const fieldCharacter = '⬜';
const pathCharacter = '👺';
let fieldRange = 5;
let amounthole = 10;

class Field {
  constructor(field = [[]]) {
    this.field = this.map();
    this.positionX = 0;
    this.positionY = 0;
    // Set the "home" position before the game starts
    this.field[0][0] = pathCharacter;
    this.endGame = true;
  }
  map() {
    // โหมด
    console.log('Welcome to the game when finding the crown');
    console.log('Select difficulty level:');
    console.log('1. Easy');
    console.log('2. Medium');
    console.log('3. Hard');
    const choiceMode = prompt('Enter the number of your choice: ');
    
    if (choiceMode === '1') {
      fieldRange = 7;
      amounthole = (fieldRange * fieldRange) * 0.15;
    } else if (choiceMode === '2') {
      fieldRange = 15;
      amounthole = (fieldRange * fieldRange) * 0.25;
    } else if (choiceMode === '3') {
      fieldRange = 20;
      amounthole = (fieldRange * fieldRange) * 0.35;
    } else {
      console.log('Invalid choice. Using default settings.');
    }
    
    let addField = [] ;
    // for i = แนวตั้ง for n = แนวนอน
    // ผมทำเป็น ขนาด กว้าง*ยาว เท่ากันเลยกำหนดตัวแปรมารับค่า = fieldRange
    for(let i = 0; i < fieldRange; i++) {
      addField.push([]);
      for(let n = 0; n <  fieldRange; n++) {
        addField[i].push(fieldCharacter);
      }
    }
    // add hole and hat on field
    function addHatandhole(field) {
        const row = field.length;
        const col = field.length;
        let randomRow,randomCol;
        for(let i = 0; i < amounthole; i++) {
            do {
                randomRow = Math.floor(Math.random() * row);
                randomCol = Math.floor(Math.random() * col);
            } while (field[randomRow][randomCol] === hole 
                     || randomRow === 0 && randomCol === 0 
                     || randomRow === 1 && randomCol === 0 
                     || randomRow === 0 && randomCol === 1 
                     || randomRow === 1 && randomCol === 1);
                     
                  field[randomRow][randomCol] = hole;
            }    
            do {
                randomRow = Math.floor(Math.random() * row);
                randomCol = Math.floor(Math.random() * col);
            } while (field[randomRow][randomCol] === hat 
                     || randomRow === 0 && randomCol === 0);

                  field[randomRow][randomCol] = hat;
      
          return field;
        }
    // console.log(this.field.addHatandhole(addField))
    return addHatandhole(addField) 
  }
    //print field method to make it eaier 
  print() {
    clear();
    // your print map code here
    // console.log(this.map())
    console.log(this.field.map(row => row.join('')).join('\n'));
    
  }
  // the rest of your code starts here.
  playGame() {
    while(this.endGame === true){
      this.print();
      console.log(`X = ${this.positionX} || Y = ${this.positionY}`);
      const move = prompt('Welcome to the game which way are you going ? \nW =up S =down A =left D =right : ');
      this.field[this.positionX][this.positionY] = fieldCharacter;
      // W เป็นแนวแกน X ขึ้น ถ้าน้อยกว่า 0 จะทำอีกเงื่อนไข ตือ this.positionX = 0 ถ้าไม่ใช่ ให้ this.positionX -1
      if (move.toLocaleUpperCase() === 'W')(this.positionX - 1) < 0 ? this.positionX : this.positionX -=1 ;  
      // A เป็นแนวแกน Y ซ้าย ถ้าน้อยกว่า 0 จะทำอีกเงื่อนไข ตือ this.positionํY = 0 ถ้าไม่ใช่ ให้ this.positionY -1
      if (move.toLocaleUpperCase() === 'A')(this.positionY - 1) < 0 ? this.positionY : this.positionY -=1 ;  
      // S เป็นแนวแกน X ลง ถ้าน้อยกว่า fieldRange จะ +1
      if (move.toLocaleUpperCase() === 'S')(this.positionX + 1) < fieldRange ? this.positionX += 1 : this.positionX ; 
      // D เป็นแนวแกน Y ขวา ถ้าน้อยกว่า fieldRange จะ +1
      if (move.toLocaleUpperCase() === 'D')(this.positionY + 1) < fieldRange ? this.positionY += 1 : this.positionY ; 
  
      if (this.field[this.positionX][this.positionY] === hole) {
          this.endGame = false;
          console.log('----- LOSE sorry you hit the trap -----');
        }
      if (this.field[this.positionX][this.positionY] === hat) {
          this.endGame = false;
          console.log('----- WIN Congratulations -----');
        }
      // tag pathCharacter 
      this.field[this.positionX][this.positionY] = pathCharacter; 
    }   
  }
}
const topJSD5 = new Field()
// topJSD5.map()
topJSD5.playGame()


