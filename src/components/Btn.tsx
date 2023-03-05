import React, { useContext, useRef, useState } from 'react'
import { CharacterContext } from '../pages/Character';

type Props = {
    option: string,
    type: string
}

function Btn({ option, type }: Props) {
    const { species, setSpecies, characterStatus, setCharacterStatus, gender, setGender, setPageNumber } = useContext(CharacterContext);
    const [active, setActive] = useState(false);
    const handleOnClick = () => {
        if (type === 'Species') {
            if (species !== option) {
                setSpecies(option)
            }else {
                setSpecies('')
            }
        } else if (type === 'Gender') {
            if (gender !== option) {
                setGender(option)
            }else {
                setGender('')
            }
        } else if (type === 'Status') {
            if (characterStatus !== option) {
                setCharacterStatus(option)
            }else {
                setCharacterStatus('')
            }
        }
        setPageNumber(1)
    }

    return (
        <button className={`border p-3 py-1 rounded-full ${(type === 'Species' ? species: (type === 'Gender' ? gender : characterStatus)) === option && 'bg-theme1Color3 border-theme1Color3 text-white'}`} onClick={handleOnClick}>
            {option}
        </button>
    )
}

export default Btn