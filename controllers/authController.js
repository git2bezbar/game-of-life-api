const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const express = require('express');
const jwt = require("jsonwebtoken");

/**
  * Connects a user.
  * @example
  * ```js
  * login(req, res);
  * ```
  * @param {Object} req - The request object.
  * @param {Object} res - The response object.
  * @returns {JSON} The JWT token.
  * @throws 401 if the authentication failed.
*/
async function login(req, res) {
  const { username, password } = req.body
  const user = await prisma.user.findUnique({ where: { username, password } })

	if (user !== null) {
		const jwtToken = jwt.sign({ username }, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});

		res.cookie("jwtToken", jwtToken, { httpOnly: true, secure: true, sameSite: "none" });
		res.json(jwtToken);
	} else {
		res.status(401).json({ message: "Authentification échouée." });
	}
}

/**
 * Disconnects a user.
 * @example
 * ```js
 * logout(req, res);
 * ```
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {JSON} A message.
*/

async function logout(req, res) {
  res.clearCookie("jwtToken");
  res.json({ message: "Déconnexion réussie." });
}

module.exports = {
  login,
  logout
};