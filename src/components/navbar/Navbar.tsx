import { useLeagueInfo } from '@/helpers/league-info-context';
import Link from 'next/link';

const Navbar = () => {
  const { leagueInfo } = useLeagueInfo();
  return (
    <nav className="flex justify-between items-center px-16 py-4 bg-tertiary text-slate-100">
      <div className="flex items-center gap-8">
        <div className="text-xl font-bold">{leagueInfo?.name}</div>
        <ul className="flex gap-4">
          <li>
            <Link href={'/'}>League</Link>
          </li>
          <li>
            <Link href={'/'}>H2H Standings</Link>
          </li>
        </ul>
      </div>
      <div>
        <ul className="flex gap-4">
          <li>
            <Link href={'/'}>Login</Link>
          </li>
          <li>
            <Link href={'/'}>Sign Up</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
