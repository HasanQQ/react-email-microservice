import express from "express";
import templates from "../../app/templates";
import { render } from "@react-email/components";
import { createElement } from "react";
import { ZodError } from "zod";

const APP_PORT = 3000;

// express instance
const app = express().use(express.json());

// route: index
app.get("/", async (req, res) => {
    res.json({
        message: "SUCCESS",
    });
});

// route: render
app.post("/templates/:template/render", async (req, res, next) => {
    // get slug from request
    const target = req.params.template as keyof typeof templates;

    // when there no template for slug
    if (!Object.hasOwn(templates, target)) {
        res.status(404).json({
            message: "NOT_FOUND",
        });

        return next();
    }

    // target template
    const template = templates[target];

    // get the props from req
    const props = req.body as {};

    // zod validation
    if (template.schema) {
        try {
            template.schema.parse(props);

            //
        } catch (err) {
            // if its another kind of error (?)
            if (!(err instanceof ZodError)) {
                res.status(500).json({
                    message: "UNKNOWN_ERROR",
                });

                return next();
            }

            // bag for error
            const errors: { [key: string]: string[] } = {};

            // map the issues
            err.issues.map((issue) =>
                issue.path.map((path) => {
                    errors[path] = errors[path] || [];
                    errors[path].push(issue.message);
                })
            );

            res.status(422).json({
                message: "INVALID_PAYLOAD",
                errors: errors,
            });

            return next();
        }
    }

    // create an element from template & props
    const component = createElement(template.component, props);

    // render
    res.status(200).json({
        message: "SUCCESS",
        body: {
            html: await render(component),
            text: await render(component, {
                plainText: true,
            }),
        },
    });

    return next();
});

// listen the given port
app.listen(APP_PORT, () => {
    console.log(`Listening on port ${APP_PORT}.`);
});
