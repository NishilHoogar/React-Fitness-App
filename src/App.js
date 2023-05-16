import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://api.api-ninjas.com/v1/exercises?muscle=${searchTerm}`,
          {
            headers: {
              'X-Api-Key': '/d7MBEuKUtr8TRL2vV1/iA==17Rn2p4BIsx5SgIM'
            }
          }
        );
        const data = await res.json();
        setSearchResults(data);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    }
    if (searchTerm.length > 0) {
      fetchData();
    }
  }, [searchTerm])

  return (
    <div>
    <h1>Fitness App</h1>
      <form>
        <label htmlFor="search">Search for type of exercise:</label>
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={event => setSearchTerm(event.target.value)}
        />
      </form>
      {error && <div>{error.message}</div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        searchResults.map(result => (
          <div key={result.id}>
            <h1>{result.name}</h1>
            <p>{result.muscle}</p>
            <p>The execises which you may perform are: {result.exercises}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default App;