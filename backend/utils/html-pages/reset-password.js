import { config } from 'dotenv';
config();
const generateResetPasswordHtml = (token, email) => {
    const resetPasswordHtml = `
<!DOCTYPE html>
<html lang="en" ⚡4email>

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
        integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <title>Platform - reset password</title>
</head>

<body>

    <p>
    A request for resetting Platform password has been recievied. Please verify it's you. <br>
    ${process.env.FRONTEND_HOST_NAME}/account/reset-password/${token}
    </p>
   
      
</body>

</html>
`;

    return resetPasswordHtml;
};

export default generateResetPasswordHtml;
