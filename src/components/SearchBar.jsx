import { useEffect, useState } from "react";

const SearchBar = () => {

    const [players, setPlayers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);

    const API = `https://fsa-puppy-bowl.herokuapp.com/api/2501-FTB-ET-WEB-PT/players`

     useEffect(()=>{
         fetch(API)
             .then(res => res.json())
             .then(data => {
                const playerList = data.data.players;
                setPlayers(playerList);
                setFilteredResults(playerList);
             })
             .catch(error => console.error('Error fetching data:', error));
     }, []);

     useEffect(()=>{
        const lowerSearch = searchTerm.toLowerCase();
        const filtered = players.filter(player =>
            player.name.toLowerCase().includes(lowerSearch)
        );
        setFilteredResults(filtered);

     }, [searchTerm, players]);

    return (
        <div>
            <input 
                type = "text"
                placeholder = "Enter search term"
                value = {searchTerm}
                onChange = {e => setSearchTerm(e.target.value)}
            />

            <ul>
                {filteredResults.map(player => (
                    <li key={player.id}>{player.name}</li>
                ))}
            </ul>
        </div>
    )
};

 export default SearchBar;