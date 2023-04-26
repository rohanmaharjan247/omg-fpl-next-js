import { useUser } from '@supabase/auth-helpers-react';
import Image from 'next/image';
const Profile = () => {
  const user = useUser();

  const userData = user?.user_metadata;
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div className="card">
        <h1 className="header">{userData?.name}</h1>
        <h3 className="font-light">{userData?.email}</h3>
        <div className="h-1 bg-gray-400 w-full my-4 rounded"></div>
        <div>
          <form>
            <label htmlFor="player_code" className="font-light">
              Enter FPL Manager Code
            </label>
            <input
              id="player_code"
              className="rounded border px-4 py-2 w-full"
            />
            <label htmlFor="esewa" className="font-light">
              Upload your esewa QR Code
            </label>
            <input type="file" id="esewa" />
            <button
              type="button"
              className="bg-primary text-slate-100 w-full rounded py-2 text-center transition-colors hover:bg-secondary"
            >
              Save
            </button>
          </form>
        </div>
      </div>
      <div className="col-span-2">
        <div className="card">Team and all</div>
      </div>
    </div>
  );
};

export default Profile;
