const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

const dirPath = `${__dirname}/dist`;

app.use(express.static(dirPath));

app.get('/login', (req, res) => {
  res.sendFile(`${dirPath}/index.html`);
})

app.get('/sign-up', (req, res) => {
  res.sendFile(`${dirPath}/index.html`);
})

app.get('/messenger', (req, res) => {
  res.sendFile(`${dirPath}/index.html`);
})

app.get('/settings', (req, res) => {
  res.sendFile(`${dirPath}/index.html`);
})

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});
