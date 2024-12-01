'use client';

import { Popover, Tab, Transition } from '@headlessui/react';
import { GlobeAltIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { useContext, Fragment } from 'react';
import { LanguageContext } from '@/context/LanguageContext';

export const headerLanguage = [
    { id: 'en', name: 'English', description: 'United States' },
    { id: 'es', name: 'Español', description: 'España' },
    { id: 'de', name: 'Deutsch', description: 'Deutschland' },
    { id: 'fr', name: 'Français', description: 'France' },
];

const LangDropdown = ({
                          // eslint-disable-next-line react/prop-types
                          panelClassName = 'top-full right-0 max-w-sm w-96',
                          // eslint-disable-next-line react/prop-types
                          className = 'hidden md:flex',
                      }) => {
    const { language, switchLanguage } = useContext(LanguageContext);

    const handleLanguageChange = (newLanguage, close) => {
        switchLanguage(newLanguage);
        close();
    };

    return (
        <Popover className={`LangDropdown relative ${className}`}>
            {({ open, close }) => (
                <>
                    <Popover.Button
                        className={`group self-center h-10 sm:h-12 px-3 py-1.5 inline-flex items-center text-sm text-gray-800 dark:text-neutral-200 font-medium hover:text-opacity-100 focus:outline-none`}
                    >
                        <GlobeAltIcon className="w-5 h-5 opacity-80" />
                        <ChevronDownIcon
                            className={`${open ? '-rotate-180' : 'text-opacity-70'} ml-1 h-4 w-4 group-hover:text-opacity-80 transition ease-in-out duration-150`}
                            aria-hidden="true"
                        />
                    </Popover.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                    >
                        <Popover.Panel className={`absolute z-20 ${panelClassName}`}>
                            <div className="p-3 sm:p-6 rounded-2xl bg-white dark:bg-neutral-800 shadow-lg ring-1 ring-black ring-opacity-5">
                                <Tab.Group>
                                    <Tab.List className="flex space-x-1 rounded-full bg-gray-100 dark:bg-slate-700 p-1">
                                        {['Language'].map((category) => (
                                            <Tab
                                                key={category}
                                                className={({ selected }) =>
                                                    `w-full rounded-full py-2 text-sm font-medium leading-5 text-gray-700 ${selected ? 'bg-white shadow' : 'text-gray-700 dark:text-slate-300 hover:bg-white/70 dark:hover:bg-slate-900/40'}`
                                                }
                                            >
                                                {category}
                                            </Tab>
                                        ))}
                                    </Tab.List>
                                    <Tab.Panels className="mt-5">
                                        <Tab.Panel className="rounded-xl p-3">
                                            <div className="grid gap-8 lg:grid-cols-2">
                                                {headerLanguage.map((item) => (
                                                    <a
                                                        key={item.id}
                                                        onClick={() => handleLanguageChange(item.id, close)}
                                                        className={`flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none ${
                                                            language === item.id
                                                                ? 'bg-gray-100 dark:bg-gray-700'
                                                                : 'opacity-80'
                                                        }`}
                                                    >
                                                        <div>
                                                            <p className="text-sm font-medium">{item.name}</p>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                                {item.description}
                                                            </p>
                                                        </div>
                                                    </a>
                                                ))}
                                            </div>
                                        </Tab.Panel>
                                    </Tab.Panels>
                                </Tab.Group>
                            </div>
                        </Popover.Panel>
                    </Transition>
                </>
            )}
        </Popover>
    );
};

export default LangDropdown;
