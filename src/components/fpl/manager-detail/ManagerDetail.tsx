import QRCodeModal from '@/components/ui/modals/QRCodeModal';
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
  qr_code_url,
}: ManagerDetailProps) => {
  const supabaseClient = useSupabaseClient();
  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
  });
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
            <h2 className="font-bold">Joined Date</h2>
            <h3>{dateFormatter.format(new Date(manager?.joined_time))}</h3>
          </div>
          <div className="text-center text-sm">
            <h2 className="font-bold">Overall Rank</h2>
            <h3>{manager?.summary_overall_rank?.toLocaleString()}</h3>
          </div>
        </div>
      </div>
      <QRCodeModal
        manager={manager}
        openModal={openModal}
        setOpenModal={setOpenModal}
        qrCodeUrl={qrCodeUrl}
      />
    </>
  );
};

export default ManagerDetail;
