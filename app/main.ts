import express from "express";
import { render } from "@react-email/components";
import { createElement, FunctionComponent } from "react";
// email templates
import NotionMagicLinkEmail from "./emails/notion-magic-link";
import PlaidVerifyIdentityEmail from "./emails/plaid-verify-identity";
import StripeWelcomeEmail from "./emails/stripe-welcome";
import VercelInviteUserEmail from "./emails/vercel-invite-user";

const TEMPLATES: Record<string, FunctionComponent | undefined> = {
    "notion-magic-link": NotionMagicLinkEmail,
    "plaid-verify-identity": PlaidVerifyIdentityEmail,
    "stripe-welcome": StripeWelcomeEmail,
    "vercel-invite-user": VercelInviteUserEmail,
};

// generate an express instance
const app = express().use(express.json());

// Route: index
app.get("/", async (req, res) => {
    res.json({
        message: "SUCCESS",
    });
});

// Route: render
app.post("/:template", async (req, res) => {
    // find the template
    const template = TEMPLATES[req.params.template];

    // not found error
    if (template == undefined) {
        res.status(404);
        res.json({
            message: "NOT_FOUND",
        });

        return;
    }

    // generate the component
    const component = createElement(template, req.body);

    // render
    res.json({
        message: "SUCCESS",
        body: {
            html: await render(component),
            text: await render(component, {
                plainText: true,
            }),
        },
    });
});

// listen
app.listen(3000, () => {
    console.log(`Listening on port ${3000}.`);
});
