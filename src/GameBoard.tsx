export default function GameBoard(props:any){
    const {onSelectSquare, board} = props;
    return (
        <ol id="game-board">
            {board.map((row:any, rowIndex:number)=> 
                <li key = {rowIndex}>
                    <ol>
                        {row.map((playerSymbol:any,colIndex:number)=> 
                        <li key={colIndex}>
                            <button onClick={() => onSelectSquare(rowIndex,colIndex)} disabled={playerSymbol}>{playerSymbol}</button>
                        </li>
                        )}
                    </ol>
                </li>
            
        )}
        </ol>
    );
}