import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from "react-router-dom";
import Header from './components/Header';
import Character from './pages/Character';
import CharacterDetail from './pages/CharacterDetail';
import Episode from './pages/Episode';
import Location from './pages/Locations';

interface ContextValue {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<any>>;

}

export const LoadingContext = createContext<ContextValue>({
  isLoading: false,
  setIsLoading: () => { }
});

function App() {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Character />} />
          <Route path="/location" element={<Location />} />
          <Route path="/episode" element={<Episode />} />
          <Route path="/character/:id" element={<CharacterDetail />} />
          <Route path="*" element={<Character />} />
        </Routes>
      </Router>
    </LoadingContext.Provider>

  );
}


/* const Home = () => {
  const [pageNumber, setPageNumber] = useState(1);
    const [gender, setGender] = useState('');
    const [search, setSearch] = useState('');
    const [apiStatus, setApiStatus] = useState('');
    const [species, setspecies] = useState('');

    let apiUrl = `https://rickandmortyapi.com/api/character/?page=${pageNumber}&name=${search}&status=${apiStatus}&gender=${gender}&species=${species}`;

    const { status, data, refetch, error } = useQuery<Characters, Error>({
        queryKey: ['api', apiUrl],
        queryFn: () => fetchApi(apiUrl),
    });

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (status === "error") {
        return <div>Error: {error?.message}</div>;
    }


    return (
        <>
            <ul>
                {data?.results?.map((user: any) => (
                    <li key={user.id}>{user.name}</li>
                ))}
                <button onClick={() => refetch}>refetch</button>
            </ul>
        </>

    );
} */

export default App;