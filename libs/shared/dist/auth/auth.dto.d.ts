export declare class LoginRequest {
    username: string;
    password: string;
}
export declare class RegisterRequest {
    email: string;
    username: string;
    password: string;
}
export declare class JwtPayload {
    sub: string;
    username: string;
    roles?: string[];
}
