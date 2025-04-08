import jwt from "jsonwebtoken";

export function authMiddleware(request, response, next) {
  try {
    const { authorization } = request.headers;

    if (!authorization) {
      return response
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const token = authorization.replace("Bearer ", "").trim();

    const { id, role} = jwt.verify(token, process.env.JWT_SECRET);

    if (!id) {
      return response.status(401).json({ message: "Invalid token" });
    }

    request.user = { id, role};

    return next();
  } catch (error) {
    console.error("Error in authMiddleware:", error);
    return response
      .status(401)
      .json({ message: "Unauthorized: Invalid token" });
  }



}
  export function isAdminMiddleware(req, res, next) {
    if (req.user?.role !== "ADMIN" || req.user?.role !== "admin") {
      return res.status(403).json({ message: "Apenas administradores podem realizar esta ação." });
    }
    next();
  }