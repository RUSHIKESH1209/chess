
let gameboard = document.querySelector(".gameboard");
let piece = document.querySelector(".piece");
let playerdisplay = document.querySelector(".playerdisplay");
let playergo = "black";
playerdisplay.textContent = "black";

function createboard() {
  startpieces.forEach((startpiece, i) => {
    let square = document.createElement("div");
    square.classList.add("square");
    square.setAttribute("square-id", i);
    square.innerHTML = startpiece;

    if (square.firstChild.firstChild) {
      square.firstChild.setAttribute("draggable", "true");
      square.classList.add(`id${i}`);
    }

    if ((Math.floor(i / 8) + i) % 2 === 0) {
      square.classList.add("beige");
    } else {
      square.classList.add("brown");
    }

    if (i < 16) {
      square.firstChild.firstChild.classList.add("black");
    }
    if (i > 47) {
      square.firstChild.firstChild.classList.add("white");
    }

    gameboard.append(square);
  });
}

createboard();

let allsquares = document.querySelectorAll(".gameboard .square");

let startpositionid;
let draggedelement;
let endpositionid;

allsquares.forEach((square) => {

  square.addEventListener("drag", dragstart);
  square.addEventListener("dragover", dragover);
  square.addEventListener("drop", dragdrop);
});

function dragstart(e) {
  startpositionid = e.target.parentNode.getAttribute("square-id");
  draggedelement = e.target;
  // console.log(draggedelement)
}

function dragover(e) {
  e.preventDefault();
}

function dragdrop(e) {
  e.stopPropagation();
  endpositionid = e.target.parentNode.getAttribute("square-id");
  let correctgo = draggedelement.firstChild.classList.contains(playergo); //returns true if correct player had played
  let taken = e.target.classList.contains("piece"); //returns true if piece is taken
  let opponentgo = playergo === "white" ? "black" : "white";
  let valid = validfn(e.target);
  let target_color;
  if( e.target.classList.contains("piece")){
      target_color=(e.target.firstChild.classList)}
   
   
  // valid=1;

  // console.log("played by correct player: " + correctgo);
  // console.log("is piece taken: " + taken);
  // console.log("player was: " + playergo);
  // console.log("opponentplayer was: " + opponentgo);
  // console.log("e.target is: ");
  // console.log(e.target);
  // console.log(valid)
  if(valid){
  promotefn(e.target,playergo);}

  if (correctgo && startpositionid != endpositionid && valid&&target_color!=playergo) {
    if (
      startpositionid == endpositionid &&
      draggedelement.classList.contains("piece")
    ) {}
    else if (
      e.target.classList.contains("piece") &&
      draggedelement.classList.contains("piece")&&
      target_color!=playergo
    ) {
      e.target.parentNode.append(draggedelement);
      e.target.remove();
    }
    else if (draggedelement.classList.contains("piece")&&target_color!=playergo)
    { e.target.append(draggedelement)}

    check_king(e.target);
    changeplayer();
    reverseids();

  }
}



function check_king(e) {
  if(e.id==="king"){
    document.querySelector(".winnermess").style.display="grid"
    let winner=(e).firstChild.classList.contains("black")?true:false;
    if(winner==false){
      document.querySelector(".winner").innerHTML=`congratulations winner is black `;

    }
    else{
      document.querySelector(".winner").innerHTML=`congratulations winner is white `;

    }

  }
}



function changeplayer() {
  if (playergo === "black") {
    playergo = "white";
    playerdisplay.textContent = "white";
  } else {
    playergo = "black";
    playerdisplay.textContent = "black";
  }
}

function reverseids() {
  if (playergo === "white")
    allsquares.forEach((square, i) => {
      square.setAttribute("square-id", 63 - i);
      square.classList.remove(`id${i}`);
      square.classList.add(`id${63 - i}`);
    });
  else
    allsquares.forEach((square, i) => {
      square.setAttribute("square-id", i);
      square.classList.remove(`id${63 - i}`);
      square.classList.add(`id${i}`);
    });
}


let castling_valid=1;
  let targetid;
