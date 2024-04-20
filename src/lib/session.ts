import supabase from "./supabase";

export async function getCurrentUser() {
  const user = (await supabase.auth.getUser()).data.user;
  console.log(user);

  return user;
}
