// このコンポーネントの中にグローバルを使ってユーザーのログイン状態を管理する
import { createContext, useState, useEffect } from "react";
import { authRepository } from "./repositories/auth";

// 先ずはcreateContextを定義するためSessionContextの定数を作る
const SessionContext = createContext();

// その次にコンポーネントと同じ名前をSessionProvider定数で定義する
const SessionProvider = (props) => {
  const [currentUser, setCurrentUser] = useState();
  // currentUserの処理が終わるまではローディングする
  const [isLoading, setIsLoading] = useState(true);

  // アプリ起動時に1回だけ呼び出すのでuseEffectを使う
  useEffect(() => {
    setSesson();
  }, [])

  // currnetユーザーを取得する部分
  const setSesson = async () => {
    const currentUser = await authRepository.getCurrentUser();
    setCurrentUser(currentUser);
    setIsLoading(false);
  }

  // もしもisLoadingがtrueだった場合は
  if (isLoading) {
    return <div />;
  }

  return (
    <SessionContext.Provider value={{ currentUser, setCurrentUser }}>
      {/* props.children以下の全てのコンポーネントで使いまわしができる */}
      {props.children}
    </SessionContext.Provider>
  );
};

export { SessionContext, SessionProvider };
