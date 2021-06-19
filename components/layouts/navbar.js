import { Fragment, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/client";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";

const navigation = ["Dashboard", "Team", "Projects", "Calendar", "Reports"];
const profile = ["Your Profile", "Settings", "Sign out"];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Navbar({ cb, mounted, resolvedTheme }) {
    const [session, loading] = useSession();
    const [bool, setBool] = useState(false);

    const handleNavButton = () => {
        setBool(!bool);
    };

    return (
        <div>
            <Disclosure as="nav" className="bg-gray-800">
                {({ open }) => (
                    <>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex items-center justify-between h-16">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <img
                                            className="h-8 w-8"
                                            src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                                            alt="Workflow"
                                        />
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="ml-10 flex items-baseline space-x-4">
                                            {navigation.map((item, itemIdx) =>
                                                itemIdx === 0 ? (
                                                    <Fragment key={item}>
                                                        {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                                                        <a
                                                            onClick={
                                                                handleNavButton
                                                            }
                                                            href="#"
                                                            className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                                                        >
                                                            {item}
                                                        </a>
                                                    </Fragment>
                                                ) : (
                                                    <a
                                                        onClick={
                                                            handleNavButton
                                                        }
                                                        key={item}
                                                        href="#"
                                                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                                    >
                                                        {item}
                                                    </a>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex">
                                    {/* Theme Provider  */}
                                    <div className="mr-2">
                                        <button
                                            aria-label="Toggle Dark Mode"
                                            type="button"
                                            className="w-10 h-10 p-3 bg-gray-200 rounded dark:bg-gray-800"
                                            onClick={() =>
                                                cb(
                                                    resolvedTheme === "dark"
                                                        ? "light"
                                                        : "dark"
                                                )
                                            }
                                        >
                                            {mounted && (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                    stroke="currentColor"
                                                    className="w-4 h-4 text-gray-800 dark:text-gray-200"
                                                >
                                                    {resolvedTheme ===
                                                    "dark" ? (
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                                                        />
                                                    ) : (
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                                                        />
                                                    )}
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                    {/* Theme Provider Finish */}
                                    {!session && (
                                        <button
                                            className="bg-gray-100 text-black font-semibold focus:outline-none transition duration-100 ease transform px-2 py-1 active:scale-95 border rounded-md"
                                            onClick={() => signIn()}
                                        >
                                            Sign in
                                        </button>
                                    )}
                                    {session && (
                                        <div className="hidden md:block">
                                            <div className="ml-4 flex items-center md:ml-6">
                                                <button className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                                    <span className="sr-only">
                                                        View notifications
                                                    </span>
                                                    <BellIcon
                                                        className="h-6 w-6"
                                                        aria-hidden="true"
                                                    />
                                                </button>

                                                {/* Profile dropdown */}
                                                <Menu
                                                    as="div"
                                                    className="ml-3 relative"
                                                >
                                                    {({ open }) => (
                                                        <>
                                                            <div>
                                                                <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                                                    <span className="sr-only">
                                                                        Open
                                                                        user
                                                                        menu
                                                                    </span>
                                                                    <img
                                                                        className="h-8 w-8 rounded-full"
                                                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                                        alt=""
                                                                    />
                                                                </Menu.Button>
                                                            </div>
                                                            <Transition
                                                                show={open}
                                                                as={Fragment}
                                                                enter="transition ease-out duration-100"
                                                                enterFrom="transform opacity-0 scale-95"
                                                                enterTo="transform opacity-100 scale-100"
                                                                leave="transition ease-in duration-75"
                                                                leaveFrom="transform opacity-100 scale-100"
                                                                leaveTo="transform opacity-0 scale-95"
                                                            >
                                                                <Menu.Items
                                                                    static
                                                                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                                                >
                                                                    {profile.map(
                                                                        (
                                                                            item
                                                                        ) => (
                                                                            <Menu.Item
                                                                                key={
                                                                                    item
                                                                                }
                                                                            >
                                                                                {({
                                                                                    active,
                                                                                }) =>
                                                                                    item ===
                                                                                    "Sign out" ? (
                                                                                        <a
                                                                                            onClick={() =>
                                                                                                signOut()
                                                                                            }
                                                                                            href="#"
                                                                                            className={classNames(
                                                                                                active
                                                                                                    ? "bg-gray-100"
                                                                                                    : "",
                                                                                                "block px-4 py-2 text-sm text-gray-700"
                                                                                            )}
                                                                                        >
                                                                                            {
                                                                                                item
                                                                                            }
                                                                                        </a>
                                                                                    ) : (
                                                                                        <a
                                                                                            href="#"
                                                                                            className={classNames(
                                                                                                active
                                                                                                    ? "bg-gray-100"
                                                                                                    : "",
                                                                                                "block px-4 py-2 text-sm text-gray-700"
                                                                                            )}
                                                                                        >
                                                                                            {
                                                                                                item
                                                                                            }
                                                                                        </a>
                                                                                    )
                                                                                }
                                                                            </Menu.Item>
                                                                        )
                                                                    )}
                                                                </Menu.Items>
                                                            </Transition>
                                                        </>
                                                    )}
                                                </Menu>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="-mr-2 flex md:hidden">
                                    {/* Mobile menu button */}
                                    <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                        <span className="sr-only">
                                            Open main menu
                                        </span>
                                        {open ? (
                                            <XIcon
                                                className="block h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <MenuIcon
                                                className="block h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        )}
                                    </Disclosure.Button>
                                </div>
                            </div>
                        </div>

                        <Disclosure.Panel className="md:hidden">
                            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                {navigation.map((item, itemIdx) =>
                                    itemIdx === 0 ? (
                                        <Fragment key={item}>
                                            {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                                            <a
                                                href="#"
                                                className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
                                            >
                                                {item}
                                            </a>
                                        </Fragment>
                                    ) : (
                                        <a
                                            key={item}
                                            href="#"
                                            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                                        >
                                            {item}
                                        </a>
                                    )
                                )}
                            </div>
                            <div className="pt-4 pb-3 border-t border-gray-700">
                                <div className="flex items-center px-5">
                                    <div className="flex-shrink-0">
                                        <img
                                            className="h-10 w-10 rounded-full"
                                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                            alt=""
                                        />
                                    </div>
                                    <div className="ml-3">
                                        <div className="text-base font-medium leading-none text-white">
                                            Tom Cook
                                        </div>
                                        <div className="text-sm font-medium leading-none text-gray-400">
                                            tom@example.com
                                        </div>
                                    </div>
                                    <button className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                        <span className="sr-only">
                                            View notifications
                                        </span>
                                        <BellIcon
                                            className="h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    </button>
                                </div>
                                <div className="mt-3 px-2 space-y-1">
                                    {profile.map((item) => (
                                        <a
                                            key={item}
                                            href="#"
                                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                                        >
                                            {item}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        </div>
    );
}