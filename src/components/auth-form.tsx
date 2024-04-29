'use client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa, ViewType } from '@supabase/auth-ui-shared'
import { createBrowserClient } from '@supabase/ssr'
import { useEffect } from 'react';
import Cookie from 'js-cookie';
import { getCurrentUser } from '../lib/session';

export default function AuthForm({view}: {view: ViewType | undefined}) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const key = process.env.NEXT_PUBLIC_SUPABASE_KEY || '';
    const supabase = createBrowserClient(url, key);
    useEffect(() => {
      const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
        switch (event) {
          case 'SIGNED_IN':
            // 登录成功后重定向
            window.location.href = 'https://bookmarkbot.fun/';
            break;
          case 'SIGNED_OUT':
            // 登出后可能不需要做任何事
            break;
          case 'USER_UPDATED':
            // 可能包括密码重置或邮箱验证后的操作
            break;
          case 'PASSWORD_RECOVERY':
            // 密码找回后的操作
            break;
        }
      });
  
      return () => {
        authListener.subscription.unsubscribe();
      };
    }, [supabase.auth]);

    return (
        <Auth
            supabaseClient={supabase}
            view={view}
            appearance={{
                theme: ThemeSupa,
                style: {
                  button: {
                    borderRadius: '10px',
                    borderColor: 'rgba(0,0,0,0)',
                  },
                },
                variables: {
                  default: {
                    colors: {
                      brand: 'rgb(5, 37, 37)',
                      brandAccent: `gray`,
                    },
                  },
                },
              }}
            // theme="light"
            showLinks={false}
            socialLayout='horizontal'
            providers={['google']}
            redirectTo="https://bookmarkbot.fun/"
        />
    )
}
