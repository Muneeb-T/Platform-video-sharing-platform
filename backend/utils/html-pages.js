const forgotPasswordHtml = `<form class="card mt-4">
<div class="card-body">
  <div class="form-group">
    <label for="email-for-pass">Enter your email address</label>
    <input class="form-control" type="text" id="email-for-pass" required=""><small class="form-text text-muted">Enter the email address you used during the registration on BBBootstrap.com. Then we'll email a link to this address.</small>
  </div>
</div>
<div class="card-footer">
  <button class="btn btn-success" type="submit">Get New Password</button>
  <button class="btn btn-danger" type="submit">Back to Login</button>
</div>
</form>`;

export { forgotPasswordHtml };
