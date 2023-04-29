import { ManagerTeam } from '@/components';
import { ManagerTeamDetailProps } from '@/helpers/props';

const ManagerTeamDetail = ({
  currentGameweek,
  managerTeam,
}: ManagerTeamDetailProps) => {
  return (
    <div className="card">
      <h1 className="text-center py-2 font-bold text-xl">
        {currentGameweek?.name} Team
      </h1>
      <div className="flex justify-evenly items-center text-center gap-4 my-4">
        <div>
          <h2>Team Value</h2>
          <h3 className="font-bold text-xl">
            £{' '}
            {(managerTeam?.entry_history?.value ?? 0) > 100
              ? (managerTeam?.entry_history?.value ?? 0) / 10
              : managerTeam?.entry_history?.value}
          </h3>
        </div>
        <div>
          <h2>Points</h2>
          <h3 className="font-bold text-xl">
            {managerTeam?.entry_history?.points}{' '}
            {(managerTeam?.entry_history?.event_transfers_cost ?? 0) > 0 &&
              `(${managerTeam?.entry_history?.event_transfers_cost})`}
          </h3>
        </div>
        <div>
          <h2>Bench Points</h2>
          <h3 className="font-bold text-xl">
            {managerTeam?.entry_history?.points_on_bench}
          </h3>
        </div>
      </div>
      <div>{managerTeam && <ManagerTeam managerTeam={managerTeam} />}</div>
    </div>
  );
};

export default ManagerTeamDetail;
