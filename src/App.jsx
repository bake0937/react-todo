import { useState } from "react";
import { CompleteTodos } from "./components/CompleteTodos";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { InputTodo } from "./components/InputTodo";
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
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
      />
      <IncompleteTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};
