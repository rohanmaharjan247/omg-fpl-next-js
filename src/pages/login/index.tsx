import { HeadTitle } from '@/components';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

const Login = () => {
  const supabaseClient = useSupabaseClient();
  return (
    <>
      <HeadTitle title="Login" />
      <div className="flex justify-center my-8">
        <div className="card max-w-xl w-96">
          <Auth
            supabaseClient={supabaseClient}
            appearance={{ theme: ThemeSupa }}
            providers={['google']}
            redirectTo="http://localhost:3000"
          />
        </div>
      </div>
    </>
  );
};

export default Login;
