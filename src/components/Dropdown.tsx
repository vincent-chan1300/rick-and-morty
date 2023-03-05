import { Disclosure, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import React from 'react'
import Btn from './Btn'

type Props = {
    options: string[],
    title: string,
}

function Dropdown({ options, title }: Props) {

    return (
        <>
            <Disclosure>
                {({ open }) => (
                    <>
                        <Disclosure.Button className={`p-2 rounded-xl border relative font-bold ${open ? 'bg-theme1Color3 border-theme1Color3 text-white':''}`}>
                            {title}
                            <ChevronDownIcon className={`absolute top-1/2 -translate-y-1/2 right-4 w-4 h-4 ${open ? 'rotate-180':''}`} />
                        </Disclosure.Button>

                        <Transition
                            show={open}
                            enter="transition duration-100 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition duration-75 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0"
                            className="p-2 rounded-xl border -mt-4"
                        >
                            <Disclosure.Panel className="flex gap-3 flex-wrap" static>
                                {options?.map((option, index) => (
                                    <Btn key={index} type={title} option={option} />
                                ))}
                            </Disclosure.Panel>
                        </Transition>
                    </>
                )}
            </Disclosure>
        </>

    )
}

export default Dropdown