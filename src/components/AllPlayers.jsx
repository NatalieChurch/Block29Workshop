import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { fetchAllPlayers } from "../API"
import NewPlayer from "./NewPlayerForm";

function AllPlayers ({}) {

    const [players, setPlayers] = useState([]);
    const [error, setError] = useState(null);
    const API = `https://fsa-puppy-bowl.herokuapp.com/api/2501-FTB-ET-WEB-PT/players`
   
   
    const getPlayers = async () => {
            try {
                const data = await fetchAllPlayers();
                console.log(data)
                setPlayers(data.players);
                } catch (err) {
                    setError(err.message)
                }
        };
   
   
        useEffect(()=>{
           getPlayers();

    }, []);

    if (error) return <div>Error</div>
    if (!players) return <div>Loading</div>;


    const handleDelete = async (playerId) => {
        try {
            const response = await fetch (`${API}/${playerId}`, {
                method: 'DELETE',
            });

            const result = await response.json();

            if (result.success) {
                const myPlayers = JSON.parse(localStorage.getItem('myPlayers')) || [];
                const updated = myPlayers.filter(id => id !== playerId);
                localStorage.setItem('myPlayers', JSON.stringify(updated));

                getPlayers();
                if (onPlayerDeleted) onPlayerDeleted();
            }
        } catch (err) {
            console.error('Delete failed', err);
        }
    }


    const navigate = useNavigate()

    const myPlayers = JSON.parse(localStorage.getItem('myPlayers')) || [];

    return (
        <div>
        {
            players &&
            players?.map((player) =>
                <div key={player.id}>
                    <h1>{player.name}</h1>
                    <h3>{player.breed}</h3>
                    <button onClick={()=>navigate(`/players/${player.id}`)}>Look at Player Details</button>
                    
                    {myPlayers.includes(player.id) && (
                        <button onClick = {()=> handleDelete(player.id)}>Delete this Player</button>)}
                    
                
                </div>
            )
        }
        </div>
    )
}


export default AllPlayers