/* ---------------------+
|      CHESS SYSTEM     |
+----------------------*/


let nowTurn = 0;
let chessTableSize = [8, 8];

const GAMEMODE = URLGet("mode")
const CHESS_PIECES = {
    "LIGHT": [{
        "KING": "♕",
        "QUEEN": "♔",
        "BISHOP": "♗",
        "KNIGHT": "♘",
        "ROOK": "♖",
        "PAWN": "♙",
        "CHECKER": "⦾"
    }],
    "DARK": [{
        "KING": "♛",
        "QUEEN": "♚",
        "BISHOP": "♝",
        "KNIGHT": "♞",
        "ROOK": "♜",
        "PAWN": "♟︎",
        "CHECKER": "⦿"
    }]
}

/*=========================*/
document.addEventListener('DOMContentLoaded', DocLoaded);
document.addEventListener("click", DocClick);

function Loaded() {

}

function ChessTable() {

}

function CheckersTable(predPos = NULL, tablesize = chessTableSize) {

}

function URLGet(param = NULL) {
    let url = new URL(window.location.href);
    let argument = url.searchParams.get(param);
    console.info(param + " = " + argument);
}