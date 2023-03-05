import React, { useState, useRef, useContext } from 'react';
import { CharacterContext } from '../pages/Character';

interface Props {
}

const SearchBar = () => {
    const { setSearch } = useContext(CharacterContext);
    const inputRef: React.Ref<any> = useRef(null)
    const [query, setQuery] = useState('');
    const [error, setError] = useState(false)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(inputRef);

        if (!inputRef?.current?.value) {
            setError(true)
        } else {
            setError(false)
            setSearch(inputRef?.current?.value)
        }
        console.log(inputRef?.current?.value);
    }

    return (
        <>
            <form className='mt-5 flex items-center gap-3' onSubmit={handleSubmit}>
                <div className="relative w-full">
                    <input type="text" className={`bg-theme1Color2 input input-bordered w-full ${error && 'border-red-500 border-l-[15px]'}`} placeholder="Search" ref={inputRef} />
                </div>

                <button type='submit' className="btn bg-theme1Color4 b text-white border-none hover:bg-theme1Color4 hover:opacity-70">
                    Search
                </button>
            </form>
            {error && <p className='text-sm text-red-500 mt-1 mb-5 pl-2'>Please enter search item</p>}
        </>

    );
};

export default SearchBar;
