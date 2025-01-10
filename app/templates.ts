import { z } from "zod";
import { ComponentProps, FunctionComponent } from "react";
import * as NotionMagicLinkEmail from "./emails/notion-magic-link";
import * as PlaidVerifyIdentityEmail from "./emails/plaid-verify-identity";
import * as StripeWelcomeEmail from "./emails/stripe-welcome";
import * as VercelInviteUserEmail from "./emails/vercel-invite-user";

const templates = {
    "notion-magic-link": {
        component: NotionMagicLinkEmail.default,
        schema: NotionMagicLinkEmail.schema,
    },
    "plaid-verify-identity": {
        component: PlaidVerifyIdentityEmail.default,
        schema: PlaidVerifyIdentityEmail.schema,
    },
    "stripe-welcome": {
        component: StripeWelcomeEmail.default,
    },
    "vercel-invite-user": {
        component: VercelInviteUserEmail.default,
        schema: VercelInviteUserEmail.schema,
    },
};

type Templates = typeof templates;
type TemplateKeys = keyof Templates;

type TemplateObject<K extends TemplateKeys> = {
    component: FunctionComponent<ComponentProps<Templates[K]["component"]>>;
    schema?: z.ZodSchema;
};

export default templates as Record<TemplateKeys, TemplateObject<TemplateKeys>>;
