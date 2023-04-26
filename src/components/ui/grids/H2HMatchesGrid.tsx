import { H2HMatchesProps } from '@/helpers/props';

const H2HMatchesGrid = ({ h2hMatches }: H2HMatchesProps) => {
  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <div className="grow">
          <h1 className="font-bold text-sm">{h2hMatches.entry_1_name}</h1>
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
          <h1 className="font-bold text-sm">{h2hMatches.entry_2_name}</h1>
          <h2 className="font-light text-sm capitalize">
            {h2hMatches.entry_2_player_name}
          </h2>
        </div>
      </div>
    </>
  );
};

export default H2HMatchesGrid;
