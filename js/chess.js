function URLGet(param = NULL) {
    let url = new URL(window.location.href);
    let argument = url.searchParams.get(param);
    console.info(param + " = " + argument);
}



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
    }],
    "EMPTY": "▢"
}

/*=========================*/
document.addEventListener('DOMContentLoaded', DocLoaded);
document.addEventListener("click", DocClick);

function DocClick(e) {
    if (e.target.classList.contains("cell")) {
        let cell = e.target;
        let cellId = cell.id;
        let cellIdSplit = cellId.split("-");
        let cellX = cellIdSplit[1];
        let cellY = cellIdSplit[2];
        let cellPiece = cell.innerHTML;
        let cellPieceColor = cellPiece.charAt(0);
        let cellPieceType = cellPiece.charAt(1);
    }
}


function DocLoaded() {
    let chessTable = document.getElementById("ChessTable");
    let chessTableCells = chessTable.getElementsByClassName("cell");
    // map chessTableCells to chessTableCellsArray for easier access using the 2 last digits of the id beign the x and y coordinates respectively
    let chessTableCellsArray = Array.from(chessTableCells);
    chessTableCellsArray.forEach(function(cell) {
        cell.innerHTML = "";
        // get the letter of the cell line follow the pattern "cellXY" where X and Y are the coordinates of the cell
        let cellId = cell.id;
        // split the cell id to get the x and y coordinates as the last 2 digits of the id
        let cellIdSplit = cellId.split("cell");
        // split again to get the x and y coordinates as the 2 characters of the last part of the split
        let cellIdSplit2 = cellIdSplit[1].split("");
        // get the x and y coordinates as letter and number
        let cellX = cellIdSplit2[0];
        let cellY = cellIdSplit2[1];

        // set the cell id as the x and y coordinates
        cell.id = cellX + cellY;

    });
    // print the chess array
    console.table(chessTableCellsArray);


    if (URLGet("mode") == "chess") {
        let chessTable = document.getElementById("chessTable");
        let chessTableHTML = "";
        for (let y = 0; y < chessTableSize[1]; y++) {
            chessTableHTML += "<tr>";
            for (let x = 0; x < chessTableSize[0]; x++) {
                chessTableHTML += "<td id='" + TILE_IDENTIFIER_PREFIX + "-" + x + "-" + y + "' class='cell'></td>";
            }
            chessTableHTML += "</tr>";
        }
        chessTable.innerHTML = chessTableHTML;
        // clean the content inside the cells, and create a simple animation cleaning it with a 50ms delay
        let cells = document.getElementsByClassName("cell");
        for (let i = 0; i < cells.length; i++) {
            cells[i].innerHTML = "";
            setTimeout(function() {
                cells[i].innerHTML = "";
            }, 50);
        }
        let chessPieces = CHESS_PIECES;

        // set the chess pieces
        for (let y = 0; y < chessTableSize[1]; y++) {
            for (let x = 0; x < chessTableSize[0]; x++) {
                let cell = document.getElementById("cell" + x + y);
                if (y % 2 == 0) {
                    if (x % 2 == 0) {
                        cell.innerHTML = chessPieces.LIGHT[0].PAWN;
                    } else {
                        cell.innerHTML = chessPieces.DARK[0].PAWN;
                    }
                } else {
                    if (x % 2 == 0) {
                        cell.innerHTML = chessPieces.DARK[0].PAWN;
                    } else {
                        cell.innerHTML = chessPieces.LIGHT[0].PAWN;
                    }
                }
            }
        }


    } else if (URLGet("mode") == "ckeckers") {
        let chessTable = document.getElementById("chessTable");
        for (let y = 0; y < chessTableSize[1]; y++) {
            // set the inner html a div with the class "chesspiece" and the id "chesspiece-C-T" where C is the color and T is the type
            chessTable.innerHTML += "<div class='chesspiece' id='chesspiece-" + CHESS_PIECES.LIGHT[0].CHECKER + "-" + y + "'></div>";



        }

        let chessPieces = CHESS_PIECES;

    }

    // when a cell is clicked, it will be highlighted with the possible moves
    function highlightPossibleMoves(cell) {
        let cellId = cell.id;
        let cellIdSplit = cellId.split("-");
        let cellX = cellIdSplit[1];
        let cellY = cellIdSplit[2];
        let cellPiece = cell.innerHTML;
        let cellPieceColor = cellPiece.charAt(0);
        let cellPieceType = cellPiece.charAt(1);
        let possibleMoves = [];
        if (cellPieceType == "P") {
            if (cellPieceColor == "L") {
                if (cellY == 1) {
                    possibleMoves.push("cell" + (cellX - 1) + (cellY + 1));
                    possibleMoves.push("cell" + (cellX + 1) + (cellY + 1));
                } else {
                    possibleMoves.push("cell" + (cellX - 1) + (cellY + 1));
                    possibleMoves.push("cell" + (cellX + 1) + (cellY + 1));

                    possibleMoves.push("cell" + (cellX - 1) + (cellY - 1));
                    possibleMoves.push("cell" + (cellX + 1) + (cellY - 1));
                }
            } else {
                if (cellY == 6) {
                    possibleMoves.push("cell" + (cellX - 1) + (cellY - 1));
                    possibleMoves.push("cell" + (cellX + 1) + (cellY - 1));
                } else {
                    possibleMoves.push("cell" + (cellX - 1) + (cellY - 1));
                    possibleMoves.push("cell" + (cellX + 1) + (cellY - 1));

                    possibleMoves.push("cell" + (cellX - 1) + (cellY + 1));
                    possibleMoves.push("cell" + (cellX + 1) + (cellY + 1));
                }
            }
        } else if (cellPieceType == "R") {
            for (let i = 1; i < 8; i++) {
                if (cellX + i < 8) {
                    possibleMoves.push("cell" + (cellX + i) + (cellY));
                }
                if (cellX - i >= 0) {
                    possibleMoves.push("cell" + (cellX - i) + (cellY));
                }
                if (cellY + i < 8) {
                    possibleMoves.push("cell" + (cellX) + (cellY + i));
                }
                if (cellY - i >= 0) {
                    possibleMoves.push("cell" + (cellX) + (cellY - i));
                }
            }
        } else if (cellPieceType == "B") {
            for (let i = 1; i < 8; i++) {
                if (cellX + i < 8) {
                    if (cellY + i < 8) {
                        possibleMoves.push("cell" + (cellX + i) + (cellY + i));
                    }
                    if (cellY - i >= 0) {
                        possibleMoves.push("cell" + (cellX + i) + (cellY - i));
                    }
                }
                if (cellX - i >= 0) {
                    if (cellY + i < 8) {
                        possibleMoves.push("cell" + (cellX - i) + (cellY + i));
                    }
                    if (cellY - i >= 0) {
                        possibleMoves.push("cell" + (cellX - i) + (cellY - i));
                    }
                }
            }
        } else if (cellPieceType == "N") {
            if (cellX + 2 < 8 && cellY + 1 < 8) {
                possibleMoves.push("cell" + (cellX + 2) + (cellY + 1));
            }
            if (cellX + 2 < 8 && cellY - 1 >= 0) {
                possibleMoves.push("cell" + (cellX + 2) + (cellY - 1));
            }
            if (cellX - 2 >= 0 && cellY + 1 < 8) {
                possibleMoves.push("cell" + (cellX - 2) + (cellY + 1));
            }
            if (cellX - 2 >= 0 && cellY - 1 >= 0) {
                possibleMoves.push("cell" + (cellX - 2) + (cellY - 1));
            }
            if (cellX + 1 < 8 && cellY + 2 < 8) {
                possibleMoves.push("cell" + (cellX + 1) + (cellY + 2));
            }
            if (cellX + 1 < 8 && cellY - 2 >= 0) {
                possibleMoves.push("cell" + (cellX + 1) + (cellY - 2));
            }
            if (cellX - 1 >= 0 && cellY + 2 < 8) {
                possibleMoves.push("cell" + (cellX - 1) + (cellY + 2));
            }
            if (cellX - 1 >= 0 && cellY - 2 >= 0) {
                possibleMoves.push("cell" + (cellX - 1) + (cellY - 2));
            }
        } else if (cellPieceType == "K") {
            if (cellX + 1 < 8 && cellY + 1 < 8) {
                possibleMoves.push("cell" + (cellX + 1) + (cellY + 1));
            }
            if (cellX + 1 < 8 && cellY - 1 >= 0) {
                possibleMoves.push("cell" + (cellX + 1) + (cellY - 1));
            }
            if (cellX - 1 >= 0 && cellY + 1 < 8) {
                possibleMoves.push("cell" + (cellX - 1) + (cellY + 1));
            }
            if (cellX - 1 >= 0 && cellY - 1 >= 0) {
                possibleMoves.push("cell" + (cellX - 1) + (cellY - 1));
            }
            if (cellX + 1 < 8) {
                possibleMoves.push("cell" + (cellX + 1) + (cellY));
            }
            if (cellX - 1 >= 0) {
                possibleMoves.push("cell" + (cellX - 1) + (cellY));
            }
            if (cellY + 1 < 8) {
                possibleMoves.push("cell" + (cellX) + (cellY + 1));
            }
            if (cellY - 1 >= 0) {
                possibleMoves.push("cell" + (cellX) + (cellY - 1));
            }
        } else if (cellPieceType == "Q") {
            for (let i = 1; i < 8; i++) {
                if (cellX + i < 8) {
                    possibleMoves.push("cell" + (cellX + i) + (cellY));
                }
                if (cellX - i >= 0) {
                    possibleMoves.push("cell" + (cellX - i) + (cellY));
                }
                if (cellY + i < 8) {
                    possibleMoves.push("cell" + (cellX) + (cellY + i));
                }
                if (cellY - i >= 0) {
                    possibleMoves.push("cell" + (cellX) + (cellY - i));
                }
                if (cellX + i < 8 && cellY + i < 8) {
                    possibleMoves.push("cell" + (cellX + i) + (cellY + i));
                }
                if (cellX + i < 8 && cellY - i >= 0) {
                    possibleMoves.push("cell" + (cellX + i) + (cellY - i));
                }
                if (cellX - i >= 0 && cellY + i < 8) {
                    possibleMoves.push("cell" + (cellX - i) + (cellY + i));
                }
                if (cellX - i >= 0 && cellY - i >= 0) {
                    possibleMoves.push("cell" + (cellX - i) + (cellY - i));
                }
            }
        } else if (cellPieceType == "C") {
            for (let i = 1; i < 8; i++) {
                if (cellX + i < 8 && cellY + i < 8) {
                    possibleMoves.push("cell" + (cellX + i) + (cellY + i));
                }
                if (cellX + i < 8 && cellY - i >= 0) {
                    possibleMoves.push("cell" + (cellX + i) + (cellY - i));
                }
                if (cellX - i >= 0 && cellY + i < 8) {
                    possibleMoves.push("cell" + (cellX - i) + (cellY + i));
                }
                if (cellX - i >= 0 && cellY - i >= 0) {
                    possibleMoves.push("cell" + (cellX - i) + (cellY - i));
                }
            }
        }
        return possibleMoves;
    }

}