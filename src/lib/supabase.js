import { createClient } from "@supabase/supabase-js";

// createClientで初期化処理を行う
export const supabase = createClient(
  // 第１引数にはsupabaseのProject URLを入れて
  process.env.REACT_APP_SUPABASE_URL,
  // 第２引数にはsupabaseのAPI Keyを入れる
  process.env.REACT_APP_SUPABASE_API_KEY
);
