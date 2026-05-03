import type { Response } from "express";
import type { AuthRequest } from "../../middleware/auth.middleware.js";
export declare const createTaskController: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getTasksController: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getTaskByIdController: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateTaskController: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteTaskController: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const toggleTaskStatusController: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=task.controller.d.ts.map