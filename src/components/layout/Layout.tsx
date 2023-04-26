import { LayoutProps } from '@/helpers/props';
import Navbar from '../navbar/Navbar';
import { Poppins } from 'next/font/google';
import { LeagueInfoContext } from '@/helpers/league-info-context';
import { useEffect, useState } from 'react';
import { Bootstrap, ClassicLeagueInfo, Event } from 'fpl-api';
import axios from 'axios';
import { useRouter } from 'next/router';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
  variable: '--font-poppins',
});

const Layout = ({ children }: LayoutProps) => {
  const [info, setInfo] = useState<ClassicLeagueInfo>();
  const [currentGameweek, setCurrentGameweek] = useState<Event>();
  const [generalInfo, setGeneralInfo] = useState<Bootstrap>();

  useEffect(() => {
    const fetchClassicLeagueInfo = async () => {
      const { data } = await axios.get<ClassicLeagueInfo>('/api/league-info');

      setInfo(data);
    };
    const fetchCurrentGameweek = async () => {
      const { data } = await axios.get<Event>('/api/current-gameweek');
      setCurrentGameweek(data);
    };
    const fetchGeneralInfo = async () => {
      const { data } = await axios.get<Bootstrap>('/api/general-information');
      setGeneralInfo(data);
    };
    fetchGeneralInfo();
    fetchCurrentGameweek();
    fetchClassicLeagueInfo();
  }, []);

  return (
    <LeagueInfoContext.Provider
      value={{ leagueInfo: info, currentGameweek, generalInfo }}
    >
      <div className={`${poppins.variable} font-sans`}>
        <Navbar />
        <main className="container mx-auto">{children}</main>
      </div>
    </LeagueInfoContext.Provider>
  );
};

export default Layout;
