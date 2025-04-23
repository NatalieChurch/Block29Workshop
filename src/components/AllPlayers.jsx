import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { fetchAllPlayers } from "../API"

function AllPlayers ({}) {

    const [players, setPlayers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(()=>{
        
        const getPlayers = async () => {
            try {
                const data = await fetchAllPlayers();
                console.log(data)
                setPlayers(data.players);
                } catch (err) {
                    setError(err.message)
                }
        };
           getPlayers();

    }, []);

    if (error) return <div>Error</div>
    if (!players) return <div>Loading</div>;

    const navigate = useNavigate()


    return (
        <div>
        {
            players &&
            players?.map((player) =>
                <div>
                    <h1>{player.name}</h1>
                    <h3>{player.breed}</h3>
                    <button onClick={()=>navigate(`/players/${player.id}`)}>Look at Player Details</button>
                </div>
            )
        }
        </div>
    )
}


export default AllPlayers