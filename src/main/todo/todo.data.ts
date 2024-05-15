import { Todo } from "@main/todo/todo.model";

const todoData: Todo[] = [];

const initData: Todo[] = [
  {
    id: 1,
    title: "First Todo",
    status: "pending",
  },
  {
    id: 2,
    title: "Second Todo",
    status: "done",
  },
  {
    id: 3,
    title: "Third Todo",
    status: "pending",
  },
  {
    id: 4,
    title: "Fourth Todo",
    status: "progress",
  },
  {
    id: 5,
    title: "Fifth Todo",
    status: "pending",
  },
];

const initilalize = () => {
  // todoData를 initData로 초기화한다.

  TodoData.todoData = [...initData];
  // todoData = initData가 제대로 동작되지 않는 이유는 let으로 작성하면 지역스코프로 잡히기 때문에 현재 영역 안에서만 사용할 수 있기 때문이다.
};

export const TodoData = {
  todoData,
  initilalize,
};
