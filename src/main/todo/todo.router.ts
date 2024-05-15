import { TodoHandlerRdbms as TodoHandler } from "@main/todo/todo.handler.rdb";
// import { TodoHandler } from "@main/todo/todo.handler";
import { TodoModel } from "@main/todo/todo.model";
import { Elysia } from "elysia";

export const todoRouter = new Elysia({ prefix: "/todos" })
  .use(TodoModel)
  .get("/", () => TodoHandler.findAll(), {
    detail: {
      tags: ["Todo"],
      description: "Todo 목록을 조회합니다.",
    },
  })
  .get("/:id", ({ params }) => TodoHandler.findById(params.id), {
    params: "todo.todoId",
    transform({ params }) {
      params.id = Number(params.id);
    },
    detail: {
      tags: ["Todo"],
      description: "Todo 하나를 조회합니다.",
    },
  })
  .post(
    "/",
    ({ set, body }) => {
      set.status = 201;
      TodoHandler.add(body);
    },
    {
      body: "todo.todoDto",
      detail: {
        tags: ["Todo"],
        description: "Todo 하나를 등록합니다.",
      },
    },
  )
  .patch("/:id", ({ params, body }) => TodoHandler.update(params.id, body), {
    detail: {
      tags: ["Todo"],
      description: "Todo를 업데이트합니다.",
    },
    params: "todo.todoId",
    transform({ params }) {
      params.id = Number(params.id);
    },
    body: "todo.todoDto",
  })
  .delete("/:id", ({ params }) => TodoHandler.remove(params.id), {
    detail: {
      tags: ["Todo"],
      description: "Todo 하나를 id 기준으로 삭제합니다.",
    },
    params: "todo.todoId",
    transform({ params }) {
      params.id = Number(params.id);
    },
  });
