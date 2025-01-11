import express from "express";
import templates from "../../app/templates";
import { render } from "@react-email/components";
import { createElement } from "react";

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
    // target template
    const template = templates[req.params.template];

    // when there no template for slug
    if (template == undefined) {
        res.json({
            message: "NOT_FOUND",
        }).status(404);

        return next();
    }

    // get thw props from req
    const props = req.body as {};

    // create an element from template & props
    const component = createElement(template, props);

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
