import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["x-auth-token"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Unauthorized: No authorization header" });
  }
  const [, token] = authHeader.split(" ");
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  console.log("TOKEN", token, process.env.JWT_SECRET);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(403).json({ message: "Forbidden: Invalid token" });
  }
};

export default verifyJWT;
