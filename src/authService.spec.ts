import { createAuthService } from ".";

describe("authService", () => {
  let authService;

  beforeAll(() => {
    authService = createAuthService({
      PASSWORD_SALT_ROUNDS: 10,
      AUTH_TOKEN_SECRET: "auth token secret"
    });
  });

  describe("hashPassword", () => {
    it("hashes password properly", async () => {
      const originalPassword = "12345";
      const result = await authService.hashPassword(originalPassword);

      expect(result).toBeDefined();
      expect(result).not.toBe(originalPassword);
    });
  });

  describe("checkPassword", () => {
    it("checks passwords properly", async () => {
      const originalPassword = "12345";
      const hashedOriginalPassword = await authService.hashPassword(
        originalPassword
      );

      let result = await authService.checkPassword(
        originalPassword,
        hashedOriginalPassword
      );
      let expected = true;

      expect(result).toBe(expected);

      result = await authService.checkPassword(
        "wrongPassword",
        hashedOriginalPassword
      );
      expected = false;

      expect(result).toBe(expected);
    });
  });

  describe("generateToken", () => {
    it("generates token properly", () => {
      const userData = { id: 1, role: "admin" };

      const result = authService.generateToken(userData);

      expect(result).toBeDefined();
    });
  });

  describe("decodeToken", () => {
    it("decodes token properly", () => {
      const userData = { id: 1, role: "admin" };

      const accessToken = authService.generateToken(userData);
      const decodedData = authService.decodeToken(accessToken);

      expect(decodedData.id).toBe(userData.id);
      expect(decodedData.role).toBe(userData.role);
    });
  });
});
