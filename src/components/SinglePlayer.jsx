import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { fetchSinglePlayer } from "../API/singlePlayer";

function SinglePlayer () {


    const {id} = useParams()
    const [player, setPlayer] = useState([]);
    const navigate = useNavigate()

    useEffect(()=>{
        
        const getPlayer = async () => {
            try {
                const data = await fetchSinglePlayer(id);
                console.log(data)
                setPlayer(data.player);
                } catch (err) {
                    console.error(err)
                }
        };
           getPlayer();

    }, []);

    return (
        <>
            {player && (
                <div key={player.id}>
                    <h1>{player.name}</h1>
                    <img src={player.imageUrl} style={{width:"200px"}} />
                    <h2>{player.breed}</h2>
                    <h2>{player.id}</h2>
                    <h3>{player.teamId}</h3>
                    <h3>{player.status}</h3>
                    <button onClick={()=>navigate("/players")}>Go Back to Players</button>
                </div>
            )}
        </>
    )
}


export default SinglePlayer