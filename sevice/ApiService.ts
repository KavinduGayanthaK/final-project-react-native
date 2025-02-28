import axios, { AxiosResponse } from "axios";
import { getToken, saveToken, removeToken } from "./TokenService";

export const api = axios.create({
    baseURL: "http://192.168.1.187:3000",
});

// Attach token to requests
api.interceptors.request.use(
    async (config) => {
        if (!config.url?.includes("/auth")) {
            const token = await getToken();
            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Refresh token mechanism
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = localStorage.getItem("refresh_token");

            if (refreshToken) {
                try {
                    const response = await api.post("/auth/refresh-token", {}, {
                        headers: {
                            Authorization: `Bearer ${refreshToken}`,
                        },
                    });

                    const newAccessToken = response.data.accessToken;
                    saveToken(newAccessToken);

                    originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

                    return api(originalRequest);
                } catch (err) {
                    console.error("Token refresh failed", err);
                    removeToken();
                    window.location.href = "/login";
                }
            } else {
                removeToken();
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

export async function postApiCallWithToken(url: string, data: any): Promise<AxiosResponse> {
    const token = await getToken();
    
    try {
        const response: AxiosResponse = await api.post(url, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (err) {
        throw new Error("API call failed: " + (err as Error).message);
    }
}
