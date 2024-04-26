import { createBrowserClient } from "@supabase/ssr";
import supabase from "./supabase";
import useSWR from 'swr';

export async function getCurrentUser() {
  const session = await supabase.auth.getSession()
  console.log(session.data.session?.user);
  const user = session.data.session?.user;

  return user;
}


// Fetcher 函数，用于 SWR 获取数据
const fetchSession = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) throw new Error('Failed to fetch session');
  return session;
}

// 创建一个自定义 Hook 来使用 SWR 获取用户会话
export function useUserSession() {
  const { data: session, error } = useSWR('supabaseSession', fetchSession, {
  });

  return {
    session,
    isLoading: !error && !session,
    isError: error
  };
}