function validfn(target) {

  if (target.classList.contains("square")) {
    targetid = Number(target.getAttribute("square-id"));
  } else {
    targetid = Number(target.parentNode.getAttribute("square-id"));
  }

  let startid = Number(startpositionid);
  let piece = draggedelement.id;

  // console.log(document.querySelector(`[square-id="${startid+8}"]` ).children.length)
  // console.log(target)
  // console.log(startid);
  // console.log('targetid: '+targetid);
  // console.log('piece: '+piece);
  // console.log(target.classList.contains("piece"))

  switch (piece) {
    //...............................................................................................................................................

    case "pawn":
      const startrow = [8, 9, 10, 11, 12, 13, 14, 15];      
      const endrow = [56, 57, 58, 59, 60, 61, 62, 63];      

      if (
        (startrow.includes(startid) &&
          startid + 16 === targetid &&
          !target.classList.contains("piece") &&
          !document.querySelector(`[square-id="${startid+8}"]` ).children.length) ||
        (startid + 8 === targetid && !target.classList.contains("piece")) ||
        (startid + 8 + 1 === targetid && target.classList.contains("piece")) ||
        (startid + 8 - 1 === targetid && target.classList.contains("piece"))
      ) {
        return true;
      }
      break;

//.............................................................................................................................................................



case "king":
      if (
        (startid +1 ===targetid)||
        (startid -1 ===targetid)||
        (startid +8 ===targetid)||
        (startid -8 ===targetid)||
        (startid +8+1 ===targetid)||
        (startid -8+1 ===targetid)||
        (startid +8-1 ===targetid)||
        (startid -8-1 ===targetid)

      ) {
        castling_valid=0;
        return true;
      }

//castling ...............................................................................................................................................
if(castling_valid){
if(playergo=="black"){

let is_rook_avail
if(document.querySelector(`[square-id="${7}"]` ).firstChild?true:false){
  is_rook_avail= document.querySelector(`[square-id="${7}"]` ).firstChild.classList.contains("rook")?true:false
}
else{
  is_rook_avail=false
}
 if( 
  startid==4 && targetid==6 && !document.querySelector(`[square-id="${5}"]` ).children.length && !document.querySelector(`[square-id="${6}"]` ).children.length && is_rook_avail
){ 
  document.querySelector(`[square-id="${5}"]` ) .append (document.querySelector(`[square-id="${7}"]` ).firstChild)
  return true;
}
}

if(playergo=="black"){

  let is_rook_avail
  if(document.querySelector(`[square-id="${0}"]` ).firstChild?true:false){
    is_rook_avail= document.querySelector(`[square-id="${0}"]` ).firstChild.classList.contains("rook")?true:false
  }
  else{
    is_rook_avail=false
  }
   if( 
    startid==4 && targetid==2 && !document.querySelector(`[square-id="${1}"]` ).children.length &&!document.querySelector(`[square-id="${2}"]` ).children.length  && !document.querySelector(`[square-id="${3}"]` ).children.length && is_rook_avail
  ){ 
    document.querySelector(`[square-id="${3}"]` ) .append (document.querySelector(`[square-id="${0}"]` ).firstChild)
    return true;
  }
  }
  

 if(playergo=="white"){

  let is_rook_avail
  if(document.querySelector(`[square-id="${0}"]` ).firstChild?true:false){
    is_rook_avail= document.querySelector(`[square-id="${0}"]` ).firstChild.classList.contains("rook")?true:false
  }
  else{
    is_rook_avail=false
  }
  if( 
    startid==3 && targetid==1 && !document.querySelector(`[square-id="${1}"]` ).children.length &&!document.querySelector(`[square-id="${2}"]` ).children.length  &&  is_rook_avail
  ){ 
    document.querySelector(`[square-id="${2}"]` ) .append (document.querySelector(`[square-id="${0}"]` ).firstChild)
    return true;
  }
  }
  
if(playergo=="white"){

  let is_rook_avail
  if(document.querySelector(`[square-id="${7}"]` ).firstChild?true:false){
    is_rook_avail= document.querySelector(`[square-id="${7}"]` ).firstChild.classList.contains("rook")?true:false
  }
  else{
    is_rook_avail=false
  }
  if( 
    startid==3 && targetid==5 && !document.querySelector(`[square-id="${4}"]` ).children.length &&!document.querySelector(`[square-id="${5}"]` ).children.length  && !document.querySelector(`[square-id="${6}"]` ).children.length && is_rook_avail
  ){ 
    document.querySelector(`[square-id="${4}"]` ) .append (document.querySelector(`[square-id="${7}"]` ).firstChild)
    return true;
  }
  }
  }

  break;


    //...............................................................................................................................................
    case "bishop":
      if (
        (startid + 1*8 + 1*1===targetid)||
        (startid + 2*8 + 2*1===targetid && !document.querySelector(`[square-id="${startid + 1*8 + 1*1}"]` ).children.length) ||
        (startid + 3*8 + 3*1===targetid && !document.querySelector(`[square-id="${startid + 1*8 + 1*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 2*8 + 2*1}"]` ).children.length) ||
        (startid + 4*8 + 4*1===targetid && !document.querySelector(`[square-id="${startid + 1*8 + 1*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 2*8 + 2*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 3*8 + 3*1}"]` ).children.length) ||
        (startid + 5*8 + 5*1===targetid && !document.querySelector(`[square-id="${startid + 1*8 + 1*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 2*8 + 2*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 3*8 + 3*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 4*8 + 4*1}"]` ).children.length) ||
        (startid + 6*8 + 6*1===targetid && !document.querySelector(`[square-id="${startid + 1*8 + 1*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 2*8 + 2*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 3*8 + 3*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 4*8 + 4*1}"]` ).children.length &&!document.querySelector(`[square-id="${startid + 5*8 + 5*1}"]` ).children.length) ||
        (startid + 7*8 + 7*1===targetid && !document.querySelector(`[square-id="${startid + 1*8 + 1*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 2*8 + 2*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 3*8 + 3*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 4*8 + 4*1}"]` ).children.length &&!document.querySelector(`[square-id="${startid + 5*8 + 5*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 6*8 + 6*1}"]` ).children.length)||

        (startid + 1*8 - 1*1===targetid)||
        (startid + 2*8 - 2*1===targetid && !document.querySelector(`[square-id="${startid + 1*8 - 1*1}"]` ).children.length) ||
        (startid + 3*8 - 3*1===targetid && !document.querySelector(`[square-id="${startid + 1*8 - 1*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 2*8 - 2*1}"]` ).children.length) ||
        (startid + 4*8 - 4*1===targetid && !document.querySelector(`[square-id="${startid + 1*8 - 1*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 2*8 - 2*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 3*8 - 3*1}"]` ).children.length) ||
        (startid + 5*8 - 5*1===targetid && !document.querySelector(`[square-id="${startid + 1*8 - 1*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 2*8 - 2*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 3*8 - 3*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 4*8 - 4*1}"]` ).children.length) ||
        (startid + 6*8 - 6*1===targetid && !document.querySelector(`[square-id="${startid + 1*8 - 1*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 2*8 - 2*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 3*8 - 3*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 4*8 - 4*1}"]` ).children.length &&!document.querySelector(`[square-id="${startid + 5*8 - 5*1}"]` ).children.length) ||
        (startid + 7*8 - 7*1===targetid && !document.querySelector(`[square-id="${startid + 1*8 - 1*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 2*8 - 2*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 3*8 - 3*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 4*8 - 4*1}"]` ).children.length &&!document.querySelector(`[square-id="${startid + 5*8 - 5*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 6*8 - 6*1}"]` ).children.length)||

        (startid - 1*8 + 1*1===targetid)||
        (startid - 2*8 + 2*1===targetid && !document.querySelector(`[square-id="${startid - 1*8 + 1*1}"]` ).children.length) ||
        (startid - 3*8 + 3*1===targetid && !document.querySelector(`[square-id="${startid - 1*8 + 1*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 2*8 + 2*1}"]` ).children.length) ||
        (startid - 4*8 + 4*1===targetid && !document.querySelector(`[square-id="${startid - 1*8 + 1*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 2*8 + 2*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 3*8 + 3*1}"]` ).children.length) ||
        (startid - 5*8 + 5*1===targetid && !document.querySelector(`[square-id="${startid - 1*8 + 1*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 2*8 + 2*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 3*8 + 3*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 4*8 + 4*1}"]` ).children.length) ||
        (startid - 6*8 + 6*1===targetid && !document.querySelector(`[square-id="${startid - 1*8 + 1*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 2*8 + 2*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 3*8 + 3*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 4*8 + 4*1}"]` ).children.length &&!document.querySelector(`[square-id="${startid - 5*8 + 5*1}"]` ).children.length) ||
        (startid - 7*8 + 7*1===targetid && !document.querySelector(`[square-id="${startid - 1*8 + 1*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 2*8 + 2*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 3*8 + 3*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 4*8 + 4*1}"]` ).children.length &&!document.querySelector(`[square-id="${startid - 5*8 + 5*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 6*8 + 6*1}"]` ).children.length)||

        (startid - 1*8 - 1*1===targetid)||
        (startid - 2*8 - 2*1===targetid && !document.querySelector(`[square-id="${startid - 1*8 - 1*1}"]` ).children.length) ||
        (startid - 3*8 - 3*1===targetid && !document.querySelector(`[square-id="${startid - 1*8 - 1*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 2*8 - 2*1}"]` ).children.length) ||
        (startid - 4*8 - 4*1===targetid && !document.querySelector(`[square-id="${startid - 1*8 - 1*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 2*8 - 2*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 3*8 - 3*1}"]` ).children.length) ||
        (startid - 5*8 - 5*1===targetid && !document.querySelector(`[square-id="${startid - 1*8 - 1*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 2*8 - 2*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 3*8 - 3*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 4*8 - 4*1}"]` ).children.length) ||
        (startid - 6*8 - 6*1===targetid && !document.querySelector(`[square-id="${startid - 1*8 - 1*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 2*8 - 2*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 3*8 - 3*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 4*8 - 4*1}"]` ).children.length &&!document.querySelector(`[square-id="${startid - 5*8 - 5*1}"]` ).children.length) ||
        (startid - 7*8 - 7*1===targetid && !document.querySelector(`[square-id="${startid - 1*8 - 1*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 2*8 - 2*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 3*8 - 3*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 4*8 - 4*1}"]` ).children.length &&!document.querySelector(`[square-id="${startid - 5*8 - 5*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 6*8 - 6*1}"]` ).children.length)

      ) {
        return true;
      }
      break;
    //...............................................................................................................................................

    case "rook":
      if (
        (startid + 1*8 ===targetid)||
        (startid + 2*8 ===targetid && !document.querySelector(`[square-id="${startid + 1*8}"]` ).children.length) ||
        (startid + 3*8 ===targetid && !document.querySelector(`[square-id="${startid + 1*8}"]` ).children.length && !document.querySelector(`[square-id="${startid + 2*8}"]` ).children.length) ||
        (startid + 4*8 ===targetid && !document.querySelector(`[square-id="${startid + 1*8}"]` ).children.length && !document.querySelector(`[square-id="${startid + 2*8}"]` ).children.length && !document.querySelector(`[square-id="${startid + 3*8}"]` ).children.length) ||
        (startid + 5*8 ===targetid && !document.querySelector(`[square-id="${startid + 1*8}"]` ).children.length && !document.querySelector(`[square-id="${startid + 2*8}"]` ).children.length && !document.querySelector(`[square-id="${startid + 3*8}"]` ).children.length && !document.querySelector(`[square-id="${startid + 4*8}"]` ).children.length) ||
        (startid + 6*8 ===targetid && !document.querySelector(`[square-id="${startid + 1*8}"]` ).children.length && !document.querySelector(`[square-id="${startid + 2*8}"]` ).children.length && !document.querySelector(`[square-id="${startid + 3*8}"]` ).children.length && !document.querySelector(`[square-id="${startid + 4*8}"]` ).children.length &&!document.querySelector(`[square-id="${startid + 5*8}"]` ).children.length) ||
        (startid + 7*8 ===targetid && !document.querySelector(`[square-id="${startid + 1*8}"]` ).children.length && !document.querySelector(`[square-id="${startid + 2*8}"]` ).children.length && !document.querySelector(`[square-id="${startid + 3*8}"]` ).children.length && !document.querySelector(`[square-id="${startid + 4*8}"]` ).children.length &&!document.querySelector(`[square-id="${startid + 5*8}"]` ).children.length && !document.querySelector(`[square-id="${startid + 6*8}"]` ).children.length)||

        (startid - 1*1===targetid)||
        (startid - 2*1===targetid && !document.querySelector(`[square-id="${startid - 1*1}"]` ).children.length) ||
        (startid - 3*1===targetid && !document.querySelector(`[square-id="${startid - 1*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 2*1}"]` ).children.length) ||
        (startid - 4*1===targetid && !document.querySelector(`[square-id="${startid - 1*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 2*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 3*1}"]` ).children.length) ||
        (startid - 5*1===targetid && !document.querySelector(`[square-id="${startid - 1*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 2*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 3*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 4*1}"]` ).children.length) ||
        (startid - 6*1===targetid && !document.querySelector(`[square-id="${startid - 1*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 2*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 3*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 4*1}"]` ).children.length &&!document.querySelector(`[square-id="${startid - 5*1}"]` ).children.length) ||
        (startid - 7*1===targetid && !document.querySelector(`[square-id="${startid - 1*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 2*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 3*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 4*1}"]` ).children.length &&!document.querySelector(`[square-id="${startid - 5*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 6*1}"]` ).children.length)||

        (startid + 1*1===targetid)||
        (startid + 2*1===targetid && !document.querySelector(`[square-id="${startid + 1*1}"]` ).children.length) ||
        (startid + 3*1===targetid && !document.querySelector(`[square-id="${startid + 1*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 2*1}"]` ).children.length) ||
        (startid + 4*1===targetid && !document.querySelector(`[square-id="${startid + 1*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 2*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 3*1}"]` ).children.length) ||
        (startid + 5*1===targetid && !document.querySelector(`[square-id="${startid + 1*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 2*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 3*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 4*1}"]` ).children.length) ||
        (startid + 6*1===targetid && !document.querySelector(`[square-id="${startid + 1*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 2*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 3*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 4*1}"]` ).children.length &&!document.querySelector(`[square-id="${startid + 5*1}"]` ).children.length) ||
        (startid + 7*1===targetid && !document.querySelector(`[square-id="${startid + 1*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 2*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 3*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 4*1}"]` ).children.length &&!document.querySelector(`[square-id="${startid + 5*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 6*1}"]` ).children.length)||

        (startid - 1*8 ===targetid)||
        (startid - 2*8 ===targetid && !document.querySelector(`[square-id="${startid - 1*8}"]` ).children.length) ||
        (startid - 3*8 ===targetid && !document.querySelector(`[square-id="${startid - 1*8}"]` ).children.length && !document.querySelector(`[square-id="${startid - 2*8}"]` ).children.length) ||
        (startid - 4*8 ===targetid && !document.querySelector(`[square-id="${startid - 1*8}"]` ).children.length && !document.querySelector(`[square-id="${startid - 2*8}"]` ).children.length && !document.querySelector(`[square-id="${startid - 3*8}"]` ).children.length) ||
        (startid - 5*8 ===targetid && !document.querySelector(`[square-id="${startid - 1*8}"]` ).children.length && !document.querySelector(`[square-id="${startid - 2*8}"]` ).children.length && !document.querySelector(`[square-id="${startid - 3*8}"]` ).children.length && !document.querySelector(`[square-id="${startid - 4*8}"]` ).children.length) ||
        (startid - 6*8 ===targetid && !document.querySelector(`[square-id="${startid - 1*8}"]` ).children.length && !document.querySelector(`[square-id="${startid - 2*8}"]` ).children.length && !document.querySelector(`[square-id="${startid - 3*8}"]` ).children.length && !document.querySelector(`[square-id="${startid - 4*8}"]` ).children.length &&!document.querySelector(`[square-id="${startid - 5*8}"]` ).children.length) ||
        (startid - 7*8 ===targetid && !document.querySelector(`[square-id="${startid - 1*8}"]` ).children.length && !document.querySelector(`[square-id="${startid - 2*8}"]` ).children.length && !document.querySelector(`[square-id="${startid - 3*8}"]` ).children.length && !document.querySelector(`[square-id="${startid - 4*8}"]` ).children.length &&!document.querySelector(`[square-id="${startid - 5*8}"]` ).children.length && !document.querySelector(`[square-id="${startid - 6*8}"]` ).children.length)

      ) {
        return true;
      }
      break;
    //...............................................................................................................................................


    case "queen":
      
        if (
          (startid + 1*8 + 1*1===targetid)||
          (startid + 2*8 + 2*1===targetid && !document.querySelector(`[square-id="${startid + 1*8 + 1*1}"]` ).children.length) ||
          (startid + 3*8 + 3*1===targetid && !document.querySelector(`[square-id="${startid + 1*8 + 1*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 2*8 + 2*1}"]` ).children.length) ||
          (startid + 4*8 + 4*1===targetid && !document.querySelector(`[square-id="${startid + 1*8 + 1*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 2*8 + 2*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 3*8 + 3*1}"]` ).children.length) ||
          (startid + 5*8 + 5*1===targetid && !document.querySelector(`[square-id="${startid + 1*8 + 1*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 2*8 + 2*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 3*8 + 3*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 4*8 + 4*1}"]` ).children.length) ||
          (startid + 6*8 + 6*1===targetid && !document.querySelector(`[square-id="${startid + 1*8 + 1*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 2*8 + 2*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 3*8 + 3*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 4*8 + 4*1}"]` ).children.length &&!document.querySelector(`[square-id="${startid + 5*8 + 5*1}"]` ).children.length) ||
          (startid + 7*8 + 7*1===targetid && !document.querySelector(`[square-id="${startid + 1*8 + 1*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 2*8 + 2*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 3*8 + 3*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 4*8 + 4*1}"]` ).children.length &&!document.querySelector(`[square-id="${startid + 5*8 + 5*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 6*8 + 6*1}"]` ).children.length)||
  
          (startid + 1*8 - 1*1===targetid)||
          (startid + 2*8 - 2*1===targetid && !document.querySelector(`[square-id="${startid + 1*8 - 1*1}"]` ).children.length) ||
          (startid + 3*8 - 3*1===targetid && !document.querySelector(`[square-id="${startid + 1*8 - 1*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 2*8 - 2*1}"]` ).children.length) ||
          (startid + 4*8 - 4*1===targetid && !document.querySelector(`[square-id="${startid + 1*8 - 1*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 2*8 - 2*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 3*8 - 3*1}"]` ).children.length) ||
          (startid + 5*8 - 5*1===targetid && !document.querySelector(`[square-id="${startid + 1*8 - 1*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 2*8 - 2*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 3*8 - 3*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 4*8 - 4*1}"]` ).children.length) ||
          (startid + 6*8 - 6*1===targetid && !document.querySelector(`[square-id="${startid + 1*8 - 1*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 2*8 - 2*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 3*8 - 3*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 4*8 - 4*1}"]` ).children.length &&!document.querySelector(`[square-id="${startid + 5*8 - 5*1}"]` ).children.length) ||
          (startid + 7*8 - 7*1===targetid && !document.querySelector(`[square-id="${startid + 1*8 - 1*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 2*8 - 2*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 3*8 - 3*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 4*8 - 4*1}"]` ).children.length &&!document.querySelector(`[square-id="${startid + 5*8 - 5*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 6*8 - 6*1}"]` ).children.length)||
  
          (startid - 1*8 + 1*1===targetid)||
          (startid - 2*8 + 2*1===targetid && !document.querySelector(`[square-id="${startid - 1*8 + 1*1}"]` ).children.length) ||
          (startid - 3*8 + 3*1===targetid && !document.querySelector(`[square-id="${startid - 1*8 + 1*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 2*8 + 2*1}"]` ).children.length) ||
          (startid - 4*8 + 4*1===targetid && !document.querySelector(`[square-id="${startid - 1*8 + 1*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 2*8 + 2*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 3*8 + 3*1}"]` ).children.length) ||
          (startid - 5*8 + 5*1===targetid && !document.querySelector(`[square-id="${startid - 1*8 + 1*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 2*8 + 2*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 3*8 + 3*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 4*8 + 4*1}"]` ).children.length) ||
          (startid - 6*8 + 6*1===targetid && !document.querySelector(`[square-id="${startid - 1*8 + 1*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 2*8 + 2*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 3*8 + 3*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 4*8 + 4*1}"]` ).children.length &&!document.querySelector(`[square-id="${startid - 5*8 + 5*1}"]` ).children.length) ||
          (startid - 7*8 + 7*1===targetid && !document.querySelector(`[square-id="${startid - 1*8 + 1*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 2*8 + 2*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 3*8 + 3*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 4*8 + 4*1}"]` ).children.length &&!document.querySelector(`[square-id="${startid - 5*8 + 5*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 6*8 + 6*1}"]` ).children.length)||
  
          (startid - 1*8 - 1*1===targetid)||
          (startid - 2*8 - 2*1===targetid && !document.querySelector(`[square-id="${startid - 1*8 - 1*1}"]` ).children.length) ||
          (startid - 3*8 - 3*1===targetid && !document.querySelector(`[square-id="${startid - 1*8 - 1*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 2*8 - 2*1}"]` ).children.length) ||
          (startid - 4*8 - 4*1===targetid && !document.querySelector(`[square-id="${startid - 1*8 - 1*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 2*8 - 2*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 3*8 - 3*1}"]` ).children.length) ||
          (startid - 5*8 - 5*1===targetid && !document.querySelector(`[square-id="${startid - 1*8 - 1*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 2*8 - 2*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 3*8 - 3*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 4*8 - 4*1}"]` ).children.length) ||
          (startid - 6*8 - 6*1===targetid && !document.querySelector(`[square-id="${startid - 1*8 - 1*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 2*8 - 2*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 3*8 - 3*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 4*8 - 4*1}"]` ).children.length &&!document.querySelector(`[square-id="${startid - 5*8 - 5*1}"]` ).children.length) ||
          (startid - 7*8 - 7*1===targetid && !document.querySelector(`[square-id="${startid - 1*8 - 1*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 2*8 - 2*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 3*8 - 3*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 4*8 - 4*1}"]` ).children.length &&!document.querySelector(`[square-id="${startid - 5*8 - 5*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 6*8 - 6*1}"]` ).children.length)||
  
          (startid + 1*8 ===targetid)||
          (startid + 2*8 ===targetid && !document.querySelector(`[square-id="${startid + 1*8}"]` ).children.length) ||
          (startid + 3*8 ===targetid && !document.querySelector(`[square-id="${startid + 1*8}"]` ).children.length && !document.querySelector(`[square-id="${startid + 2*8}"]` ).children.length) ||
          (startid + 4*8 ===targetid && !document.querySelector(`[square-id="${startid + 1*8}"]` ).children.length && !document.querySelector(`[square-id="${startid + 2*8}"]` ).children.length && !document.querySelector(`[square-id="${startid + 3*8}"]` ).children.length) ||
          (startid + 5*8 ===targetid && !document.querySelector(`[square-id="${startid + 1*8}"]` ).children.length && !document.querySelector(`[square-id="${startid + 2*8}"]` ).children.length && !document.querySelector(`[square-id="${startid + 3*8}"]` ).children.length && !document.querySelector(`[square-id="${startid + 4*8}"]` ).children.length) ||
          (startid + 6*8 ===targetid && !document.querySelector(`[square-id="${startid + 1*8}"]` ).children.length && !document.querySelector(`[square-id="${startid + 2*8}"]` ).children.length && !document.querySelector(`[square-id="${startid + 3*8}"]` ).children.length && !document.querySelector(`[square-id="${startid + 4*8}"]` ).children.length &&!document.querySelector(`[square-id="${startid + 5*8}"]` ).children.length) ||
          (startid + 7*8 ===targetid && !document.querySelector(`[square-id="${startid + 1*8}"]` ).children.length && !document.querySelector(`[square-id="${startid + 2*8}"]` ).children.length && !document.querySelector(`[square-id="${startid + 3*8}"]` ).children.length && !document.querySelector(`[square-id="${startid + 4*8}"]` ).children.length &&!document.querySelector(`[square-id="${startid + 5*8}"]` ).children.length && !document.querySelector(`[square-id="${startid + 6*8}"]` ).children.length)||
  
          (startid - 1*1===targetid)||
          (startid - 2*1===targetid && !document.querySelector(`[square-id="${startid - 1*1}"]` ).children.length) ||
          (startid - 3*1===targetid && !document.querySelector(`[square-id="${startid - 1*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 2*1}"]` ).children.length) ||
          (startid - 4*1===targetid && !document.querySelector(`[square-id="${startid - 1*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 2*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 3*1}"]` ).children.length) ||
          (startid - 5*1===targetid && !document.querySelector(`[square-id="${startid - 1*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 2*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 3*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 4*1}"]` ).children.length) ||
          (startid - 6*1===targetid && !document.querySelector(`[square-id="${startid - 1*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 2*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 3*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 4*1}"]` ).children.length &&!document.querySelector(`[square-id="${startid - 5*1}"]` ).children.length) ||
          (startid - 7*1===targetid && !document.querySelector(`[square-id="${startid - 1*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 2*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 3*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 4*1}"]` ).children.length &&!document.querySelector(`[square-id="${startid - 5*1}"]` ).children.length && !document.querySelector(`[square-id="${startid - 6*1}"]` ).children.length)||
  
          (startid + 1*1===targetid)||
          (startid + 2*1===targetid && !document.querySelector(`[square-id="${startid + 1*1}"]` ).children.length) ||
          (startid + 3*1===targetid && !document.querySelector(`[square-id="${startid + 1*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 2*1}"]` ).children.length) ||
          (startid + 4*1===targetid && !document.querySelector(`[square-id="${startid + 1*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 2*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 3*1}"]` ).children.length) ||
          (startid + 5*1===targetid && !document.querySelector(`[square-id="${startid + 1*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 2*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 3*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 4*1}"]` ).children.length) ||
          (startid + 6*1===targetid && !document.querySelector(`[square-id="${startid + 1*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 2*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 3*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 4*1}"]` ).children.length &&!document.querySelector(`[square-id="${startid + 5*1}"]` ).children.length) ||
          (startid + 7*1===targetid && !document.querySelector(`[square-id="${startid + 1*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 2*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 3*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 4*1}"]` ).children.length &&!document.querySelector(`[square-id="${startid + 5*1}"]` ).children.length && !document.querySelector(`[square-id="${startid + 6*1}"]` ).children.length)||
  
          (startid - 1*8 ===targetid)||
          (startid - 2*8 ===targetid && !document.querySelector(`[square-id="${startid - 1*8}"]` ).children.length) ||
          (startid - 3*8 ===targetid && !document.querySelector(`[square-id="${startid - 1*8}"]` ).children.length && !document.querySelector(`[square-id="${startid - 2*8}"]` ).children.length) ||
          (startid - 4*8 ===targetid && !document.querySelector(`[square-id="${startid - 1*8}"]` ).children.length && !document.querySelector(`[square-id="${startid - 2*8}"]` ).children.length && !document.querySelector(`[square-id="${startid - 3*8}"]` ).children.length) ||
          (startid - 5*8 ===targetid && !document.querySelector(`[square-id="${startid - 1*8}"]` ).children.length && !document.querySelector(`[square-id="${startid - 2*8}"]` ).children.length && !document.querySelector(`[square-id="${startid - 3*8}"]` ).children.length && !document.querySelector(`[square-id="${startid - 4*8}"]` ).children.length) ||
          (startid - 6*8 ===targetid && !document.querySelector(`[square-id="${startid - 1*8}"]` ).children.length && !document.querySelector(`[square-id="${startid - 2*8}"]` ).children.length && !document.querySelector(`[square-id="${startid - 3*8}"]` ).children.length && !document.querySelector(`[square-id="${startid - 4*8}"]` ).children.length &&!document.querySelector(`[square-id="${startid - 5*8}"]` ).children.length) ||
          (startid - 7*8 ===targetid && !document.querySelector(`[square-id="${startid - 1*8}"]` ).children.length && !document.querySelector(`[square-id="${startid - 2*8}"]` ).children.length && !document.querySelector(`[square-id="${startid - 3*8}"]` ).children.length && !document.querySelector(`[square-id="${startid - 4*8}"]` ).children.length &&!document.querySelector(`[square-id="${startid - 5*8}"]` ).children.length && !document.querySelector(`[square-id="${startid - 6*8}"]` ).children.length)

      ) {
        return true;
      }
      break;

    //...............................................................................................................................................

    case "knight":
      if (
        (startid +8+2 ===targetid)||
        (startid +8-2 ===targetid)||
        (startid -8+2 ===targetid)||
        (startid -8-2 ===targetid)||
        (startid +16+1 ===targetid)||
        (startid +16-1 ===targetid)||
        (startid -16+1 ===targetid)||
        (startid -16-1 ===targetid)
      )   
      { 
        return true;
      }
      break;
    //...............................................................................................................................................
    default:
      break;
  }
}



