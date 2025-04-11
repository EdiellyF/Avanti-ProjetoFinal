import jwt from "jsonwebtoken";
import { sendErrorResponse } from "./sendErrorResponse.js";
import { response } from "express";

export function authMiddleware(request, response, next) {
  try {
    const { authorization } = request.headers;

    if (!authorization) {
      return  sendErrorResponse(response, 401,"Unauthorized: No token provided" )
    }

    const token = authorization.replace("Bearer ", "").trim();



    const { id, role} = jwt.verify(token, process.env.JWT_SECRET);

    if (!id) {
      return sendErrorResponse(response, 401, "Invalid token");
    }

    request.user = { id, role};

    return next();
  } catch (error) {
    console.error("Error in authMiddleware:", error);
      return sendErrorResponse(response, 401,"Unauthorized: Invalid token" )
  }


  

}
  export function isAdminMiddleware(req, res, next) {

    if (req.user?.role !== "ADMIN") {
      return sendErrorResponse(response, 403, "Apenas administradores podem realizar esta ação." )
    }
    next();
  }


  export  function isUser(req, res, next) {

    const {id } = req.params; // id do usuario ou item
    const userId = req.user.id;

    if(req.OriginalUrl.includes("/users")){
      if(!(userId == id || req.user?.role == "ADMIN")){
        return res.status(403).json({ message: "Você só pode acessar ou atualizar seu próprio perfil" }); 
      }
    }
    next();
  }

