const prompt = require('prompt-sync')({ sigint: true }); // This sends a SIGINT, or “signal interrupt” message indicating that a user wants to exit a program by press Crtl+c
const clear = require('clear-screen');//every turn clear the screen that meant you will not get new field in time you choose the direction
const hat = '👑';
const hole = '💣';
const fieldCharacter = '⬜';
const pathCharacter = '👺';
let fieldRange = 5 ; // ขนาด map เช่น ใส่ 5 = กว้าง 5 ยาว 5
let amounthole = 5; // จำนวนกับดัก 
class Field {
  constructor(field = [[]]) {
    this.field = field;
    this.positionX = 0; // แนวตั้ง
    this.positionY = 0; // แนวนอน
    this.field[0][0] = pathCharacter;
    this.endGame = false;
  }
  playGame(){
    while(this.endGame === false){
        this.newMap();
        console.log(`X = ${this.positionX} || Y = ${this.positionY}`);
        const move = prompt('Welcome to the game which way are you going ? \nW=up S=down A=left D=right : ');
        this.field[this.positionX][this.positionY] = fieldCharacter;
        if (move.toLocaleUpperCase() === 'W')(this.positionX - 1) < 0 ? this.positionX : this.positionX -=1 ;  // W เป็นแนวแกน X ขึ้น ถ้าน้อยกว่า 0 จะทำอีกเงื่อนไข ตือ this.positionX = 0 ถ้าไม่ใช่ ให้ this.positionX -1
        if (move.toLocaleUpperCase() === 'A')(this.positionY - 1) < 0 ? this.positionY : this.positionY -=1 ;  // A เป็นแนวแกน Y ซ้าย ถ้าน้อยกว่า 0 จะทำอีกเงื่อนไข ตือ this.positionํY = 0 ถ้าไม่ใช่ ให้ this.positionY -1
        if (move.toLocaleUpperCase() === 'S')(this.positionX + 1) < fieldRange ? this.positionX += 1 : this.positionX ; // S เป็นแนวแกน X ลง ถ้าน้อยกว่า fieldRange จะ +1
        if (move.toLocaleUpperCase() === 'D')(this.positionY + 1) < fieldRange ? this.positionY += 1 : this.positionY ; // D เป็นแนวแกน Y ขวา ถ้าน้อยกว่า fieldRange จะ +1
        if (this.field[this.positionX][this.positionY] === hole) {
            this.endGame = true;
            console.log('----- LOSE sorry you hit the trap -----');
        }
        if (this.field[this.positionX][this.positionY] === hat) {
            this.endGame = true;
            console.log('----- WIN Congratulations -----');
        }
        this.field[this.positionX][this.positionY] = pathCharacter; 
    }   
  }
  print() {
    clear();
    console.log('Select difficulty level:');
    console.log('1. Easy');
    console.log('2. Medium');
    console.log('3. Hard');
    const choice = prompt('Enter the number of your choice: ');

    switch (choice) {
      case '1':
        fieldRange = 5;
        amounthole = (fieldRange*fieldRange)*0.3;
        break;
      case '2':
        fieldRange = 10;
        amounthole = (fieldRange*fieldRange)*0.3;
        break;
      case '3':
        fieldRange = 15;
        amounthole = (fieldRange*fieldRange)*0.3;
        console.log('Invalid choice. Using default settings.');
        break;
      default:
        console.log('Invalid choice. Using default settings.');
    }
    // field before add hole and hat
    let fieldAdd = [];  // ทำ array 2มิติ สร้าง map
    for(let i = 0; i < fieldRange; i++ ) {
        fieldAdd.push([]);
        for(let n = 0; n < fieldRange; n++) {
            fieldAdd[i].push(fieldCharacter);
        }
    }
    // add hole and hat on field
    function addHatnhole(field) {
        const row = field.length;
        const col = field.length;
        let randomRow,randomCol;
        for(let i = 0; i < amounthole; i++) {
            do {
                randomRow = Math.floor(Math.random() * row);
                randomCol = Math.floor(Math.random() * col);
            } while (field[randomRow][randomCol] === hole || randomRow === 0 && randomCol === 0 || randomRow === 1 && randomCol === 0 || randomRow === 0 && randomCol === 1 || randomRow === 1 && randomCol === 1);
              
            field[randomRow][randomCol] = hole;
        }    
            do {
                randomRow = Math.floor(Math.random() * row);
                randomCol = Math.floor(Math.random() * col);
            } while (field[randomRow][randomCol] === hat || randomRow === 0 && randomCol === 0)

            field[randomRow][randomCol] = hat;

        return field;
    }
    return addHatnhole(fieldAdd) 
  }
  newMap(){
    clear();
    console.log(this.field.map(row => row.join(' ')).join('\n'));
  }
}
const nPrint = new Field();
// Play !!!
const playField = new Field(nPrint.print());
playField.playGame()





//ส่วนที่ยาก หลังจากสร้างแมฟแล้วใส่ กับดักและหมวก เข้าไปแล้ว  ต้องหาวิธี ทำให้ pathCharacter ไปอยู่ในแมฟ ผมใช้วิธี เรียก print ออกไปเก็บค่าแล้วนำกลับมา playField ถึงจะทำได้ครับ
//หลังจากนั้นก็ทำเงื่อนไข ไม่ให้ เดินออกจากแมฟหรือทะลุแมฟ 
// สร้างโหมด โดนกำหนด ความยาวและระเบิด


