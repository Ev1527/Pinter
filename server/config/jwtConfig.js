const jwtConfig = {
  access: {
    type: "access",
    expiresIn: `${1000 * 60 * 60 * 23}`,
  },
  refresh: {
    type: "refresh",
    expiresIn: `${1000 * 60 * 60 * 24}`,
  },
};

module.exports = jwtConfig;
