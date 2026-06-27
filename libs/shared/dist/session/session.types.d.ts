export type SessionUser = {
    userId: string;
    username: string;
    roles: string[];
};
export type JwtTokens = {
    accessToken: string;
    refreshToken: string;
};
