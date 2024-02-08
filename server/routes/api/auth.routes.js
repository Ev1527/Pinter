const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User } = require("../../db/models");
const generateTokens = require("../../utils/authUtils");
const cookiesConfig = require("../../config/cookiesConfig");

router.post("/sign-up", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let userInDb = await User.findOne({ where: { email } });
    if (!name || !email || !password) {
      res.json({ message: "Заполните все поля" });
      return;
    }
    if (userInDb) {
      res.json({ message: "Такой емайл уже занят" });
      return;
    }
    const hash = await bcrypt.hash(password, 10);
    userInDb = await User.create({ name, email, password: hash });

    if (userInDb) {
      const { accessToken, refreshToken } = generateTokens({
        user: { id: userInDb.id, email: userInDb.email, name: userInDb.name },
      });

      res
        .cookie(cookiesConfig.refresh, refreshToken, {
          maxAge: cookiesConfig.maxAgeRefresh,
          httpOnly: true,
        })
        .cookie(cookiesConfig.access, accessToken, {
          maxAge: cookiesConfig.maxAgeAccess,
          httpOnly: true,
        })
        .status(201)
        .json(userInDb);
      return;
    }
  } catch ({ message }) {
    res.json({ message });
  }
});

router.post("/sign-in", async (req, res) => {
  try {
    const { email, password } = req.body.data;

    const userInDb = await User.findOne({ where: { email } });
    if (!userInDb) {
      res.json({ message: "Такого юзера не существует или пароль неверный" });
      return;
    }
    const compare = await bcrypt.compare(password, userInDb.password);
    if (!compare) {
      res.json({ message: "Такого юзера не существует или пароль неверный" });
      return;
    }
    if (!email || !password) {
      res.json({ message: "Заполните все поля" });
      return;
    }
    const { accessToken, refreshToken } = generateTokens({
      user: { id: userInDb.id, email: userInDb.email, name: userInDb.name },
    });

    res
      .cookie(cookiesConfig.refresh, refreshToken, {
        maxAge: cookiesConfig.maxAgeRefresh,
        httpOnly: true,
      })
      .cookie(cookiesConfig.access, accessToken, {
        maxAge: cookiesConfig.maxAgeAccess,
        httpOnly: true,
      })
      .status(201)
      .json(userInDb);
  } catch ({ message }) {
    res.json({ message });
  }
});

router.get("/logout", (req, res) => {
  const { access } = req.cookies;

  if (access) {
    res.locals.user = {};
    res
      .clearCookie(cookiesConfig.refresh)
      .clearCookie(cookiesConfig.access)
      .json({ message: "success" })
  }
});

router.get("/check", async (req, res) => {
  if (res.locals.user) {
    const { user } = res.locals;
    const userInDb = await User.findOne({ where: { id: user?.id } });
    if (user && userInDb) {
      res.status(200).json({
        user: { id: user.id, email: user.email, name: user.name },
      });
    } else {
      res.status(400).json({ user: false });
    }
  }
});

module.exports = router;
