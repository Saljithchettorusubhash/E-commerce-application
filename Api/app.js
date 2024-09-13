import { Config } from './configs/Config.js';
import { DatabaseLoader } from './loaders/database.loader.js';
import { ExpressLoader } from './loaders/express.loader.js';
import { RoutesLoader } from './loaders/route.loader.js';
import {MiddlewareLoader} from './loaders/middleware.loader.js'

const app = ExpressLoader.init();

const prisma = DatabaseLoader.init();

const version = "v1";
RoutesLoader.initRoutes(app,version);
MiddlewareLoader.init(app);

const port = Number(Config.PORT);
app.listen(port,()=> console.log(
    `server running on port ${port}`

))
export {app,prisma};


