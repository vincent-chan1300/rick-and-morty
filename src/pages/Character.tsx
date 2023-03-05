import React, { useState, createContext } from "react";
import { useQuery } from "react-query";
import { fetchApi } from "../api";
import { Characters, Info, Result } from '../../typings';
import SearchBar from "../components/Search";
import Loading from "../components/Loading";
import PaginatedItems from "../components/Pagination";
import Dropdown from "../components/Dropdown";
import { speciesOptions, gendersOptions, statusOptions } from "../components/Data";
import { Link } from "react-router-dom";

interface ContextValue {
    species: string;
    setSpecies: React.Dispatch<React.SetStateAction<any>>;
    characterStatus: string;
    setCharacterStatus: React.Dispatch<React.SetStateAction<any>>;
    gender: string;
    setGender: React.Dispatch<React.SetStateAction<any>>;
    setSearch: React.Dispatch<React.SetStateAction<any>>;
    setPageNumber: React.Dispatch<React.SetStateAction<any>>;


}

export const CharacterContext = createContext<ContextValue>({
    species: '',
    setSpecies: () => { },
    characterStatus: '',
    setCharacterStatus: () => { },
    gender: '',
    setGender: () => { },
    setSearch: () => { },
    setPageNumber: () => { }

});

const CharactersPage = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const [gender, setGender] = useState('');
    const [search, setSearch] = useState('');
    const [characterStatus, setCharacterStatus] = useState('');
    const [species, setSpecies] = useState('');

    let apiUrl = `https://rickandmortyapi.com/api/character/?page=${pageNumber}&name=${search}&status=${characterStatus}&gender=${gender}&species=${species}`;

    const { status, data, isLoading, isFetching } = useQuery<{ info: Info, results: Result[], error: string }, Error>({
        queryKey: ['api', apiUrl],
        queryFn: () => fetchApi(apiUrl),
        keepPreviousData: true,
        refetchOnWindowFocus: false
    });


    return (
        <CharacterContext.Provider value={{ species, setSpecies, gender, setGender, characterStatus, setCharacterStatus, setSearch, setPageNumber }} >
            <div className="container">
                <div>
                    <div className="max-w-lg mx-auto w-full">
                        <SearchBar />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-5 lg:gap-10">

                    <div className="w-full sm:w-80 flex flex-col gap-5 mx-auto md:mx-0 mt-6">
                        <Dropdown options={speciesOptions} title="Species" />
                        <Dropdown options={gendersOptions} title="Gender" />
                        <Dropdown options={statusOptions} title="Status" />
                    </div>
                    {status === 'loading' || isFetching ? (
                        <Loading />
                    ) : (
                        <div>
                            <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 max-w-6xl mx-auto py-4 lg:p-4">
                                {data?.error && (
                                    <div>Nothing Found</div>
                                )}
                                {data?.results?.map((user: any) => (
                                    <Link to={`/character/${user.id}`} className="mx-auto sm:mx-0 shadow-md rounded-lg p-4 transition-all hover:opacity-70 hover:shadow-xl" key={user.id}>
                                        <div className="relative w-full">
                                            <img src={user.image} alt="" />
                                        </div>
                                        <h2 className='mt-3'>{user.name}</h2>
                                    </Link>

                                ))}
                            </div>
                            <PaginatedItems
                                currentPage={pageNumber}
                                pageCount={data?.info?.pages!}
                                setPageNumber={setPageNumber}
                            />
                        </div>

                    )}

                </div>

            </div>
        </CharacterContext.Provider>



    );

};


export default CharactersPage;
