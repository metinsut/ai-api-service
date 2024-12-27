import { Hono } from "hono";
import users from "./users/routes";

const api = new Hono();

api.route("/users", users);

export { api };
