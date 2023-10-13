"use client";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

export default function Welcome() {
  const [open, setOpen] = useState(false);
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button
            className="text-center text-sky-800 font-semibold text-lg my-4 flex justify-center items-center w-full"
            onClick={() => setOpen((perv) => !perv)}
          >
            Know About Our Goal{" "}
            <ChevronRightIcon
              height={50}
              className={open ? "rotate-90 transform" : ""}
            />
          </Disclosure.Button>

          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel className="text-center">
              Yes! You can purchase a license that you can share with your
              entire team.
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}
