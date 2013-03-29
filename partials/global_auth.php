<script type="text/template" id="login">
	<h1>Login</h1>
	<form method="post" name="user_login" id="user_login">
		<p>
			<label>Email</label>
			<input type="text" name="email" id="login_email" placeholder="you@email.com" autocorrect="off" value=""><br>
			<span id="login_email_error"></span>			
		</p>
		<p>
			<label>Password</label>
			<input type="password" name="password" id="login_password" placeholder="********" autocorrect="off" value=""><br>
			<span id="login_password_error"></span>			
		</p>
		<p>
			<a href="#/forgot_password">Forgot your password?</a>
		</p>
		<p>
			<input type="button" name="submit" id="button_login" value="Login">
	  	</p>
	</form>
</script>

<script type="text/template" id="signup">
	<h1>Signup</h1>
	<form method="post" name="user_signup" id="user_signup">
		<p>
			<label>Name</label>
			<input type="text" name="name" id="signup_name" placeholder="Joe Smith" autocorrect="off" value=""><br>
			<span id="signup_name_error"></span>
		</p>
		<p>
			<label>Email</label>
			<input type="text" name="email" id="signup_email" placeholder="your@email.com" autocorrect="off" value=""><br>
			<span id="signup_email_error"></span>
		</p>
		<p>
			<label>Phone (optional for reminders)</label>
			<input type="text" name="phone_number" id="profile_phone" placeholder="503-111-2222" value="<?= $this->session->userdata('phone') ?>">
		</p>		
		<p>
			<label>Password</label>
			<input type="password" name="password" id="signup_password" placeholder="********" autocorrect="off" value=""><br>
			<span id="signup_password_error"></span>
		</p>
		<p>
			<label>Language</lable>
			<?= form_dropdown('language', config_item('languages'), 'en') ?>
		</p>
		<p>
			<input type="button" name="submit" id="button_signup" value="Signup">
		</p>
	</form>
</script>

<script type="text/template" id="logout">
	<h1>Thanks :)</h1>
	<h3>You are now logged out</h3>
</script>

<script type="text/template" id="forgot_password">
	<h1>Forgot Password</h1>
	<p>Please enter your email address</p>
	<form name="user_forgot_password" id="user_forgot_password">
		<p>
			<input type="text" name="email" id="forgot_email" placeholder="you@email.com" value="">
		  	<span id="forgot_email_error"></span>
		</p>
		<p id="email_error"></p>
		<p><input type="button" name="submit" id="button_forgot_password" value="Reset Password" /></p>
	</form>
</script>
