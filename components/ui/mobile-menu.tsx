'use client';

import { useState, useRef, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import Link from 'next/link';

export default function MobileMenu() {
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  const trigger = useRef<HTMLButtonElement>(null);
  const mobileNav = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    const clickHandler = ({ target }: { target: EventTarget | null }): void => {
      if (!mobileNav.current || !trigger.current) return;
      if (!mobileNavOpen || mobileNav.current.contains(target as Node) || trigger.current.contains(target as Node)) return;
      setMobileNavOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [mobileNavOpen]);

  useEffect(() => {
    const keyHandler = ({ keyCode }: { keyCode: number }): void => {
      if (!mobileNavOpen || keyCode !== 27) return;
      setMobileNavOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [mobileNavOpen]);

  if (!mounted) return null;

  return (
    <div className="flex md:hidden">
      <button
        ref={trigger}
        className={`hamburger ml-5 ${mobileNavOpen && 'active'}`}
        aria-controls="mobile-nav"
        aria-expanded={mobileNavOpen}
        onClick={() => setMobileNavOpen(!mobileNavOpen)}
      >
        <span className="sr-only">Menu</span>
        <svg className="w-6 h-6 fill-current text-gray-100" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <rect y="4" width="24" height="2" />
          <rect y="11" width="24" height="2" />
          <rect y="18" width="24" height="2" />
        </svg>
      </button>

      {/* Mobile navigation */}
      <div ref={mobileNav}>
        <Transition
          show={mobileNavOpen}
          as="nav"
          id="mobile-nav"
          className="absolute overflow-hidden top-full h-screen pb-16 z-20 left-0 w-full bg-black"
          enter="transition ease-out duration-200 transform"
          enterFrom="opacity-0 -translate-y-2"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-out duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <ul className="px-5 py-2">
            <li>
              <Link href="/events" className="flex font-medium w-full text-gray-300 hover:text-white py-2 justify-center" onClick={() => setMobileNavOpen(false)}>Events</Link>
            </li>
            <li>
              <Link href="/leads" className="flex font-medium w-full text-gray-300 hover:text-white py-2 justify-center" onClick={() => setMobileNavOpen(false)}>Leads</Link>
            </li>
            <li>
              <Link href="/members" className="flex font-medium w-full text-gray-300 hover:text-white py-2 justify-center" onClick={() => setMobileNavOpen(false)}>Members</Link>
            </li>
            <li>
              <Link href="/achievements" className="flex font-medium w-full text-gray-300 hover:text-white py-2 justify-center" onClick={() => setMobileNavOpen(false)}>Achievements</Link>
            </li>
            {/* <li>
              <Link href="mailto:admin@pointblank.club" className="flex font-medium w-full text-gray-300 hover:text-white py-2 justify-center" onClick={() => setMobileNavOpen(false)}>
                Contact Us
              </Link>
            </li> */}
            <li>
              <Link href="/login" className="flex font-medium w-full text-gray-300 hover:text-white py-2 justify-center" onClick={() => setMobileNavOpen(false)}>
                Login
              </Link>
            </li>
          </ul>
        </Transition>
      </div>
    </div>
  );
}