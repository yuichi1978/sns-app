import { useContext } from 'react';
import { SessionContext } from '../SessionProvider';

export function SideMenu() {
  // ユーザーの情報はcurrentUserに入っているので定義する
  const { currentUser } = useContext(SessionContext);
  // ユーザーの情報を確認する
  console.log(currentUser);
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-md h-[200px] flex flex-col justify-center">
      <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
      <p>
        <strong>Name:</strong> {currentUser.userName}
      </p>
      <p className="break-words">
        <strong>Email:</strong> {currentUser.email}
      </p>
    </div>
  );
}