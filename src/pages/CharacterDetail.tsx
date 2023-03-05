import React from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { Info } from 'rickmortyapi';
import { Result } from '../../typings';
import { fetchApi } from '../api';
import Loading from '../components/Loading';

function CharacterDetail() {
    const { id } = useParams();
    let apiUrl = `https://rickandmortyapi.com/api/character/${id}`
    const { status, data, isLoading, isFetching } = useQuery<Result>({
        queryKey: ['api', apiUrl],
        queryFn: () => fetchApi(apiUrl),
        keepPreviousData: true,
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            console.log(data);
        }
    });

    return (
        <div>
            {data?.error && (
                <div className='flex items-center justify-center min-h-screen'>
                    <span className='font-bold text-xl'>{data?.error}</span>
                </div>
            )}
            {status === 'loading' || isFetching ? (
                <Loading />
            ) : (
                <div className='flex items-center justify-center px-5 min-h-screen'>
                    <div className='my-9 max-w-5xl mx-auto w-full p-6 border rounded-xl'>
                        <div className='flex flex-col md:flex-row gap-5'>
                            <img className='block' src={data?.image} alt={data?.name} />
                            <div className='space-y-5'>
                                <p className=''><span className='font-bold'>Name:</span> {data?.name}</p>
                                <p className=''><span className='font-bold'>Status:</span> {data?.status}</p>
                                <p className=''><span className='font-bold'>Species:</span> {data?.species}</p>
                                <p className=''><span className='font-bold'>Type:</span> {data?.type}</p>
                                <p className=''><span className='font-bold'>Gender:</span>{data?.gender}</p>
                                <p className=''><span className='font-bold'>Origin:</span>{data?.origin.name}</p>
                                <p className=''><span className='font-bold'>Location:</span>{data?.location.name}</p>
                            </div>
                            <div className='flex flex-col gap-1 max-w-xs'>
                                <span>Episodes: </span>
                                <div className='flex flex-wrap gap-1 h-fit'>
                                    {data?.episode.map((item, index) => {
                                        return (
                                            <div key={index} className='w-6 h-6 rounded-full p-2 bg-theme1Color4 text-white flex items-center justify-center'>{item.split('/').pop()}</div>
                                        )
                                    })}
                                </div>

                            </div>
                        </div>


                    </div>
                </div>
            )}

        </div>
    )
}

export default CharacterDetail