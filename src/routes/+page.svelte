<script>
	export let data;
	import '../app.css';
</script>

<div class="page-container text-white p-4 mt-4 rounded-lg shadow-lg">
	<div class="container">
		<div class="logo">🔮</div>

		<h1>Future Sight Scheduler</h1>
		<div class="tagline-block">
			<div class="tagline-top">Plan Ahead. Play More.</div>
			<div class="tagline-bottom">
				The ultimate MTG Commander scheduling tool for your pod — built for smooth sessions and
				seamless reminders.
			</div>
		</div>
		<a href="/login" class="login-btn">Login with Discord</a>
	</div>
	<footer>© {new Date().getFullYear()} Future Sight Scheduler</footer>
</div>

<style>
	.page-container {
		height: 100vh;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		color: #ffffff;
		background-color: #7dbde9;
		background-image:
			url('https://www.transparenttextures.com/patterns/white-wall.png'),
			linear-gradient(135deg, #c3efff 0%, #69a8e3 40%, #2f4da1 100%);
		background-blend-mode: overlay;
		background-size: cover;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		position: relative;
		margin: 0;
		padding: 0;
	}

	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 0 2rem;
	}

	.logo {
		font-size: 4rem;
		margin-bottom: 20px;
		filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.5));
	}

	h1 {
		font-size: 3rem;
		margin-bottom: 10px;
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
	}

	.tagline-block {
		line-height: 1.4;
		margin-bottom: 30px;
		color: #e0ecf7;
		max-width: 480px;
	}

	.tagline-top {
		font-size: 1.5rem;
		font-weight: 500;
	}

	.tagline-bottom {
		font-size: 1.1rem;
		font-weight: 400;
		margin-top: -4px; /* closes any spacing */
	}

	.login-btn {
		background-color: #00f5d4;
		color: #121212;
		padding: 12px 24px;
		border-radius: 25px;
		text-decoration: none;
		font-weight: bold;
		transition: background-color 0.3s ease;
		box-shadow: 0 0 10px rgba(0, 245, 212, 0.4);
	}

	.login-btn:hover {
		background-color: #06d6a0;
	}

	footer {
		position: absolute;
		bottom: 15px;
		color: #d8eaff;
		font-size: 0.8rem;
	}
</style>
