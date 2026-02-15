// export const isAuthenticated = (req, res, next) => {
//     if(req.isAuthenticated()) return next();
//     return res.status(401).json({message: "Unauthorized" });
// };

export const isAuthenticated = (req, res, next) => {
  console.log("isAuth?", req.isAuthenticated());
  console.log("user:", req.user);

  if (req.isAuthenticated()) return next();
  return res.status(401).json({ message: "Unauthorized" });
};
