import { useContext } from "react";
import { SessionContext } from "../SessionProvider";

export function Post(props) {
  const { currentUser } = useContext(SessionContext);
  return (
    <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">by {props.post.userName}</h3>
      <p className="text-gray-700">{props.post.content}</p>
      {/* currentUser.idとprops.post.userIdが一緒であればさくじょぼたんを表示する */}
      {currentUser.id === props.post.userId && (
        <button
          // idを削除するためprops.post.idを引数に入れる
          onClick={() => props.onDelete(props.post.id)}
          className="text-blue-500 hover:underline cursor-pointer focus:outline-none"
        >
          削除
        </button>
      )}
    </div>
  );
}
