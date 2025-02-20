import Image from "next/image";
import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

// lib
import { Record } from "@/lib/types";

type Props = {
  isOpen: boolean;
  image: React.ReactNode;
  fileName: string;
  setIsOpen: (value: boolean) => void;
};

export default function ImagePreview({
  isOpen,
  setIsOpen,
  image,
  fileName,
}: Props) {
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in durdivation-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-between">
                    <div className="flex-1">
                      <Dialog.Title
                        as="h3"
                        className=" text-lg font-medium leading-6 text-gray-900"
                      >
                        {fileName}
                      </Dialog.Title>
                    </div>

                    <div className="flex-[3]">
                      <button onClick={closeModal}>
                        <span>x</span>
                      </button>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p>Details:</p>
                  </div>

                  <div className="h-[400px]">{image}</div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
