import { supabase } from "../lib/supabase";

// 様々なAPIをたたくためauth.jsに格納する
export const authRepository = {
  // signupの登録時のAPIを入れる 引数にname,email,passwordを入れる
  async signup(name, email, password) {
    // 先程作ったsupabase.jsのAPIを呼び出す
    const { data, error } = await supabase.auth.signUp({
      // emailとpasswordを使いユーザーの登録を行う
      // optionsとはパスワード以外のユーザー情報を入れる
      email,
      password,
      options: { data: { name } },
    });
    // supabaseから返ってきたエラーが存在するればReact側の方でエラーを出す
    if (error != null) throw new Error(error.message);
    return {
      ...data.user,
      // userNameのプロパティを追加してユーザー名が取得できる
      // signupメソッドから返ってきたらユーザー名が取得できる
      userName: data.user.user_metadata.name,
    };
    user.userName;
  },
  // signinメソッドを実装する
  // signinメソッドの中でemailとパスワードを受け取る
  async signin(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    // エラーがもし存在するならばReact側の方でエラーを出す
    if (error) throw new Error(error.message);
    return {
      ...data.user,
      userName: data.user.user_metadata.name,
    };
  },
  // ユーザーの情報を取得するメソッドを作る
  async getCurrentUser() {
    // supabaseの関数を使いsupabase.auth.getSessionで呼び出す
    const { data, error } = await supabase.auth.getSession();
    if (error != null) throw new Error(error.message);
    if (data.session == null) return;

    return {
      ...data.session.user,
      userName: data.session.user.user_metadata.name,
    };
  },
  // ログアウト機能の実装
  async signout() {
    const { error } = await supabase.auth.signOut();
    if (error != null) throw new Error(error.message);
    return true;
  },
};
