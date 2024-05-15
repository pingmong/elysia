import { afterEach, beforeAll, beforeEach, describe, expect, test } from "bun:test";
import { RdbmsConfig } from "@main/configure/rdbms.config";
import { TodoData } from "@main/todo/todo.data";
import { TodoHandler } from "@main/todo/todo.handler";
import { TodoHandlerRdbms } from "@main/todo/todo.handler.rdb";
import { Todo, TodoDto } from "@main/todo/todo.model";

describe("Todo Handler rdbms", () => {
  beforeEach(() => {
    // 각 테스트마다 수행됨
    RdbmsConfig.open();
    RdbmsConfig.initialize();
  });

  afterEach(() => {
    RdbmsConfig.close();
  });

  test("FindAll", () => {
    const expected: Todo[] = TodoData.todoData;
    const actual: Todo[] = TodoHandlerRdbms.findAll() as Todo[];

    expect(actual).toEqual(expected);
  });

  test("FindById", () => {
    const expected: Todo = TodoData.todoData[0];

    const actual: Todo = TodoHandler.findById(1) as Todo;
    expect(actual).toEqual(expected);
  });

  test("Add", () => {
    const todo: TodoDto = {
      title: "Test Todo",
      status: "done",
    };
    const actual: Todo = TodoHandlerRdbms.add(todo) as Todo;
    const expected: Todo = {
      id: actual.id,
      ...todo,
    };
    expect(actual).toEqual(expected);
  });

  test("Update", () => {
    const dummy: TodoDto = {
      title: "dummy 1",
      status: "done",
    };

    const updated: TodoDto = {
      title: "Updated Todo",
      status: "done",
    };

    const { id } = TodoHandlerRdbms.add(dummy) as Todo;
    const expected: Todo = { id, ...updated };

    const actual: Todo = TodoHandlerRdbms.update(id, updated) as Todo;
    expect(actual).toEqual(expected);
  });

  test("Remove", () => {
    const dummy: TodoDto = {
      title: "dummy 1",
      status: "done",
    };

    const { id } = TodoHandlerRdbms.add(dummy) as Todo;
    const expected = { id, ...dummy };
    const actual = TodoHandlerRdbms.remove(id) as Todo;
    expect(actual).toEqual(expected);
  });
});
