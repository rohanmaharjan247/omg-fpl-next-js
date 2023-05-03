import QRCodeModal from '@/components/ui/modals/QRCodeModal';
import { useLeagueInfo } from '@/helpers/league-info-context';
import { UserProfile } from '@/helpers/models';
import {
  faArrowUp19,
  faArrowUpWideShort,
  faCrown,
  faQrcode,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import axios from 'axios';
import classNames from 'classnames';
import { ClassicLeagueEntry } from 'fpl-api';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const GameweekWinner = () => {
  const user = useUser();
  const supabaseClient = useSupabaseClient();
  const [gameweekWinner, setGameweekWinner] = useState<ClassicLeagueEntry>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const { currentGameweek } = useLeagueInfo();
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  const fetchSignedUrl = async (qrCode: string) => {
    const { data } = await supabaseClient.storage
      .from('qr-codes')
      .createSignedUrl(qrCode, 60 * 24, { transform: { quality: 75 } });

    setQrCodeUrl(data?.signedUrl ?? '');
  };

  const getUserData = async () => {
    const { data, error } = await supabaseClient
      .from('user_profile')
      .select<'*', UserProfile>()
      .eq('entry_code', gameweekWinner?.entry)
      .single();
    if (error) {
      console.error(error);
      return;
    }

    setProfile(data);
  };

  useEffect(() => {
    const fetchGameweekWinner = async () => {
      const { data } = await axios.get<ClassicLeagueEntry>(
        '/api/current-gameweek-winner'
      );

      setGameweekWinner(data);
    };
    fetchGameweekWinner();
  }, []);

  useEffect(() => {
    getUserData();
  }, [gameweekWinner]);

  useEffect(() => {
    if (profile) {
      fetchSignedUrl(profile.qr_code_url);
    }
  }, [profile]);

  return (
    <>
      <div className="card relative">
        <h3 className="text-sm font-bold">
          {currentGameweek?.name}{' '}
          {currentGameweek?.finished ? 'Winner' : 'In Progress'}
        </h3>
        <h1 className="header">
          <Link
            href={`/manager/${gameweekWinner?.entry}`}
            className="hover:text-light-primary transition-colors"
          >
            {gameweekWinner?.entry_name}
          </Link>
          <button
            type="button"
            className="cursor-pointer ml-2 text-base"
            onClick={() => setOpenModal(true)}
          >
            <FontAwesomeIcon icon={faQrcode} />
          </button>
        </h1>
        <h3 className="text-sm font-light capitalize">
          {gameweekWinner?.player_name}
        </h3>

        <div
          className={classNames(
            'absolute -top-2',
            currentGameweek?.finished ? '-left-3' : '-left-2'
          )}
        >
          <FontAwesomeIcon
            icon={currentGameweek?.finished ? faCrown : faArrowUpWideShort}
            className={classNames(
              currentGameweek?.finished
                ? `text-2xl text-yellow-400 -rotate-45`
                : 'text-xl bg-light-secondary text-slate-100 rounded p-1'
            )}
          />
        </div>
        <div className="absolute -top-2 -right-3 bg-secondary text-slate-100 px-3 py-3 rounded-full font-bold text-center">
          {gameweekWinner?.event_total}
          <div className="font-light text-xs">pts.</div>
        </div>
      </div>
      <QRCodeModal
        managerName={gameweekWinner?.entry_name ?? ''}
        playerName={gameweekWinner?.player_name ?? ''}
        qrCodeUrl={qrCodeUrl}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </>
  );
};

export default GameweekWinner;
