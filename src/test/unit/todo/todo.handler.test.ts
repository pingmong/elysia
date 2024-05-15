import { beforeAll, beforeEach, describe, expect, test } from "bun:test";
import { TodoData } from "@main/todo/todo.data";
import { TodoHandler } from "@main/todo/todo.handler";
import { Todo, TodoDto } from "@main/todo/todo.model";

describe("Todo Handler", () => {
  beforeEach(() => {
    // 각 테스트마다 수행됨
    TodoData.initilalize();
  });

  test("FindAll", () => {
    const expected = TodoData.todoData;
    const actual = TodoHandler.findAll();

    expect(actual).toEqual(expected);
  });

  test("FindById", () => {
    const expected = TodoData.todoData[0];
    const actual = TodoHandler.findById(1);

    expect(actual).toEqual(expected);
  });

  describe("Add", () => {
    let expected: Todo;
    let actual: Todo;

    const todo: TodoDto = {
      title: "Test Todo",
      status: "done",
    };

    beforeEach(() => {
      TodoData.initilalize();

      actual = TodoHandler.add(todo);
      expected = {
        id: actual.id,
        ...todo,
      };
    });

    test("Add 1", () => {
      expect(actual).toEqual(expected);
    });

    test("Add 2", () => {
      expect(TodoData.todoData).toContainEqual(expected);
    });
  });

  describe("Update", () => {
    let actual: Todo;
    let expected: Todo;

    const dummy: TodoDto = {
      title: "dummy 1",
      status: "done",
    };

    const updated: TodoDto = {
      title: "Updated Todo",
      status: "done",
    };

    beforeEach(() => {
      TodoData.initilalize();

      const { id } = TodoHandler.add(dummy);
      expected = { id, ...updated };
      actual = TodoHandler.update(id, updated) as Todo;
    });

    test("Update 1", () => {
      expect(actual).toEqual(expected);
    });

    test("Update 2", () => {
      expect(TodoData.todoData).toContainEqual(expected);
    });
  });

  describe("Remove", () => {
    let actual: Todo;
    let expected: Todo;

    const dummy: TodoDto = {
      title: "dummy 1",
      status: "done",
    };

    beforeEach(() => {
      TodoData.initilalize(); // 초기값을 항상 유지하기 위함?

      const { id } = TodoHandler.add(dummy);
      expected = { id, ...dummy };
      actual = TodoHandler.remove(id) as Todo;
    });

    test("Remove 1", () => {
      expect(actual).toEqual(expected);
    });

    test("Remove 2", () => {
      expect(TodoData.todoData).not.toContainEqual(expected);
    });
  });
});
