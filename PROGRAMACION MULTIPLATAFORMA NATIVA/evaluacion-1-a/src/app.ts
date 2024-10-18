import { envs } from "./config/envs";
import { MongoDB } from "./database/init";
import { AppRoutes } from "./routes/routes";
import { Server } from "./model/server";

(async () => {
    main();
})();

async function main() {

    await MongoDB.connect({
        mongoURI: envs.MONGO_URI,
        dbName: envs.MONGO_DB_NAME
    })

    const server = new Server({
        port: envs.PORT,
        routes: AppRoutes.routes
    })

    server.start();
}