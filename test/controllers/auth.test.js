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
					password: "Amigo41*sdf",
				},
			};

			const response = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
			};

			findByEmail.mockResolvedValueOnce({
				id: 1,
				email: "jujuan27@hotmail.com",
				password: "Amigo41*sdf",
			});

			sign.mockReturnValue("esto-es-un-jwt-xd");

			// Act
			await login(request, response);

			// Assert
			expect(response.status).toHaveBeenCalledWith(200);
			expect(response.json).toHaveBeenCalledWith({
				jwt: "esto-es-un-jwt-xd",
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
				message: "Email o contraseña inválidos",
				messagedev: "No se encontro el usuario en la base de datos",
				code: "ERR_AUTH",
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
				message: "Email o contraseña inválidos",
				messagedev: "No se encontro el usuario en la base de datos",
				code: "ERR_AUTH",
			});
		});
	});
});
