import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { createTaskController, deleteTaskController, getTaskByIdController, getTasksController, toggleTaskStatusController, updateTaskController, } from "./task.controller.js";
const taskRouter = Router();
taskRouter.use(authMiddleware);
taskRouter.post("/", createTaskController);
taskRouter.get("/", getTasksController);
taskRouter.get("/:id", getTaskByIdController);
taskRouter.patch("/:id", updateTaskController);
taskRouter.delete("/:id", deleteTaskController);
taskRouter.patch("/:id/toggle", toggleTaskStatusController);
export default taskRouter;
//# sourceMappingURL=task.routes.js.map