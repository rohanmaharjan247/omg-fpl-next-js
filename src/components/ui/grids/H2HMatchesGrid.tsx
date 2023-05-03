import { H2HMatchesProps } from '@/helpers/props';
import Link from 'next/link';

const H2HMatchesGrid = ({ h2hMatches }: H2HMatchesProps) => {
  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <div className="grow text-right">
          <h1 className="font-bold text-sm">
            <Link
              href={`/manager/${h2hMatches.entry_1_entry}`}
              className="hover:text-light-primary transition-colors"
            >
              {h2hMatches.entry_1_name}
            </Link>
          </h1>
          <h2 className="font-light text-sm capitalize">
            {h2hMatches.entry_1_player_name}
          </h2>
        </div>
        <div className="shrink-0 bg-secondary text-white w-8 py-1 text-center font-bold">
          {h2hMatches.entry_1_points}
        </div>
      </div>
      <div className="flex items-center justify-between gap-4">
        <div className="shrink-0 bg-secondary text-white w-8 py-1 text-center font-bold">
          {h2hMatches.entry_2_points}
        </div>
        <div className="grow">
          <h1 className="font-bold text-sm">
            <Link
              href={`/manager/${h2hMatches.entry_2_entry}`}
              className="hover:text-light-primary transition-colors"
            >
              {h2hMatches.entry_2_name}
            </Link>
          </h1>
          <h2 className="font-light text-sm capitalize">
            {h2hMatches.entry_2_player_name}
          </h2>
        </div>
      </div>
    </>
  );
};

export default H2HMatchesGrid;
