import { createBrowserClient } from "@supabase/ssr";
import supabase from "./supabase";

export async function getCurrentUser() {
  const session = await supabase.auth.getSession()
  // console.log(session.data.session?.user);
  const user = session.data.session?.user;
  
  return user;
}

import { GetServerSideProps } from 'next';
import cookie from 'cookie';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  
  const parsedCookies = cookie.parse(req.headers.cookie || '');
  const email = parsedCookies['user:email'];  

  if (!email) {
    return {
      props: {
        user: null
      }
    };
  }

  return {
    props: {
      email  
    }
  };
};

