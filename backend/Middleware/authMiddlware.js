import jwt from "jsonwebtoken";


const authMiddleware = (req, res, next) => {
  const token = req.header("token");
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Not authorized, Login first!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded._id;

    next();
    
  } catch (error) {
    console.error("Error in auth middleware:", error);
    return res.status(401).json({ success: false, message: "Invalid token!" });
  }
};

export default authMiddleware;