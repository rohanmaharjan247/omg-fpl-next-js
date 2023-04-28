import { poppins } from '@/helpers';
import { ManagerDetailProps } from '@/helpers/props';
import { faQrcode } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, Transition } from '@headlessui/react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Image from 'next/image';
import { Fragment, useEffect, useState } from 'react';

const ManagerDetail = ({
  manager,
  favoriteTeamCode,
  currentGameweek,
  qr_code_url,
}: ManagerDetailProps) => {
  const supabaseClient = useSupabaseClient();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  const fetchSignedUrl = async (qrCode: string) => {
    const { data } = await supabaseClient.storage
      .from('qr-codes')
      .createSignedUrl(qrCode, 60 * 24, { transform: { quality: 75 } });

    setQrCodeUrl(data?.signedUrl ?? '');
  };

  useEffect(() => {
    if (qr_code_url) {
      fetchSignedUrl(qr_code_url);
    }
  }, []);

  return (
    <>
      <div>
        <div className="relative w-64 h-64 mx-auto">
          <Image
            src={`https://resources.premierleague.com/premierleague/badges/t${favoriteTeamCode}.png`}
            alt={manager?.name ?? 'Favourite Team'}
            fill
          />
        </div>
        <div className="text-center my-4">
          <div className="flex justify-center items-center gap-2">
            <button
              type="button"
              className="cursor-pointer ml-2 text-base"
              onClick={() => setOpenModal(true)}
            >
              <FontAwesomeIcon icon={faQrcode} />
            </button>

            <h1 className="header">{manager?.name}</h1>
            <div className="relative w-4 h-4">
              <Image
                src={`https://fantasy.premierleague.com/img/flags/${manager?.player_region_iso_code_short}.gif`}
                alt={manager?.player_region_iso_code_short ?? 'Flag'}
                fill
              />
            </div>
          </div>
          <h2 className="text-sm font-light">
            {manager?.player_first_name} {manager?.player_last_name}
          </h2>
        </div>
        <div className="flex justify-between gap-2">
          <div className="text-center text-sm">
            <h2 className="font-bold">Overall Points</h2>
            <h3>{manager?.summary_overall_points}</h3>
          </div>
          <div className="text-center text-sm">
            <h2 className="font-bold">{currentGameweek?.name} Points</h2>
            <h3>{manager?.summary_event_points}</h3>
          </div>
          <div className="text-center text-sm">
            <h2 className="font-bold">Overall Rank</h2>
            <h3>{manager?.summary_overall_rank}</h3>
          </div>
        </div>
      </div>
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
                  {manager?.name}
                </Dialog.Title>
                <Dialog.Description className="text-center font-light">
                  {manager?.player_first_name} {manager?.player_last_name}
                </Dialog.Description>
                <div className="relative w-full h-96 my-4">
                  <Image
                    src={qrCodeUrl}
                    alt={manager?.name ?? 'QR Code'}
                    fill
                  ></Image>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ManagerDetail;
