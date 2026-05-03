import { prisma } from "../../db/prisma.js";
export const createTask = async (userId, data) => {
    const task = await prisma.task.create({
        data: {
            title: data.title,
            description: data.description ?? null,
            userId,
        },
    });
    return task;
};
export const getTasks = async (userId, query) => {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;
    const whereClause = {
        userId,
    };
    if (query.status) {
        whereClause.status = query.status;
    }
    if (query.search) {
        whereClause.title = {
            contains: query.search,
            mode: "insensitive",
        };
    }
    const [tasks, total] = await Promise.all([
        prisma.task.findMany({
            where: whereClause,
            skip,
            take: limit,
            orderBy: {
                createdAt: "desc",
            },
        }),
        prisma.task.count({
            where: whereClause,
        }),
    ]);
    return {
        tasks,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
    };
};
export const getTaskById = async (userId, taskId) => {
    const task = await prisma.task.findFirst({
        where: {
            id: taskId,
            userId,
        },
    });
    if (!task) {
        throw new Error("Task not found");
    }
    return task;
};
export const updateTask = async (userId, taskId, data) => {
    const existingTask = await prisma.task.findFirst({
        where: {
            id: taskId,
            userId,
        },
    });
    if (!existingTask) {
        throw new Error("Task not found");
    }
    const updateData = {
        ...(data.title !== undefined && { title: data.title }),
        ...(data.description !== undefined && {
            description: data.description ?? null,
        }),
        ...(data.status !== undefined && { status: data.status }),
    };
    const updatedTask = await prisma.task.update({
        where: {
            id: taskId,
        },
        data: updateData,
    });
    return updatedTask;
};
export const deleteTask = async (userId, taskId) => {
    const existingTask = await prisma.task.findFirst({
        where: {
            id: taskId,
            userId,
        },
    });
    if (!existingTask) {
        throw new Error("Task not found");
    }
    await prisma.task.delete({
        where: {
            id: taskId,
        },
    });
    return;
};
export const toggleTaskStatus = async (userId, taskId) => {
    const existingTask = await prisma.task.findFirst({
        where: {
            id: taskId,
            userId,
        },
    });
    if (!existingTask) {
        throw new Error("Task not found");
    }
    const updatedTask = await prisma.task.update({
        where: {
            id: taskId,
        },
        data: {
            status: existingTask.status === "PENDING" ? "COMPLETED" : "PENDING",
        },
    });
    return updatedTask;
};
//# sourceMappingURL=task.service.js.map