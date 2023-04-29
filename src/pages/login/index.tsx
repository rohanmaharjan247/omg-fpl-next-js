import { HeadTitle } from '@/components';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

const Login = () => {
  const supabaseClient = useSupabaseClient();
  const redirect =
    process.env.NODE_ENV === 'production'
      ? 'https://fpl-omg.vercel.app/'
      : 'http://localhost:3000';
  return (
    <>
      <HeadTitle title="Login" />
      <div className="flex justify-center my-8">
        <div className="card max-w-xl w-96">
          <Auth
            supabaseClient={supabaseClient}
            appearance={{ theme: ThemeSupa }}
            providers={['google']}
            redirectTo={redirect}
          />
        </div>
      </div>
    </>
  );
};

export default Login;
