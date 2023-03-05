import React, { useEffect, useState, createContext, useCallback } from 'react'
import { useInfiniteQuery, useQueries, useQuery, UseQueryResult } from 'react-query';
import { Characters, Info, Result, EpisodeData } from '../../typings';
import { fetchApi, fetchLocationCharacter } from '../api';
import FrontendPaginatedItems from '../components/FrontendPagination';
import Loading from '../components/Loading';
import PaginatedItems from '../components/Pagination';
import SelectDropdown from '../components/SelectDropdown';

interface ContextValue {
    episode: string | number;
    setEpisode: React.Dispatch<React.SetStateAction<any>>;

}

export const EpisodesContext = createContext<ContextValue>({
    episode: '',
    setEpisode: () => { },
});

function Episode() {
    const [isLoadingState, setIsLoadingState] = useState(false)
    const [totalEpisode, setTotalEpisode] = useState(0);
    const [episode, setEpisode] = useState<string | number>('');
    const [charactersData, setCharactersData] = useState<string[]>([]);
    useEffect(() => {
        console.log(charactersData);


    }, [charactersData])
    useEffect(() => {
        console.log(totalEpisode);


    }, [totalEpisode])

    let episodeApiUrl = `https://rickandmortyapi.com/api/episode/${episode}`;


    const { status, data, isLoading, isFetching, isError } = useQuery<{ info: Info, results: EpisodeData[], characters: any[], error: string }>({
        queryKey: ['api', episodeApiUrl],
        queryFn: () => fetchApi(episodeApiUrl),
        keepPreviousData: true,
        refetchOnWindowFocus: false,
        onSuccess: (data) => {

            if (typeof episode === 'string') {
                fetchLocationCharacter(data?.results[0].characters).then(result => {
                    console.log(data);
                    setCharactersData(result)
                    setTotalEpisode(data?.info?.count)
                })

            }else {
                setIsLoadingState(true)
                fetchLocationCharacter(data?.characters).then(result => {
                    setIsLoadingState(false)
                    setCharactersData(result)
                })
            }
        },
    });

    return (
        <EpisodesContext.Provider value={{ episode, setEpisode }} >
            <div className="container">
                <div>
                    <div className="max-w-lg mx-auto w-full">
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-5 lg:gap-10">
                    <div className="w-60 flex flex-col gap-5 mx-auto md:mx-0">
                        <SelectDropdown contentType='Episode' data={data!} totalCount={totalEpisode} />
                    </div>
                    {status === 'loading' || isFetching || isLoadingState ? (
                        <Loading />
                    ) : (
                        <div className="w-full">
                            {isError && (
                                <div>Nothing Found</div>
                            )}
                            <FrontendPaginatedItems itemsPerPage={20} items={charactersData} />
                            {/* {charactersData?.map((user: any) => (
                                <div key={user.id}>{user.name}</div>
                            ))} */}
                        </div>
                    )}

                </div>

            </div>
        </EpisodesContext.Provider>

    )
}

export default Episode