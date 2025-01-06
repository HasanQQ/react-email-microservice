import { FunctionComponent } from "react";
import NotionMagicLinkEmail from "./emails/notion-magic-link";
import PlaidVerifyIdentityEmail from "./emails/plaid-verify-identity";
import StripeWelcomeEmail from "./emails/stripe-welcome";
import VercelInviteUserEmail from "./emails/vercel-invite-user";

export default {
    "notion-magic-link": NotionMagicLinkEmail,
    "plaid-verify-identity": PlaidVerifyIdentityEmail,
    "stripe-welcome": StripeWelcomeEmail,
    "vercel-invite-user": VercelInviteUserEmail,

    //
} as Record<string, FunctionComponent>;
