import { ErrorMessage } from "@main/common/error.message";
import { ElysiaConfig } from "@main/configure/elysia.config";
import { RdbmsConfig } from "@main/configure/rdbms.config";
import { greetRouter } from "@main/greet/greet.router";
import { TodoData } from "@main/todo/todo.data";
import { todoRouter } from "@main/todo/todo.router";
import { Elysia } from "elysia";

RdbmsConfig.open();
RdbmsConfig.initialize();
TodoData.initilalize();

const app = new Elysia()
  .use(ElysiaConfig.alysiaStaticPlugin)
  .use(ElysiaConfig.elysiaSwaggerPlugin)
  .use(greetRouter)
  .use(todoRouter)
  .get("/", () => Bun.file("resource/public/index.html"))
  .onError(({ code }) => ErrorMessage.elysiaErrorMessage(code))
  .listen(ElysiaConfig.elysiaOption);

console.info(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
