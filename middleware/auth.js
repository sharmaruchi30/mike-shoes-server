import jwt from "jsonwebtoken";
import { authErrorResponse, ErrorResponse } from "../controllers/base_response";
export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("token");

    if (!token) {
      // return res.status(403).send("Access Denied");
      return authErrorResponse(res, 'Access Denied')
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (e) {
    ErrorResponse(res, e.message);
  }
};