import express, { Application } from "express";
import mongoose from "mongoose";
import compression from "compression";
import session from "express-session";
import cors from "cors";
import morgan from "morgan";
import Controller from "@/utils/interfaces/controller.interface";
import ErrorMiddleware from "@/middleware/error.middleware";
import helmet from "helmet";
import config from "@/core/config";
import SecurityMiddleware from "@/middleware/security.middleware";

class App {
    private readonly express: Application;
    private readonly port: number;

    constructor(controllers: Controller[], port: number) {
        this.express = express();
        this.port = port;

        this.initDatabaseConnection();
        this.initMiddleware();
        this.initControllers(controllers);
        this.initErrorHandling();
    }

    private initDatabaseConnection(): void {
        const {
            database: { name, user, password, db_url },
        } = config;
        mongoose
            .connect(`mongodb+srv://${user}:${password}@${db_url}/${name}`)
            .then(() => {
                console.log("Database Connection Established");
                this.listen();
            });
    }

    private initMiddleware(): void {
        this.express.use(cors({ credentials: true }));
        this.express.use(helmet());
        this.express.use(morgan("dev"));
        this.express.use(express.json({ limit: "20kb" }));
        this.express.use(
            session({
                secret: "random-secret",
                cookie: { httpOnly: true, secure: true },
            })
        );
        this.express.use(express.urlencoded({ extended: false }));
        this.express.use(compression());
        this.express.use("/api", SecurityMiddleware.rateLimiter);
    }

    private initControllers(controllers: Controller[]): void {
        for (const controller of controllers) {
            this.express.use("/api", controller.router);
        }
    }

    private initErrorHandling(): void {
        this.express.use(ErrorMiddleware);
    }

    public listen(): void {
        this.express.listen(this.port, () => {
            console.log(`App listening on port ${this.port}`);
        });
    }
}

export default App;
