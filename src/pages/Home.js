import { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

import { SessionContext } from "../SessionProvider";
import { SideMenu } from "../components/SideMenu";
import { postRepository } from "../repositories/post";
import { Post } from "../components/Post";
import { Pagination } from "../components/Pagination";
import { authRepository } from "../repositories/auth";

const limit = 5;

function Home() {
  // 投稿からメッセージを入力したら文字列が取れるstate
  const [content, setContent] = useState("");
  // 投稿のデータを格納するstateを定義する
  const [posts, setPosts] = useState([]);
  // pageを管理する関数をstateで定義する
  const [page, setPage] = useState(1);
  const { currentUser, setCurrentUser } = useContext(SessionContext);

  // useEffectでページを表示したときにfetchPosts()を読んでsupabaseからpostsの投稿の配列を取得できるようになる
  useEffect(() => {
    fetchPosts();
  }, []);

  // 投稿の作成したボタンを押したときの実装
  const createPost = async () => {
    const post = await postRepository.create(content, currentUser.id);
    // postのデータをsetPostsに入れタラリアルタイムで更新される
    setPosts([
      // createメソッドで作ったuserIdとuserNameを入れた上で配列の先頭に追加してsetPosts
      { ...post, userId: currentUser.id, userName: currentUser.userName },
      ...posts,
    ]);
    setContent("");
  };

  // 投稿を取得する
  const fetchPosts = async (page) => {
    // supabaseから取ってきたポストの配列をstateに入れる
    const posts = await postRepository.find(page, limit);
    setPosts(posts);
  };

  // 次のページに移動するメソッドを定義する
  const moveToNext = async () => {
    const nextPage = page + 1;
    await fetchPosts(nextPage);
    setPage(nextPage);
  };

  // 前のページに移動するメソッドを定義する
  const moveToPrev = async () => {
    const prevPage = page - 1;
    await fetchPosts(prevPage);
    setPage(prevPage);
  };

  // deletePostのメソッドを追加する
  const deletePost = async (postId) => {
    await postRepository.delete(postId);
    // filterメソッドは条件にあった要素だけ配列を取り出して返す
    setPosts(posts.filter((post) => post.id !== postId));
  };

  // signoutメソッドを記述する
  const signout = async () => {
    await authRepository.signout();
    setCurrentUser(null);
  };

  // Homeコンポーネントではユーザーが登録してない場合はsigninページにリダイレクトされる
  if (currentUser == null) {
    return <Navigate replace to="/signin" />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-[#34D399] p-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">SNS APP</h1>
          <button onClick={signout} className="text-white hover:text-red-600">
            ログアウト
          </button>
        </div>
      </header>
      <div className="container mx-auto mt-6 p-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-2 mb-4 border-2 border-gray-200 rounded-md"
                placeholder="What's on your mind?"
              />
              <button
                onClick={createPost}
                // 文字が入力されていないときはボタンが押せない
                disabled={content === ""}
                className="bg-[#34D399] text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Post
              </button>
            </div>
            <div className="mt-4">
              {posts.map((post) => (
                // 記事の投稿
                <Post key={post.id} post={post} onDelete={deletePost} />
              ))}
            </div>
            {/* ページネーション */}
            {/* ページが1より大きい場合はmoveToNextを渡す前のページをクリックできる */}
            {/* ページが1より大きい場合はmoveToNextを渡す前のページをクリックできる */}
            <Pagination
              // ページが1よりも大きい場合はmoveToPrevを渡す
              onPrev={page > 1 ? moveToPrev : null}
              // 取得している投稿の数がlimitよりも大きい場合はmoveToNextを渡して
              onNext={posts.length >= limit ? moveToNext : null}
            />
          </div>

          {/* サイドメニュー */}
          <SideMenu />
        </div>
      </div>
    </div>
  );
}

export default Home;
