const ejs = require('ejs');
const { htmlToText } = require('html-to-text');
const sgMail = require('@sendgrid/mail');

class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.firstName;
    this.url = url;
    this.from = `Clean Code <${process.env.EMAIL_FROM}>`;
  }

  //Send the actual email
  async send(template, subject, description) {
    sgMail.setApiKey(process.env.SENDGRID_PASSWORD);
    // 1) Render HTML based on a pug template
    const html = await ejs.renderFile(
      `${__dirname}/../views/email/${template}.ejs`,
      {
        firstName: this.firstName,
        url: this.url,
        subject,
        description,
      }
    );
    //2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: subject,
      html,
      text: htmlToText(html),
    };
    await sgMail.send(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to Clean Code!');
  }
}

module.exports = Email;
