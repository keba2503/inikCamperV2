import React, {FC} from "react";
import Logo from "@/shared/Logo";
import Navigation from "@/shared/Navigation/Navigation";
import MenuBar from "@/shared/MenuBar";
import SwitchDarkMode from "@/shared/SwitchDarkMode";
import SocialsList from "@/shared/SocialsList";
import LangDropdown from '@/app/(client-components)/(Header)/LangDropdown.jsx';
import LangDropdownSingle from '@/app/(client-components)/(Header)/LangDropdownSingle';

export interface MainNav1Props {
    className?: string;
}

const MainNav1: FC<MainNav1Props> = ({className = ""}) => {
    return (
        <div className={`nc-MainNav1 relative z-10 ${className}`}>
            <div className="px-4 lg:container h-20 relative flex justify-between">
                <div className="hidden md:flex justify-start flex-1 space-x-4 sm:space-x-10">
                    <Logo className="w-24 self-center"/>
                    <Navigation/>
                </div>
                <div className="hidden md:flex flex-shrink-0 justify-end flex-1 lg:flex-none text-neutral-700 dark:text-neutral-100">
                    <div className="hidden xl:flex space-x-0.5">
                        <SocialsList/>
                        <LangDropdown/>
                        <SwitchDarkMode/>
                        <div className="px-1"/>
                    </div>
                    <div className="flex xl:hidden items-center">
                        <SocialsList/>
                        <LangDropdownSingle/>
                        <SwitchDarkMode/>
                        <div className="px-0.5"/>
                        <MenuBar/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainNav1;
