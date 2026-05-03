import type { CreateTaskInput, UpdateTaskInput } from "./task.validations.js";
export declare const createTask: (userId: string, data: CreateTaskInput) => Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    description: string | null;
    status: import("@prisma/client").$Enums.TaskStatus;
    userId: string;
}>;
export declare const getTasks: (userId: string, query: {
    page?: string;
    limit?: string;
    status?: string;
    search?: string;
}) => Promise<{
    tasks: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        status: import("@prisma/client").$Enums.TaskStatus;
        userId: string;
    }[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}>;
export declare const getTaskById: (userId: string, taskId: string) => Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    description: string | null;
    status: import("@prisma/client").$Enums.TaskStatus;
    userId: string;
}>;
export declare const updateTask: (userId: string, taskId: string, data: UpdateTaskInput) => Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    description: string | null;
    status: import("@prisma/client").$Enums.TaskStatus;
    userId: string;
}>;
export declare const deleteTask: (userId: string, taskId: string) => Promise<void>;
export declare const toggleTaskStatus: (userId: string, taskId: string) => Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    description: string | null;
    status: import("@prisma/client").$Enums.TaskStatus;
    userId: string;
}>;
//# sourceMappingURL=task.service.d.ts.map