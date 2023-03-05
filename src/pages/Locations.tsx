import React, { useEffect, useState, createContext, useCallback } from 'react'
import { useInfiniteQuery, useQueries, useQuery, UseQueryResult } from 'react-query';
import { Characters, Info, Result, LocationData } from '../../typings';
import { fetchApi, fetchLocationCharacter } from '../api';
import FrontendPaginatedItems from '../components/FrontendPagination';
import Loading from '../components/Loading';
import PaginatedItems from '../components/Pagination';
import SelectDropdown from '../components/SelectDropdown';

interface ContextValue {
    location: string | number;
    setLocation: React.Dispatch<React.SetStateAction<any>>;

}

export const LocationsContext = createContext<ContextValue>({
    location: '',
    setLocation: () => { },
});

function Locations() {
    const [isLoadingState, setIsLoadingState] = useState(false)
    const [totalLocation, setTotalLocation] = useState(0);
    const [location, setLocation] = useState<string | number>('');
    const [charactersData, setCharactersData] = useState<string[]>([]);
    useEffect(() => {
        console.log(charactersData);


    }, [charactersData])
    useEffect(() => {
        console.log(totalLocation);


    }, [totalLocation])

    let locationApiUrl = `https://rickandmortyapi.com/api/location/${location}`;


    const { status, data, isLoading, isFetching, isError } = useQuery<{ info: Info, results: LocationData[], residents: any[], error: string }>({
        queryKey: ['api', locationApiUrl],
        queryFn: () => fetchApi(locationApiUrl),
        keepPreviousData: true,
        refetchOnWindowFocus: false,
        onSuccess: (data) => {

            if (typeof location === 'string') {
                fetchLocationCharacter(data?.results[0].residents).then(result => {
                    console.log(data);
                    setCharactersData(result)
                    setTotalLocation(data?.info?.count)
                })

            }else {
                setIsLoadingState(true)
                fetchLocationCharacter(data?.residents).then(result => {
                    console.log(result);

                    setIsLoadingState(false)
                    setCharactersData(result)
                })
            }
        },
    });
    useCallback(() => {
        console.log(data);


    },[data])

    return (
        <LocationsContext.Provider value={{ location, setLocation }} >
            <div className="container">
                <div>
                    <div className="max-w-lg mx-auto w-full">

                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-5 lg:gap-10">
                    <div className="w-60 flex flex-col gap-5 mx-auto md:mx-0">
                        <SelectDropdown contentType='Location' data={data!} totalCount={totalLocation} />
                    </div>
                    {status === 'loading' || isFetching || isLoadingState ? (
                        <Loading />
                    ) : (
                        <div className="w-full ">
                            {isError && (
                                <div>Nothing Found</div>
                            )}
                            <FrontendPaginatedItems itemsPerPage={20} items={charactersData} />

                        </div>
                    )}

                </div>

            </div>
        </LocationsContext.Provider>

    )
}

export default Locations