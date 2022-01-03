import { useState } from "react";
import "./styles.css";

export const App = () => {
  const [todoText, setTodoText] = useState("");

  // 実装初期は下記のようにuseStateの配列に初期値を入れて進める
  // const [incompleteTodos, setIncompleteTodos] = useState([
  //   "あああああ",
  //   "いいいいい"
  // ]);

  // 実装がある程度できたら初期値を消す
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

  // event.targett.value
  const onChangeTodoText = (event) => setTodoText(event.target.value);

  // 入力したタスクを未完了リストに追加する
  const onClickAdd = () => {
    // 空文字のタスクは追加できないようにする
    if (todoText === "") return;
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText("");
  };

  // 未完了リストからTODOを削除する
  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };

  // 完了リストへ移動する
  const onClickComplete = (index) => {
    // 未完了リストから削除する
    // 今のnewIncompleteTodosをコピーする
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);
    setIncompleteTodos(newIncompleteTodos);

    // 完了リストへ追加する
    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    setCompleteTodos(newCompleteTodos);
  };

  // 未完了リストへ戻す
  const onClickBack = (index) => {
    // 完了リストから削除する
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);

    // 未完了リストへ追加する
    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    // 完了リストを更新する
    setCompleteTodos(newCompleteTodos);
    // 未完了リストを更新する
    setIncompleteTodos(newIncompleteTodos);
  };

  return (
    <>
      <div className="input-area">
        <input
          placeholder="TODOを入力"
          value={todoText}
          onChange={onChangeTodoText}
        />
        <button onClick={onClickAdd}>追加</button>
      </div>
      <div className="incomplete-area">
        <p className="title">未完了のTODO</p>
        <ul>
          {incompleteTodos.map((todo, index) => {
            return (
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button onClick={() => onClickComplete(index)}>完了</button>
                <button onClick={() => onClickDelete(index)}>削除</button>
              </div>
            );
          })}
        </ul>
      </div>
      <div className="complete-area">
        <p className="title">完了のTODO</p>
        <ul>
          {completeTodos.map((todo, index) => {
            return (
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button onClick={() => onClickBack(index)}>戻す</button>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
};
