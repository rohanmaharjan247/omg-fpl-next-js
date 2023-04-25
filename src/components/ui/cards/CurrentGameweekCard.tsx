import { CurrentGameweekProps } from '@/helpers/props';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CurrentGameweekCard = ({
  title,
  stats,
  icon,
  bgColor,
}: CurrentGameweekProps) => {
  return (
    <div className="card">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-base font-light">{title}</h2>
          <h1 className="text-2xl font-bold">{stats}</h1>
        </div>
        <div
          className={`rounded-full ${bgColor} text-slate-100 text-center px-5 py-4`}
        >
          <FontAwesomeIcon icon={icon} />
        </div>
      </div>
    </div>
  );
};

export default CurrentGameweekCard;
