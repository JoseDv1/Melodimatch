<div class="login">
	<h2>Log in</h2>
	<form class="login_form">
		<div class="email">
			<label for="email">Email</label>
			<input type="email" name="email" autocomplete="off" />
		</div>
		<div class="password">
			<label for="password">Password</label>
			<input type="password" name="password" autocomplete="off" />
		</div>
		<button
			on:click={(e) => {
				e.preventDefault();
			}}>Log in</button
		>
	</form>
</div>

<style>
	.login {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
	}

	.login > h2 {
		align-self: flex-start;
	}

	.login .login_form {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 1rem;
		width: 100%;
	}

	.login .login_form div {
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100%;
	}

	.login .login_form label {
		margin: 0.5rem 0;
	}

	.login .login_form input {
		padding: 0.5rem;
		border: 1px solid #ccc;
		border-radius: 5px;
	}

	.login .login_form button {
		padding: 0.5rem;
		border: none;
		border-radius: 5px;
		background: #000;
		color: #fff;
		cursor: pointer;
	}
</style>
