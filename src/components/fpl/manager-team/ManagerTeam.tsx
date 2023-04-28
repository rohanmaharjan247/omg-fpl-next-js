import { useLeagueInfo } from '@/helpers/league-info-context';
import { ManagerTeam } from '@/helpers/models';
import { ManagerTeamProps } from '@/helpers/props';
import { EntryEventPick } from 'fpl-api';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import PlayerView from '@/components/ui/player/PlayerView';
import Image from 'next/image';
import SubPlayerView from '@/components/ui/player/SubPlayerView';
const pitchGrid: any = {
  0: 'grid grid-cols-0 place-items-center gap-4 py-6',
  1: 'grid grid-cols-1 place-items-center gap-4 py-6',
  2: 'grid grid-cols-2 place-items-center gap-4 py-6',
  3: 'grid grid-cols-3 place-items-center gap-4 py-6',
  4: 'grid grid-cols-4 place-items-center gap-4 py-6',
  5: 'grid grid-cols-5 place-items-center gap-4 py-6',
};

interface GroupedManagerTeam {
  [x: string]: {
    [x: string]: ManagerTeam[];
  };
}

interface GroupedSubTeam {
  [x: string]: ManagerTeam[];
}

const ManagerTeam = ({ managerTeam }: ManagerTeamProps) => {
  const { generalInfo } = useLeagueInfo();

  const [team, setTeam] = useState<GroupedManagerTeam>();
  const [subTeam, setSubTeam] = useState<GroupedSubTeam>();

  useEffect(() => {
    const mt = managerTeam?.picks.map((team: EntryEventPick) => {
      const player = generalInfo?.elements.find((x) => x.id === team.element);
      const teamName = generalInfo?.teams.find(
        (t) => t.id === player?.team
      )?.short_name;
      const position = generalInfo?.element_types.find(
        (p) => p.id === player?.element_type
      )?.singular_name_short;

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
        photo: player?.photo ?? '',
        teamName,
        position: position ?? '',
        is_captain: team?.is_captain,
        is_vice_captain: team?.is_vice_captain,
        multipler: team?.multiplier,
        in_team: team?.multiplier === 0 ? 'substitute' : 'regular',
      };
      return t;
    });
    const t = _(mt)
      .filter((item) => item.in_team === 'regular')
      .groupBy('in_team')
      .mapValues((items) =>
        _(items)
          .groupBy('position')
          .mapValues((items) =>
            _(items)
              .flatMap((item) => item)
              .value()
          )
          .value()
      )
      .value();

    const subs = _(mt)
      .filter((item) => item.in_team === 'substitute')
      .groupBy('in_team')
      .mapValues((items) => items)
      .value();

    setTeam(t);
    setSubTeam(subs);
  }, []);
  return (
    <>
      {team && (
        <>
          <div className={pitchGrid[team.regular.GKP.length]}>
            {team.regular.GKP.map((t) => (
              <PlayerView key={t.id} managerTeam={t} />
            ))}
          </div>
          <div className={pitchGrid[team.regular.DEF.length]}>
            {team.regular.DEF.map((t) => (
              <PlayerView key={t.id} managerTeam={t} />
            ))}
          </div>
          <div className={pitchGrid[team.regular.MID.length]}>
            {team.regular.MID.map((t) => (
              <PlayerView key={t.id} managerTeam={t} />
            ))}
          </div>
          <div className={pitchGrid[team.regular.FWD.length]}>
            {team.regular.FWD.map((t) => (
              <PlayerView key={t.id} managerTeam={t} />
            ))}
          </div>
        </>
      )}
      <div className="h-1 bg-gray-100 w-full"></div>
      {subTeam && (
        <>
          <div className="grid grid-cols-4 gap-4 py-6">
            {subTeam.substitute.map((team) => (
              <SubPlayerView key={team.id} managerTeam={team} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default ManagerTeam;
