import { useState } from "react";

export default function Players(props:any){
    const {initialName, playerSymbol, isActive, onNameSaved} = props

    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(initialName);

    function hadleButtonClick(event:any){
        setIsEditing((isEdit:boolean) => !isEdit)
        
        if(isEditing){
          onNameSaved(playerSymbol,playerName)
        }
    }

     function handleChange(event:any){
        setPlayerName(event.target.value);
     }

    let playerText = <span className="player-name">{playerName}</span>;

    if(isEditing){
        playerText = <input type="text" value={playerName} onChange={handleChange}/>
    }
    return ( 
        
    <li className={isActive && 'active'}>
        <span className="player">{playerText}
        <span className="player-symbol">{playerSymbol}</span>
        </span>
        <button onClick={hadleButtonClick}>{isEditing ? 'Save' : 'Edit'}</button>
        
  </li>
  
   )
}