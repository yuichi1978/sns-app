import { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";

import { authRepository } from "../repositories/auth";
import { SessionContext } from "../SessionProvider";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // valueで渡したものをuseContextで呼び出す
  const { currentUser, setCurrentUser } = useContext(SessionContext);

  // loginボタンのAPI処理の実装
  const signin = async () => {
    const user = await authRepository.signin(email, password);
    setCurrentUser(user);
    // ログインボタンを押したらsupabaseで登録したユーザの情報が取れているのか確認できる
    console.log(user);
  };

  // setCurrentUserが入っていればHome画面に遷移する実装
  // currentUserが空でなければNavigateコンポネントからhomeに遷移する
  if (currentUser != null) return <Navigate replace to="/" />

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-extrabold text-gray-900">SNS APP</h2>
        <div className="mt-8 w-full max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="space-y-6">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="email"
                >
                  メールアドレス
                </label>
                <div className="mt-1">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    name="email"
                    placeholder="メールアドレス"
                    required
                    type="email"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="password"
                >
                  パスワード
                </label>
                <div className="mt-1">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    name="password"
                    placeholder="パスワード"
                    required
                    type="password"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <button
                  onClick={signin}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  // どちらかの項目を入力しないとdisabledでボタンが押せなくなる
                  disabled={email === "" || password === ""}
                >
                  ログイン
                </button>
              </div>
              <div className="mt-4 text-center text-sm">
                登録は
                <Link className="underline" to={"/signup"}>
                  こちら
                </Link>
                から
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
