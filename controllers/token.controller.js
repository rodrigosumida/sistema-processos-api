const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const firebase = require("../firebaseConfig");
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");

class TokenController {
  async insert_token(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email }).lean();

      if (!user) {
        return res.status(404).json({ error: "Usuário ou senha incorretos." });
      }

      const auth = getAuth(firebase);
      await signInWithEmailAndPassword(auth, email, password);

      delete user.password;
      const userWithoutPassword = user;

      const token = jwt.sign(
        userWithoutPassword,
        "adwdakhwiugbaiyeba2yuvb2e2a2a",
        { expiresIn: "1d" }
      );

      return res.status(200).json({ token });
    } catch (error) {
      if (error.code === "auth/invalid-credential")
        return res
          .status(404)
          .json({ error: "Usuário ou senha incorretos.", result: false });
      return res.status(400).json(error);
    }
  }
}

module.exports = TokenController;
