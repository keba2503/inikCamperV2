"use client";

import React, {Fragment, useEffect, useRef, useState} from "react";
import {
  ShoppingBagIcon as ShoppingCartIcon,
  Cog8ToothIcon as CogIcon,
} from "@heroicons/react/24/outline";
import {Popover, Transition} from "@headlessui/react";
import {PathName} from "@/routers/types";
import Link from "next/link";
import Header from "./Header";
import {usePathname} from "next/navigation";
import {useThemeMode} from "@/utils/useThemeMode";

export type SiteHeaders = "Header 1" | "Header 2" | "Header 3";

interface HomePageItem {
  name: string;
  slug: PathName;
}

let OPTIONS = {
  root: null,
  rootMargin: "0px",
  threshold: 1.0,
};
let OBSERVER: IntersectionObserver | null = null;
const PAGES_HIDE_HEADER_BORDER: PathName[] = [

  "/",
];

const SiteHeader = () => {
  const anchorRef = useRef<HTMLDivElement>(null);

  let [headers] = useState<SiteHeaders[]>(["Header 1"]);

  let [homePages] = useState<HomePageItem[]>([
    {name: "Home Main", slug: "/"},
  ]);
  const [headerSelected, setHeaderSelected] = useState<SiteHeaders>("Header 1");

  const [isTopOfPage, setIsTopOfPage] = useState(true);

  useEffect(() => {
    setIsTopOfPage(window.pageYOffset < 5);
  }, []);

  useThemeMode();

  const pathname = usePathname();

  const intersectionCallback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      setIsTopOfPage(entry.isIntersecting);
    });
  };

  useEffect(() => {
    if (!PAGES_HIDE_HEADER_BORDER.includes(pathname as PathName)) {
      OBSERVER && OBSERVER.disconnect();
      OBSERVER = null;
      return;
    }
    if (!OBSERVER) {
      OBSERVER = new IntersectionObserver(intersectionCallback, OPTIONS);
      anchorRef.current && OBSERVER.observe(anchorRef.current);
    }
  }, [pathname]);

  const renderRadioHomePages = () => {
    return (
        <div className="mt-4">
          <span className="text-sm font-medium">Home Demos</span>
          <div className="mt-1.5 flex items-center space-x-2">
            {homePages.map((home) => {
              return (
                  <Link
                      key={home.slug}
                      href={home.slug}
                      className={`py-1.5 px-3.5 flex items-center rounded-full font-medium text-xs cursor-pointer select-none ${
                          pathname === home.slug
                              ? "bg-black text-white shadow-black/10 shadow-lg"
                              : "border border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500"
                      }`}
                  >
                    {home.name}
                  </Link>
              );
            })}
          </div>
        </div>
    );
  };

  const renderControlSelections = () => {
    return (
        <div className="ControlSelections relative z-40 hidden lg:block">
        </div>
    );
  };

  const renderHeader = () => {
    let headerClassName = "shadow-sm dark:border-b dark:border-neutral-700";
    if (PAGES_HIDE_HEADER_BORDER.includes(pathname as PathName)) {
      headerClassName = isTopOfPage
          ? ""
          : "shadow-sm dark:border-b dark:border-neutral-700";
    }
    switch (headerSelected) {
      case "Header 1":
        return <Header className={headerClassName} navType="MainNav1"/>;
      default:
        return <Header className={headerClassName}/>;
    }
  };

  return (
      <>
        {renderControlSelections()}
        {renderHeader()}
        <div ref={anchorRef} className="h-1 absolute invisible"></div>
      </>
  );
};

export default SiteHeader;
