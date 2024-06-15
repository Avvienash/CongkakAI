transpositionTable = {};

function moveBoard(board, h, player) {
    let stones = board[h];
    board[h] = 0;
    let i = h;
    while (stones > 0) {
        i += 1;
        if (player === 0 && i === 15) {
            i += 1;
        } else if (player === 1 && i === 7) {
            i += 1;
        }
        i %= 16;
        board[i] += 1;
        stones -= 1;
        if (stones === 0) {
            let nextPlayer;
            if (player === 0 && i === 7) {
                nextPlayer = 0;
                return [board, nextPlayer];
            } else if (player === 1 && i === 15) {
                nextPlayer = 1;
                return [board, nextPlayer];
            } else if (board[i] > 1) {
                stones = board[i];
                board[i] = 0;
            } else if (board[i] === 1) {
                if (player === 0 && i < 7) {
                    board[7] += board[14 - i];
                    board[14 - i] = 0;
                    board[7] += 1;
                    board[i] = 0;
                } else if (player === 1 && i > 7) {
                    board[15] += board[14 - i];
                    board[14 - i] = 0;
                    board[15] += 1;
                    board[i] = 0;
                }
                nextPlayer = (player + 1) % 2;
                return [board, nextPlayer];
            }
        }
    }
}

function calculateScore(board) {
    return board[7] - board[15];
}

function gameover(board) {
    return (board.slice(0, 7).reduce((a, b) => a + b, 0) + board.slice(8, 15).reduce((a, b) => a + b, 0)) === 0;
}

function generateMoves(board, player) 
{
    if (player === 0) 
    {
        moves = []
        for (let i = 0; i < 7; i++) 
        {
            if (board[i] > 0) 
            {
                moves.push(i);
            }
        }
    } 
    else 
    {
        moves = []
        for (let i = 8; i < 15; i++) 
        {
            if (board[i] > 0) 
            {
                moves.push(i);
            }
        }
    }

    console.log("Moves: ", moves);
    return moves;
}

function hashBoard(board) {
    const filteredBoard = board.filter((_, index) => index !== 7 && index !== 15);
    return filteredBoard.join(",");
}

function minmaxAlphaBetaPruningHash(board, player, depth, alpha, beta)
{
    if (gameover(board) || depth === 0) {
        return calculateScore(board);
    }
    
    const boardHash = hashBoard(board);
    if (boardHash in transpositionTable) {
        return transpositionTable[boardHash];
    }
    
    const moves = generateMoves(board, player);
    if (moves.length === 0) {
        return minmaxAlphaBetaPruningHash(board, 1 - player, depth, alpha, beta);
    }
    
    let bestScore = player === 0 ? -Infinity : Infinity;
    for (const move of moves) {
        const [newBoard, nextPlayer] = moveBoard([...board], move, player);
        const score = minmaxAlphaBetaPruningHash(newBoard, nextPlayer, depth - 1, alpha, beta);
        if (player === 0)
        {
            bestScore = Math.max(bestScore, score);
            alpha = Math.max(alpha, score);
            if (beta <= alpha)
            {
                break;
            }
        } else {
            bestScore = Math.min(bestScore, score);
            beta = Math.min(beta, score);
            if (beta <= alpha) {
                break;
            }
        }
    }
    
    transpositionTable[boardHash] = bestScore;
    return bestScore;
}

function bestMoveMinmaxAlphaBetaPruningHash(board, player, depth,max_player) 
{
    let bestScore = player === 0 ? -Infinity : Infinity;
    let bestMove = null;
    let alpha = -Infinity;
    let beta = Infinity;

    console.log("Board: ", board);
    for (const move of generateMoves(board, player)) 
    {
        const newBoard = [...board];
        const [updatedBoard, nextPlayer] = moveBoard(newBoard, move, player);
        let score = minmaxAlphaBetaPruningHash(updatedBoard, nextPlayer, depth - 1, alpha, beta);
        if (max_player === 1)
        {
            score = -score;
        }
        if ((player === 0 && score > bestScore) || (player === 1 && score < bestScore)) {
            bestScore = score;
            bestMove = move;
        }
    }

    return bestMove;
}
