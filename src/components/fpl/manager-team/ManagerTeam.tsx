import { useLeagueInfo } from '@/helpers/league-info-context';
import { ManagerTeam } from '@/helpers/models';
import { ManagerTeamProps } from '@/helpers/props';
import { EntryEventPick } from 'fpl-api';
import { useEffect, useState } from 'react';
import * as _ from 'lodash';

function groupby(arr: any, key: string) {
  return arr.reduce((rv: any, x: any) => {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}

type ResultType = { [key: string]: Array<ManagerTeam> };

const ManagerTeam = ({ managerTeam }: ManagerTeamProps) => {
  const { generalInfo } = useLeagueInfo();

  const [team, setTeam] = useState<ManagerTeam[]>();

  // console.log(generalInfo?.elements);

  useEffect(() => {
    const mt = managerTeam?.picks.map((team: EntryEventPick) => {
      const player = generalInfo?.elements.find((x) => x.id === team.element);
      const teamName = generalInfo?.teams.find(
        (t) => t.id === player?.team
      )?.short_name;
      const position = generalInfo?.element_types.find(
        (p) => p.id === player?.element_type
      )?.singular_name_short;
      // console.log(player);
      const t: ManagerTeam = {
        bonus: player?.bonus,
        goalConceded: player?.goals_conceded,
        goalScored: player?.goals_scored,
        id: player?.id,
        minutesPlayed: player?.minutes,
        playerName: player?.web_name,
        points: player?.event_points,
        redCards: player?.red_cards,
        yellowCards: player?.yellow_cards,
        teamName,
        position: position ?? '',
        is_captain: team?.is_captain,
        is_vice_captain: team?.is_vice_captain,
        multipler: team?.multiplier,
        in_team: team?.multiplier === 0 ? 'substitute' : 'regular',
      };
      return t;
    });
    // console.log('manager team', managerTeam);
    // console.log('mt', mt);

    // const t = groupby(mt, 'in_team');
    // console.log('grouped', t);

    // const a = mt?.reduce((result: ResultType, item: ManagerTeam) => {
    //   let team_mode =  result[item.in_team] = result[item.in_team] || {}

    //   let pos = team_mode[item.position] = team_mode[item.position] ||[]

    //   return result;
    // }, {})

    const a = _.groupBy(mt, 'in_team');

    console.log('grouped', a);

    setTeam(mt);
  }, []);
  return (
    <div>
      {team?.map((t) => (
        <p key={t.id}>
          {t.playerName} {t.position}
        </p>
      ))}
    </div>
  );
};

export default ManagerTeam;
