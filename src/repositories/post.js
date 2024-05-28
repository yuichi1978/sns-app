// post.jsの中に投稿を作成する処理になる
import { supabase } from "../lib/supabase";

export const postRepository = {
  async create(content, userId) {
    // supabaseで作ったpostsテーブルのデータを引数に入れる postsテーブルからデータを取得したりデータを登録できる
    const { data, error } = await supabase
      .from("posts")
      .insert([
        {
          content,
          user_id: userId,
        },
      ])
      .select();
    if (error != null) throw new Error(error.message);
    return data[0];
  },

  // メソッドを追加する
  // paginationで利用するので引数にpage,limitを入れる
  async find(page, limit) {
    // この2つの条件のどちらかがtrueである場合、pageを1に設定し、それ以外の場合はそのままの値を保持します
    page = isNaN(page) || page < 1 ? 1 : page;
    // この場合はpage1 - 1で0でstartが0になる
    const start = limit * (page - 1);
    // この場合はstartが0で例えばlimitが5なら -1でendが4ページになる
    const end = start + limit - 1;

    const { data, error } = await supabase
      // posts_viewの中身を*で全て取得する
      .from("posts_view")
      .select("*")
      .range(start, end)
      // orderとは並び替えcreated_atとは投稿が作成された時間
      .order("created_at", { ascending: false });
    if (error != null) throw new Error(error.message);
    return data.map((post) => {
      return {
        ...post,
        userId: post.user_id,
        userName: post.user_metadata.name,
      };
    });
  },
  // 削除するpostのメソッドを記述
  async delete(id) {
    const { error } = await supabase.from('posts').delete().eq("id", id);
    if (error != null) throw new Error(error.message);
    // 削除処理が終わればtrueが返る
    return true; 
  },
};
