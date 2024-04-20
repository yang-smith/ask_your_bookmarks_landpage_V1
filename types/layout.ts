import { User } from "@supabase/supabase-js";

export interface HomeLayoutChildren {
  children?: React.ReactNode;
}
export interface HomeLayoutProps extends HomeLayoutChildren {
  user?: User | null;
}