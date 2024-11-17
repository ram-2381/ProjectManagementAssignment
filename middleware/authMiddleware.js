const jwt = require("jsonwebtoken");

// Middleware to authenticate user
// const authMiddleware = async (req, res, next) => {
//   const token = req.header("Authorization")?.split(" ")[1];
//   if (!token) {
//     return res.status(401).json({ error: "No token, authorization denied" });
//   }
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded.id;
//     const useridFromToken = decoded.id;
//     const useridFromRequest = req.params.id;
//     if (useridFromToken !== useridFromRequest) {
//       return res.status(401).send({message: "You are not authorized to access this route"});
//     }
//     next();
//   } catch (err) {
//     res.status(401).json({ error: "Invalid token" });
//   }
// };

const authMiddleware = async (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "No token, authorization denied" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded token payload to the request object
    req.user = decoded;

    // If user ID comparison is required (e.g., for specific routes)
    // const userIdFromToken = decoded.id; // ID from token
    // const userIdFromRequest = req.params.id; // ID from the request (if applicable)

    // if (userIdFromRequest && userIdFromToken !== userIdFromRequest) {
    //   return res.status(403).json({ message: "You are not authorized to access this route" });
    // }

    // If everything is valid, proceed to the next middleware
    next();
  } catch (err) {
    // Handle invalid or expired token errors
    res.status(401).json({ error: "Invalid or expired token" });
  }
};



module.exports = authMiddleware;
