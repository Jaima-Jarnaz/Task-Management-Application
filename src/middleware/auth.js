const auth = async (req, res, next) => {
  console.log("Create the middleware");
  next();
};

module.exports = auth;
