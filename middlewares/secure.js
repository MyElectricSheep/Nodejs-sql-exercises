const secure = (req, res, next) => {
  const { token } = req.query;
  if (!token)
    return res.status(403).send("Unauthorized access. Please provide a token!");
  console.log("Token successfully verified");
  next();
};

module.exports = secure;
