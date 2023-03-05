import React, { Fragment, useState, useContext, useEffect } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid'
import { EpisodeData, Info, LocationData } from '../../typings';
import { EpisodesContext } from '../pages/Episode';
import { LocationsContext } from '../pages/Locations';


type Props = {
    data: {
        info: Info, results: EpisodeData[] | LocationData[], error: string
    }
    totalCount: number;
    contentType: string;
}

function SelectDropdown({ data, totalCount, contentType }: Props) {
    const { episode, setEpisode } = useContext(EpisodesContext)
    const { setLocation } = useContext(LocationsContext)
    const [numArr, setNumArr] = useState<any[]>([]);
    const EpisodeCountArr = Array.from({length: totalCount}, (_, index) => index + 1);


    const [selected, setSelected] = useState(1)
    const handleOnChange = (e: any) => {
        setSelected(e)
        if (contentType === 'Episode') {
          setEpisode(e)
        }else if (contentType === 'Location') {
          setLocation(e)
        }

    }
    return (
        <div className="w-50 mt-5">
          <Listbox value={selected} onChange={handleOnChange}>
            <div className="relative mt-1 z-[99]">
              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                <span className="block truncate">{contentType} {selected}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {EpisodeCountArr.map((num, index) => (
                    <Listbox.Option
                      key={index}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                        }`
                      }
                      value={num}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            {contentType} {num}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
      )
}

export default SelectDropdown