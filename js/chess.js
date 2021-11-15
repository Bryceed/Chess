/* ---------------------+
|      CHESS SYSTEM     |
+----------------------*/


let nowTurn = 0;
let chessTableSize = [8, 8];

const GAMEMODE = URLGet("mode")
const TILE_IDENTIFIER_PREFIX = "cell";
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

function DocLoaded() {

}

function DocClick(event) {

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