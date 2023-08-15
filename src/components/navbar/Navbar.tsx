import { useLeagueInfo } from '@/helpers/league-info-context';
import { Menu } from '@headlessui/react';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import Link from 'next/link';

const Navbar = () => {
  const { leagueInfo } = useLeagueInfo();
  const supabaseClient = useSupabaseClient();
  const user = useUser();

  const signOut = () => {
    supabaseClient.auth.signOut();
  };

  return (
    <nav className="flex justify-between items-center px-16 py-4 bg-tertiary text-slate-100">
      <div className="flex items-center gap-8">
        <div className="text-xl font-bold">
          <Link href={'/'}>{leagueInfo?.name}</Link>
        </div>
        <ul className="flex gap-4">
          <li>
            <Link href={'/league-standings'}>League</Link>
          </li>
          <li>
            <Link href={'/h2h-standings'}>H2H Standings</Link>
          </li>
        </ul>
      </div>
      <div>
        <ul className="flex gap-4">
          <li>
            {!user ? (
              <Link href={'/login'}>Sign In</Link>
            ) : (
              <Menu as="div" className="relative">
                <Menu.Button className="hover:text-primary transition-colors">
                  {user.user_metadata.name}
                </Menu.Button>
                <Menu.Items
                  className={`absolute right-0 z-20 block bg-slate-100 text-slate-800 rounded-md px-6 py-4 w-56 mt-2`}
                >
                  <Menu.Item>
                    <Link
                      href={'/user/profile'}
                      className="block py-2 hover:text-light-primary"
                    >
                      Profile Settings
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <button
                      type="button"
                      onClick={signOut}
                      className="block py-2 hover:text-light-primary"
                    >
                      Sign Out
                    </button>
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
