import mailjet from 'node-mailjet';
import { Config } from "../configs/Config.js";
import { OTPGenerationException } from "./Exceptions/auth.exception.js";

const mailjetClient = mailjet.apiConnect(Config.MAILJET_API_KEY, Config.MAILJET_API_SECRET);

export const sendOTPEmail = async (user, OTP) => {
    const request = mailjetClient.post('send', { version: 'v3.1' }).request({
        Messages: [
            {
                From: {
                    Email: Config.MAILJET_SENDER,
                    Name: 'Irish-clobber',
                },
                To: [
                    {
                        Email: user.email_address,
                        Name: user.full_name,
                    },
                ],
                Subject: 'Password Reset OTP',
                TextPart: `Your OTP for password reset is: ${OTP}`,
                HTMLPart: `<h3>Dear ${user.full_name},</h3><br/><p>Your OTP for password reset is <strong>${OTP}</strong></p>`,
            },
        ]
    });

    try {
        await request;
    } catch (err) {
        console.log(err);
        throw new OTPGenerationException(err.message);
    }
}
