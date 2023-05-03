import { poppins } from '@/helpers';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import Image from 'next/image';
import { QRCodeModalProps } from '@/helpers/props';

const QRCodeModal = ({
  openModal,
  setOpenModal,
  managerName,
  playerName,
  qrCodeUrl,
}: QRCodeModalProps) => {
  return (
    <Transition show={openModal} as={Fragment}>
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        className={`${poppins.variable} font-sans relative z-50`}
      >
        <Transition.Child
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
          as={Fragment}
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true"></div>
        </Transition.Child>
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-md rounded bg-white py-4 px-2">
              <Dialog.Title className="font-bold text-xl text-center">
                {managerName}
              </Dialog.Title>
              <Dialog.Description className="text-center font-light">
                {playerName}
              </Dialog.Description>
              <div className="relative w-full h-96 my-4">
                <Image
                  src={qrCodeUrl}
                  alt={managerName ?? 'QR Code'}
                  fill
                ></Image>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default QRCodeModal;
