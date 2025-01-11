import { z } from "zod";
import asset from "@/utils/asset";
import {
    Body,
    Button,
    Container,
    Column,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Row,
    Section,
    Text,
    Tailwind,
} from "@react-email/components";

export const schema = z.object({
    username: z.string(),
    userImage: z.string(),
    invitedByUsername: z.string(),
    invitedByEmail: z.string().min(10).email(),
    teamName: z.string(),
    teamImage: z.string(),
    inviteLink: z.string(),
    inviteFromIp: z.string(),
    inviteFromLocation: z.string(),
});

type VercelInviteUserEmailProps = z.infer<typeof schema>;

const assets = {
    logo: asset("/static/vercel-logo.png"),
    arrow: "/static/vercel-arrow.png",
    userImage: "/static/vercel-user.png",
    teamImage: "/static/vercel-team.png",
};

const VercelInviteUserEmail = ({
    username,
    userImage,
    invitedByUsername,
    invitedByEmail,
    teamName,
    teamImage,
    inviteLink,
    inviteFromIp,
    inviteFromLocation,
}: VercelInviteUserEmailProps) => {
    const previewText = `Join ${invitedByUsername} on Vercel`;

    return (
        <Html>
            <Head />
            <Preview>{previewText}</Preview>
            <Tailwind>
                <Body className="bg-white my-auto mx-auto font-sans px-2">
                    <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
                        <Section className="mt-[32px]">
                            <Img src={assets.logo} width="40" height="37" alt="Vercel" className="my-0 mx-auto" />
                        </Section>
                        <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                            Join <strong>{teamName}</strong> on <strong>Vercel</strong>
                        </Heading>
                        <Text className="text-black text-[14px] leading-[24px]">Hello {username},</Text>
                        <Text className="text-black text-[14px] leading-[24px]">
                            <strong>{invitedByUsername}</strong> (
                            <Link href={`mailto:${invitedByEmail}`} className="text-blue-600 no-underline">
                                {invitedByEmail}
                            </Link>
                            ) has invited you to the <strong>{teamName}</strong> team on <strong>Vercel</strong>.
                        </Text>
                        <Section>
                            <Row>
                                <Column align="right">
                                    <Img className="rounded-full" src={userImage} width="64" height="64" />
                                </Column>
                                <Column align="center">
                                    <Img src={assets.arrow} width="12" height="9" alt="invited you to" />
                                </Column>
                                <Column align="left">
                                    <Img className="rounded-full" src={teamImage} width="64" height="64" />
                                </Column>
                            </Row>
                        </Section>
                        <Section className="text-center mt-[32px] mb-[32px]">
                            <Button
                                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                                href={inviteLink}
                            >
                                Join the team
                            </Button>
                        </Section>
                        <Text className="text-black text-[14px] leading-[24px]">
                            or copy and paste this URL into your browser:{" "}
                            <Link href={inviteLink} className="text-blue-600 no-underline">
                                {inviteLink}
                            </Link>
                        </Text>
                        <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
                        <Text className="text-[#666666] text-[12px] leading-[24px]">
                            This invitation was intended for <span className="text-black">{username}</span>. This invite
                            was sent from <span className="text-black">{inviteFromIp}</span> located in{" "}
                            <span className="text-black">{inviteFromLocation}</span>. If you were not expecting this
                            invitation, you can ignore this email. If you are concerned about your account's safety,
                            please reply to this email to get in touch with us.
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

VercelInviteUserEmail.PreviewProps = {
    username: "alanturing",
    userImage: assets.userImage,
    invitedByUsername: "Alan",
    invitedByEmail: "alan.turing@example.com",
    teamName: "Enigma",
    teamImage: assets.teamImage,
    inviteLink: "https://vercel.com/teams/invite/foo",
    inviteFromIp: "204.13.186.218",
    inviteFromLocation: "São Paulo, Brazil",
} as VercelInviteUserEmailProps;

export default VercelInviteUserEmail;
