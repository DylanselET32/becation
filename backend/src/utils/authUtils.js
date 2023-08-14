const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Función para cifrar texto con bcrypt
const encryptText = async (text) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const encryptedText = await bcrypt.hash(text, salt);
    return encryptedText;
  } catch (error) {
    console.error(error);
    throw new Error("Internal server error");
  }
};

// Función para comparar un texto con un hash cifrado con bcrypt
const hashCompare = async (text, hash) => {
  const compare = await bcrypt.compare(text, hash);
  return compare;
};

//JWT Funtions
const createToken = (user) => {
  const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
  return token;
};

const createEmailTokenById = (user_id,email,data = null) => {
  const token = jwt.sign({ user_id, email, data}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION_EMAIL});
  return token;
};
const verifyToken = (token) => {
  try {
    const isValid = jwt.verify(token, process.env.JWT_SECRET);
    return isValid;
  } catch (err) {
    console.error(err)
    return null;
  }
};


module.exports = {
    encryptText,
    hashCompare,
    createToken,
    createEmailTokenById,
    verifyToken,
  };