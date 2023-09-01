import { apiClient } from "./ApiClient";
export const executeJwtAuthenticationService = (usernameOrEmail, password) =>
  apiClient.post("/api/auth/login", { usernameOrEmail, password });
