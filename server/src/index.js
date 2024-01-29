import express from 'express';
import cors from 'cors';
import config from './config.js';
import routes from './routes/routes.js';
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ type: ['application/json'] }));
app.use(cors())
app.use('/api', routes);

// app.use(errorHandler);

const port = config.SERVER_PORT;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
