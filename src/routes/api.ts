import { Hono } from "hono";
import users from "@routes/users/routes";

const api = new Hono();

api.route("/users", users);

export { api };
