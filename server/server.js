const express = require('express');
const app = express();
const serverConfig = require('./config/serverConfig');
const PORT = process.env.PORT || 3001;

const indexRouter = require('./routes/index.routes');

serverConfig(app);
app.use('/', indexRouter);

app.listen(PORT, () => {
  console.log(`Этот сервер умирает на ${PORT} порту`);
});
