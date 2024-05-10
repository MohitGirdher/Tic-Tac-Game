export default function Logs(props:any){
    const {turns} = props
    return <ol id="log">
        {turns.map((turn:any)=> <li key = {`${turn.symbol.row}${turn.symbol.col}`}>
            {turn.player} selected {turn.symbol.row}, {turn.symbol.col}</li>)}
    </ol>
}