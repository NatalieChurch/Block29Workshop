const API = `https://fsa-puppy-bowl.herokuapp.com/api/2501-FTB-ET-WEB-PT/players`

export const fetchAllPlayers = async () => {
    try {
      const res = await fetch(`${API}`)
      const data = await res.json()
        
      return(data.data)
    } catch (err) {
      console.error(`Oh no, trouble fetching players!`, err);
    }
  };