const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User, Party, Access_Table } = require("../../db/models");
const generateTokens = require("../../utils/authUtils");
const cookiesConfig = require("../../config/cookiesConfig");

router.get("/allUsers", async (req, res) => {
  try {
    const users = await User.count();
    res.json(users);
  } catch ({ message }) {
    res.json({ message: "Error while reading users" });
  }
});

router.post("/sign-up", async (req, res) => {
  try {
    const { name, email, password } = req.body.data;
    let userInDb = await User.findOne({ where: { email } });
    if (!name || !email || !password) {
      res.json({ message: "Заполните все поля" });
      return;
    }
    if (userInDb) {
      res.json({ message: "Такой емейл уже занят" });
      return;
    }
    const hash = await bcrypt.hash(password, 10);
    userInDb = await User.create({ name, email, password: hash, mode: "user" });

    if (userInDb) {
      const { accessToken, refreshToken } = generateTokens({
        user: {
          id: userInDb.id,
          email: userInDb.email,
          name: userInDb.name,
          password: userInDb.password,
          image: userInDb.image,
        },
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
    const userInDb = await User.findOne({
      where: { email },
    });
    if (!userInDb) {
      res.json({ message: "Такого пользователя не существует или пароль неверный" });
      return;
    }
    const compare = await bcrypt.compare(password, userInDb.password);
    if (!compare) {
      res.json({ message: "Такого пользователя не существует или пароль неверный" });
      return;
    }
    if (!email || !password) {
      res.json({ message: "Заполните все поля" });
      return;
    }
    const { accessToken, refreshToken } = generateTokens({
      user: {
        id: userInDb.id,
        email: userInDb.email,
        name: userInDb.name,
        password: userInDb.password,
        image: userInDb.image,
      },
    });
    // await Party.create({
    //   category: "ресторан",
    //   title: "Хачапури и вино",
    //   description: "вкусно",
    //   image: "https://www.arenahall.info/upload/iblock/387/mbpd193z3yp9plzqqhp3wl1txxgmk7tv.jpg",
    //   date: "always",
    //   time: "18:00"
    // });
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
      .json({ message: "success" });
  }
});

router.get("/check", async (req, res) => {
  if (res.locals.user) {
    const { user } = res.locals;
    const userInDb = await User.findOne({ where: { id: user?.id } });
    if (user && userInDb) {
      res.status(200).json({
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          password: user.password,
          image: user.image,
        },
      });
    } else {
      res.status(400).json({ user: false });
    }
  }
});

router.get("/allusers", async (req, res) => {
  try {
    const users = await User.count();
    res.json({ users });
  } catch ({ message }) {
    console.log(message);
  }
});

router.put("/changePhoto", async (req, res) => {
  try {
    const { data } = req.body;

    await User.update({ image: data }, { where: { id: 7 } });
    const user = await User.findOne({ where: { id: 7 } });
    res.json(user);
  } catch ({ message }) {
    console.log(message);
  }
});

module.exports = router;
