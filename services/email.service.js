const sendMail  = require('../utils/sendMail');

exports.sendWelcomeEmail = async (to,password,companyName)=>{
    const subject = `welcome to ${companyName} Your account Details` ;
    const text = `Hello,
    You have been added to ${companyName} on our Task Management System.
   Here are your login credentials:

  Email    : ${to}
  Password : ${password}

Please log in and change your password as soon as possible.

Regards,
${companyName} Team`;

  await sendMail(to, subject, text);
};