import { UserProfile } from '@/helpers/models';
import { ProfileFormProps } from '@/helpers/props';
import { User, useSupabaseClient } from '@supabase/auth-helpers-react';
import { Formik, Form, Field } from 'formik';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';

const initialValue: UserProfile = {
  user_id: '',
  entry_code: 0,
  qr_code_url: '',
};

const ProfileForm = ({ user }: ProfileFormProps) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const supabaseClient = useSupabaseClient();
  const [file, setFile] = useState<File>();

  const openFileSelector = () => {
    // const publicUrl = supabaseClient.storage
    //   .from('qr-codes')
    //   .getPublicUrl('Rohan-Maharjan/Rohan-Maharjan-Esewa.JPG');
    inputFileRef.current?.click();
  };

  const handleUploadFiles = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    console.log(e.target.files.length);
    if (e.target.files.length <= 0) {
      return;
    }

    const file = e.target.files[0];

    setFile(file);
  };

  const saveProfile = async (values: UserProfile) => {
    if (!file) return;

    const userData = user?.user_metadata;

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
      return;
    }

    values.qr_code_url = upload.data.path;
    values.user_id = user?.id ?? '';

    console.log(values);

    const savedData = await supabaseClient.from('user_profile').insert(values);

    if (savedData.error) {
      console.error(savedData.error);
    }

    console.log(savedData.data);
  };

  return (
    <Formik initialValues={initialValue} onSubmit={saveProfile}>
      <Form>
        <label htmlFor="entry_code" className="font-light">
          Enter FPL Manager Code
        </label>
        <Field
          id="entry_code"
          className="rounded border border-primary px-4 py-2 w-full"
          name="entry_code"
          required
        />
        <small className="text-xs -mt-1">
          Note: You can find your code in ...
        </small>

        <div
          className="w-full h-64 border border-primary grid place-content-center my-4 cursor-pointer"
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
        <button
          type="submit"
          className="bg-primary text-slate-100 w-full rounded py-2 text-center transition-colors hover:bg-secondary"
        >
          Save
        </button>
      </Form>
    </Formik>
  );
};

export default ProfileForm;
