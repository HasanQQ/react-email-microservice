import express from "express";
import templates from "../../app/templates";
import { render } from "@react-email/components";
import { createElement } from "react";
import { ZodError } from "zod";

const APP_PORT = 3000;

// express instance
const app = express();
app.use(express.urlencoded({ extended: true }));

// route: index
app.get("/", async (req, res) => {
    res.json({
        message: "SUCCESS",
    });
});

// route: render
app.post("/templates/:template/render", async (req, res, next) => {
    // target template
    const template = templates[req.params.template as keyof typeof templates];

    // when there no template for slug
    if (template == undefined) {
        res.json({
            message: "NOT_FOUND",
        }).status(404);

        return next();
    }

    // parse the body
    const props = (() => {
        try {
            return JSON.parse(req.body) as {};
        } catch (error) {
            return {};
        }
    })();

    // zod validation
    if (template.schema) {
        try {
            template.schema.parse(req.body);
            next();
        } catch (err) {
            if (err instanceof ZodError) {
                const errors: { [key: string]: string[] } = {};

                err.issues.map((e) => {
                    e.path.map((p) => {
                        if (!errors[p]) {
                            errors[p] = [];
                        }
                        errors[p].push(e.message);
                    });
                });

                res.status(422).json({
                    message: "The given data was invalid.",
                    errors: errors,
                });

                return;
            }
        }
    }

    // create an element from template & props
    const component = createElement(template.component, props);

    // render
    res.json({
        message: "SUCCESS",
        body: {
            html: await render(component),
            text: await render(component, {
                plainText: true,
            }),
        },
    }).status(200);

    return next();
});

// listen the given port
app.listen(APP_PORT, () => {
    console.log(`Listening on port ${APP_PORT}.`);
});
