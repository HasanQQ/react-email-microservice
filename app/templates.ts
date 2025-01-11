import { z } from "zod";
import { ComponentProps, FunctionComponent } from "react";
import * as NotionMagicLinkEmail from "./emails/notion-magic-link";
import * as PlaidVerifyIdentityEmail from "./emails/plaid-verify-identity";
import * as StripeWelcomeEmail from "./emails/stripe-welcome";
import * as VercelInviteUserEmail from "./emails/vercel-invite-user";

const templates = {
    "notion-magic-link": {
        schema: NotionMagicLinkEmail.schema,
        component: NotionMagicLinkEmail.default,
    },
    "plaid-verify-identity": {
        schema: PlaidVerifyIdentityEmail.schema,
        component: PlaidVerifyIdentityEmail.default,
    },
    "stripe-welcome": {
        component: StripeWelcomeEmail.default,
    },
    "vercel-invite-user": {
        schema: VercelInviteUserEmail.schema,
        component: VercelInviteUserEmail.default,
    },
};

type Templates = typeof templates;
type TemplateKeys = keyof Templates;

type TemplateObject<K extends TemplateKeys> = {
    schema?: z.ZodSchema;
    component: FunctionComponent<ComponentProps<Templates[K]["component"]>>;
};

export default templates as Record<TemplateKeys, TemplateObject<TemplateKeys>>;
