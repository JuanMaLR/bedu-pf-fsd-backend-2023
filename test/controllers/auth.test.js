/* eslint-disable no-undef */
const { login } = require("../../src/controllers/auth");
const { findByEmail } = require("../../src/services/user");
const { sign } = require("jsonwebtoken");

jest.mock("jsonwebtoken");
jest.mock("../../src/services/user");

describe("Auth Controller Unit Test", () => {
	describe("login(request, response) test", () => {
		it("should return a json web token if the credentials are correct", async () => {
			// Arrange
			const request = {
				body: {
					email: "jujuan27@hotmail.com",
					password: "Amigo41*dfs",
				},
			};

			const response = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
			};

			findByEmail.mockResolvedValueOnce({
				id: 1,
				email: "jujuan27@hotmail.com",
				password: "$2b$10$728ahfCGrynh42Jtv0YYPuNbW1lL1QLrfrsYZ2MXJgXzqS55TjJN2",
			});

			sign.mockReturnValue("esto-es-un-jwt-xd");

			// Act
			await login(request, response);

			// Assert
			expect(response.status).toHaveBeenCalledWith(200);
			expect(response.json).toHaveBeenCalledWith({
				data: {jwt: "esto-es-un-jwt-xd"},
				http_status_code: 200,
    			status: "succes",
    			text: "inicio de sesion exitoso"
			});
		});

		it("should return an error 400 if the email doesnt exist", async () => {
			const request = {
				body: {
					email: "test",
					password: "781923891723981",
				},
			};

			const response = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
			};

			findByEmail.mockResolvedValueOnce(null);

			await login(request, response);

			expect(response.status).toHaveBeenCalledWith(400);
			expect(response.json).toHaveBeenCalledWith({
				http_status_code: 400,
				message: "Email o contraseña inválidos",
				messagedev: "No se encontro el usuario en la base de datos",
				status: "ERR_AUTH",
			});
		});

		it("should return an error 400 if the password is not the same", async () => {
			const request = {
				body: {
					email: "jujuan27@hotmail.com",
					password: "781923891723981",
				},
			};

			const response = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
			};

			findByEmail.mockResolvedValueOnce({
				id: 1,
				email: "jujuan27@hotmail.com",
				password: "unacontraseñatodachafaxd",
			});

			await login(request, response);

			expect(response.status).toHaveBeenCalledWith(400);
			expect(response.json).toHaveBeenCalledWith({
				http_status_code: 400,
				message: "Email o contraseña inválidos",
				messagedev: "No se encontro el usuario en la base de datos",
				status: "ERR_AUTH",
			});
		});
	});
});
