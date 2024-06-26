import nodemailer from 'nodemailer'

export const sendEmail = async ({to,subject,html})=>{
    /// sender
    const transporter = nodemailer.createTransport({
        host :'localhost',
        port :465,
        secure: true,
        service:'gmail',
        auth: {
            user: process.env.EMAIL,
            pass :process.env.EMAILPASS
        }

    })
    const emailInfo = await transporter.sendMail({
        from:`"our children" <${process.env.EMAIL}>`,
        to,
        subject,
        html
    })
    return emailInfo.accepted.length< 1 ? false : true
}