function promotefn(target,playercolor) {
  let piece55 = draggedelement.id;
  switch (piece55) {
    case "pawn":

const endrow = [56, 57, 58, 59, 60, 61, 62, 63];      

if(endrow.includes(targetid)){
  appendfunction(target,playercolor);

}}}

function appendfunction(target,playercolor) {
  draggedelement.remove();

  let promoted_piece_no=prompt("To promote Queen enter 1 \n To promote Rook enter 2 \nTo promote bishop enter 3 \n To promote knight enter 4")
  switch (promoted_piece_no) {
    case("1"):{

    if(playercolor=="white"){
      const whitequeen = (document.querySelector("#queen .white").parentNode).cloneNode(true); 
      draggedelement=(whitequeen)
    }
    else{
      const blackqueen = (document.querySelector("#queen .black").parentNode).cloneNode(true);
      draggedelement=(blackqueen)

    }
      break;
    }

    case("2"):{
    if(playercolor=="white"){
      const whiterook =(document.querySelector("#rook .white").parentNode).cloneNode(true); 
      draggedelement=(whiterook)
    }
    else{
      const blackrook =(document.querySelector("#rook .black").parentNode).cloneNode(true); 
      draggedelement=(blackrook)
    }
      break;
    }

    case("3"):{
      if(playercolor=="white"){
        const whitebishop =(document.querySelector("#bishop .white").parentNode).cloneNode(true); 
        draggedelement=(whitebishop)
      }
      else{
        const blackbishop =(document.querySelector("#bishop .black").parentNode).cloneNode(true); 
        draggedelement=(blackbishop)
      }
        break;
      }


      case("4"):{
        if(playercolor=="white"){
          const whiteknight =(document.querySelector("#knight .white").parentNode).cloneNode(true); 
          draggedelement=(whiteknight)
        }
        else{
          const blackknight =(document.querySelector("#knight .black").parentNode).cloneNode(true); 
          draggedelement=(blackknight)
        }
          break;
        }
      
  }
  

}