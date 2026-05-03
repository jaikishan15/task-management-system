import type { LoginInput, RegisterInput } from "../auth/auth.validations.js";
export declare const registerUser: (data: RegisterInput) => Promise<{
    id: string;
    name: string;
    email: string;
}>;
export declare const loginUser: (data: LoginInput) => Promise<{
    user: {
        id: string;
        name: string;
        email: string;
    };
    accessToken: string;
    refreshToken: string;
}>;
export declare const logoutUser: (refreshToken: string) => Promise<void>;
export declare const refreshUserAccessToken: (refreshToken: string) => Promise<{
    accessToken: string;
}>;
//# sourceMappingURL=auth.service.d.ts.map