import { Router } from "express";

const routes = Router()
export const HelloRoutes = () => {

    routes.get('/', (req, res) => {
            res.send('Hello World');
        });


    return routes
}