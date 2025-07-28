// // mailer.js
// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';
// dotenv.config();

// export async function envoyerEmailVerification(toEmail, token) {
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   const verificationUrl = `http://localhost:3000/verify-email?token=${token}`;

//   const mailOptions = {
//     from: `"NutriForm" <${process.env.EMAIL_USER}>`,
//     to: toEmail,
//     subject: 'Vérifie ton adresse e-mail',
//     html: `
//       <p>Bienvenue ! Merci de t’inscrire sur NutriForm.</p>
//       <p>Pour activer ton compte, clique sur le lien suivant :</p>
//       <a href="${verificationUrl}">${verificationUrl}</a>
//       <p>Si tu n’as pas demandé cette inscription, ignore cet e-mail.</p>
//     `,
//   };

//   try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log("E-mail envoyé :", info.response);
//   } catch (err) {
//     console.error("Erreur lors de l'envoi de l'e-mail :", err);
//     throw err;
//   }
// }
