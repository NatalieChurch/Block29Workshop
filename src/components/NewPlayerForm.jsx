import { useState } from 'react'

function NewPlayer ({onPlayerAdded}) {
    
    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');
    const [status, setStatus] = useState(null);
    
    const API = `https://fsa-puppy-bowl.herokuapp.com/api/2501-FTB-ET-WEB-PT/players`

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newPlayer = {
            name, 
            breed, 
        };

        try {
            const response = await fetch (API, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(newPlayer),
            });
        
            const result = await response.json();

            if (result.success) {
                setName('');
                setBreed('');
                setStatus('Player added!');
                if (onPlayerAdded) onPlayerAdded(); 
            } else {
                setStatus('Failed to add new player...');
            }

        } catch (error) {
            console.error('Error adding player:', error);
            setStatus('Error occurred while adding player...');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
            
                <h2>Add a New Player!</h2>
            
                <label>
                    <input
                        type = "text"
                        placeholder = "Enter name"
                        value = {name}
                        onChange = {(e) => setName(e.target.value)}
                    />
                </label>
            
                <label>
                    <input
                        type = "text"
                        placeholder = "Enter breed"
                        value = {breed}
                        onChange = {(e) => setBreed(e.target.value)}
                    />
                </label>

                <button type="submit" >Add Your New Player!</button>
                {status && <p>{status}</p>}
            
            </form>
        </div>
    )
};


export default NewPlayer