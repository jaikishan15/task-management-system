import { createTask, deleteTask, getTaskById, getTasks, toggleTaskStatus, updateTask, } from "./task.service.js";
import { createTaskSchema, updateTaskSchema } from "./task.validations.js";
export const createTaskController = async (req, res) => {
    try {
        const validatedData = createTaskSchema.parse(req.body);
        const task = await createTask(req.user.userId, validatedData);
        return res.status(201).json({
            success: true,
            message: "Task created successfully",
            data: task,
            statusCode: 201,
        });
    }
    catch (error) {
        if (error.name === "ZodError") {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: error.issues,
                statusCode: 400,
            });
        }
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            statusCode: 500,
        });
    }
};
export const getTasksController = async (req, res) => {
    try {
        const result = await getTasks(req.user.userId, req.query);
        return res.status(200).json({
            success: true,
            message: "Tasks fetched successfully",
            data: result,
            statusCode: 200,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            statusCode: 500,
        });
    }
};
export const getTaskByIdController = async (req, res) => {
    try {
        const task = await getTaskById(req.user.userId, req.params.id);
        return res.status(200).json({
            success: true,
            message: "Task fetched successfully",
            data: task,
            statusCode: 200,
        });
    }
    catch (error) {
        if (error.message === "Task not found") {
            return res.status(404).json({
                success: false,
                message: error.message,
                statusCode: 404,
            });
        }
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            statusCode: 500,
        });
    }
};
export const updateTaskController = async (req, res) => {
    try {
        const validatedData = updateTaskSchema.parse(req.body);
        const task = await updateTask(req.user.userId, req.params.id, validatedData);
        return res.status(200).json({
            success: true,
            message: "Task updated successfully",
            data: task,
            statusCode: 200,
        });
    }
    catch (error) {
        if (error.message === "Task not found") {
            return res.status(404).json({
                success: false,
                message: error.message,
                statusCode: 404,
            });
        }
        if (error.name === "ZodError") {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: error.issues,
                statusCode: 400,
            });
        }
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            statusCode: 500,
        });
    }
};
export const deleteTaskController = async (req, res) => {
    try {
        await deleteTask(req.user.userId, req.params.id);
        return res.status(200).json({
            success: true,
            message: "Task deleted successfully",
            statusCode: 200,
        });
    }
    catch (error) {
        if (error.message === "Task not found") {
            return res.status(404).json({
                success: false,
                message: error.message,
                statusCode: 404,
            });
        }
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            statusCode: 500,
        });
    }
};
export const toggleTaskStatusController = async (req, res) => {
    try {
        const task = await toggleTaskStatus(req.user.userId, req.params.id);
        return res.status(200).json({
            success: true,
            message: "Task status toggled successfully",
            data: task,
            statusCode: 200,
        });
    }
    catch (error) {
        if (error.message === "Task not found") {
            return res.status(404).json({
                success: false,
                message: error.message,
                statusCode: 404,
            });
        }
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            statusCode: 500,
        });
    }
};
//# sourceMappingURL=task.controller.js.map