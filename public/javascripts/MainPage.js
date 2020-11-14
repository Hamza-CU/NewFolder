/*
//const matchButton = document.querySelector('.findmatch');
const slots = document.querySelectorAll('.slot');
var tableRow = document.getElementsByTagName('tr');
var tableData = document.getElementsByTagName('td');
var redColour = 'red';
var yellowColour = 'yellow';

var turn = true;

for (i = 0; i < tableData.length; i ++){
    tableData[i].addEventListener('click', (p) =>{
        console.log(`${p.target.parentElement.rowIndex},${e.target.cellIndex}`)
    });
};

Array.prototype.forEach.call(tableData, (cell) => {
    cell.addEventListener('click', addPiece);
    cell.style.backgroundColor = 'white';
});

function addPiece(p){

    let column = p.target.cellIndex;
    let row = [];

    for (i = 5; i > -1; i--){
            if (tableRow[i].children[column].style.backgroundColor == 'white'){
              row.push(tableRow[i].children[column]);
              if (turn == true) {
                row[0].style.backgroundColor = redColour;
                console.log(winConditions());
                if (winConditions()){
                  window.alert("red wins");
                  resetBoard();
                }
                  turn = false;
                  return turn;
                }

              else {
                row[0].style.backgroundColor = yellowColour;
                console.log(winConditions());
                if (winConditions()){
                  window.alert("yellow wins");
                  resetBoard();
                }
                return turn = 1;
              }
          }
    }
}

function WinVertical(){
  for (let col = 0; col < 7; col++){
          for (let row = 0; row < 3; row++){
              if (tableRow[row].children[col].style.backgroundColor == tableRow[row+1].children[col].style.backgroundColor &&
                  tableRow[row].children[col].style.backgroundColor == tableRow[row+2].children[col].style.backgroundColor &&
                  tableRow[row].children[col].style.backgroundColor == tableRow[row+3].children[col].style.backgroundColor &&
                  tableRow[row].children[col].style.backgroundColor != 'white' &&
                  tableRow[row].children[col].style.backgroundColor != undefined ){
                  return true;
              }
          }
      }
  }


function WinHorizontal(){
  for (let row = 0; row < tableRow.length; row++){
       for (let col = 0; col < 4; col++){
         if (tableRow[row].children[col].style.backgroundColor == tableRow[row].children[col+1].style.backgroundColor &&
             tableRow[row].children[col].style.backgroundColor == tableRow[row].children[col+2].style.backgroundColor &&
             tableRow[row].children[col].style.backgroundColor == tableRow[row].children[col+3].style.backgroundColor &&
             tableRow[row].children[col].style.backgroundColor != 'white' &&
             tableRow[row].children[col].style.backgroundColor != undefined){
             return true;
       }
     }
}
}

function WinDiagonal1(){
  for(let col = 0; col < 4; col++){
        for (let row = 0; row < 3; row++){
          if (tableRow[row].children[col].style.backgroundColor == tableRow[row+1].children[col+1].style.backgroundColor &&
              tableRow[row].children[col].style.backgroundColor == tableRow[row+2].children[col+2].style.backgroundColor &&
              tableRow[row].children[col].style.backgroundColor == tableRow[row+3].children[col+3].style.backgroundColor &&
              tableRow[row].children[col].style.backgroundColor != 'white' &&
              tableRow[row].children[col].style.backgroundColor != undefined){
              return true;
            }
          }
        }
      }

function WinDiagonal2(){
  for(let col = 0; col < 4; col++){
       for (let row = 5; row > 2; row--){
          if (tableRow[row].children[col].style.backgroundColor == tableRow[row-1].children[col+1].style.backgroundColor &&
              tableRow[row].children[col].style.backgroundColor == tableRow[row-2].children[col+2].style.backgroundColor &&
              tableRow[row].children[col].style.backgroundColor == tableRow[row-3].children[col+3].style.backgroundColor &&
              tableRow[row].children[col].style.backgroundColor != 'white' &&
            tableRow[row].children[col].style.backgroundColor != undefined)
              {
              return true;
            }
          }
        }
}
function fullTable(){
    let filledTable = []
    for (i = 0; i < tableData.length; i++){
        if (tableData[i].style.backgroundColor !== 'white'){
            fullSlot.push(tableData[i]);
        }
    }
    if (filledTable.length === tableData.length){
        return true;
    }
}

function winConditions(){
  if (WinVertical() || WinDiagonal1() || WinDiagonal2()|| WinHorizontal()){
    return true;
  }
  else {return false;}
}

function resetBoard(){
  slots.forEach(slot => {
          slot.style.backgroundColor = 'white';
  });

}
*/
