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
    <form class="card mt-4" method="post" action="${process.env.ROOT_URL}/api/account/reset-password-callback/${token}">
        <div class="card-body">
            <div class="form-group">
                <label for="new-password">Enter new Password</label>
                <input class="form-control" name="password" type="password" id="new-password" required>
            </div>
            <span id="message1" style="color:red"></span>
            <br>
            <div class="form-group">
                <label for="confirm-password">Confirm password</label>
                <input class="form-control" type="password" name="confirm-password" id="confirm-password" required>
            </div>
            <span id="message2" style="color:red"></span>
        </div>
        <h5>
            Password must contain :-<br>
            At least one upper case <br>
            At least one lower case <br>
            At least one digit <br>
            At least one special character <br>
            Minimum eight characters. <br>
        </h5>
        <hr>
        <div class="card-footer">
            <button class="btn btn-success" type="submit">Reset password</button>
        </div>
    </form>
    <script>
        function validateForm() {

            const password1 = document.getElementById("new-password").value;
            var password2 = document.getElementById("confirm-password").value;
            if (password1 === "") {
                document.getElementById("message1").innerHTML = "**Fill the password please!";
                return false;
            }


            if (password2 === "") {
                document.getElementById("message2").innerHTML = "**Enter the password please!";
                return false;
            }

            if (password1.length < 8) {
                document.getElementById("message1").innerHTML = "**Password length must be atleast 8 characters";
                return false;
            }


            if (password1.length > 16) {
                document.getElementById("message1").innerHTML = "**Password length must not exceed 15 characters";
                return false;
            }

            if (password1 !== password2) {
                document.getElementById("message2").innerHTML = "**Passwords are not same";
                return false;
            }
        }  
    </script>
</body>

</html>
`;

    return resetPasswordHtml;
};

export default generateResetPasswordHtml;
