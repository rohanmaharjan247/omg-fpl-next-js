import {
  CurrentGameweek,
  GameweekWinner,
  HeadTitle,
  LeagueStandings,
} from '@/components';

import Image from 'next/image';

export default function Home() {
  return (
    <>
      <HeadTitle title="Home" />
      <div className="my-4">
        <CurrentGameweek />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="col-span-3">
            <LeagueStandings />
          </div>
          <div>
            <GameweekWinner />
            <div className="card">
              <div className="flex items-center gap-4">
                <div className="shrink-0 relative w-16 h-20">
                  <Image
                    src={
                      'https://resources.premierleague.com/premierleague/photos/players/110x140/p223094.png'
                    }
                    alt={'Erling Haaland'}
                    fill
                    className="rounded-full"
                  />
                </div>
                <div className="grow">
                  <h3 className="text-sm font-light">
                    Most Transferred Player
                  </h3>
                  <h1 className="text-xl font-bold">Erling Haaland</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
