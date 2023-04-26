import { HeadTitle } from '@/components';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import Image from 'next/image';
import { ChangeEvent, useRef } from 'react';
const Profile = () => {
  const user = useUser();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const supabaseClient = useSupabaseClient();

  const userData = user?.user_metadata;

  const openFileSelector = () => {
    const publicUrl = supabaseClient.storage
      .from('qr-codes')
      .getPublicUrl('Rohan-Maharjan/Rohan-Maharjan-Esewa.JPG');
    console.log('🚀 --> handleUploadFiles --> publicUrl:', publicUrl);
    inputFileRef.current?.click();
  };

  const handleUploadFiles = async (e: ChangeEvent<HTMLInputElement>) => {
    console.log('handle upload');
    if (!e.target.files) {
      return;
    }

    console.log(e.target.files.length);
    if (e.target.files.length <= 0) {
      return;
    }

    const file = e.target.files[0];

    const fileName = `${userData?.name.replace(' ', '-')}-Esewa.${file?.name
      .split('.')
      .pop()}`;

    const filePath = `${userData?.name.replace(' ', '-')}/${fileName}`;

    console.log(fileName, filePath);
    const upload = await supabaseClient.storage
      .from('qr-codes')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      });
    console.log('data', upload.data);
    if (upload.error) {
      console.error(upload.error);
    }
  };

  return (
    <>
      <HeadTitle title={userData?.name} />
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
              <div className="flex gap-2">
                <input
                  id="player_code"
                  className="rounded border px-4 py-2 w-full"
                />
                <button
                  type="button"
                  className="bg-primary text-slate-100 w-full rounded py-2 text-center transition-colors hover:bg-secondary"
                >
                  Save
                </button>
              </div>
              {/* <label htmlFor="esewa" className="font-light">
              Upload your esewa QR Code
            </label> */}
              <div
                className="w-full h-64 border grid place-content-center my-4 cursor-pointer"
                onClick={openFileSelector}
              >
                Upload you esewa or khalti QR Code
              </div>
              <input
                type="file"
                id="esewa"
                ref={inputFileRef}
                onChange={(e) => {
                  console.log('changed', e);
                  handleUploadFiles(e);
                }}
                hidden
              />
            </form>
          </div>
        </div>
        <div className="col-span-2">
          <div className="card">Team and all</div>
        </div>
      </div>
    </>
  );
};

export default Profile;
