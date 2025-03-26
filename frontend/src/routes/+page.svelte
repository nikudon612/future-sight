<script>
  export let data;
</script>

<div class="page-container">
  <div class="container">
    <!-- <img src="/logo.png" alt="Time Spiral Scheduler" class="logo" /> -->

    <h1>Time Spiral Scheduler</h1>

    <p>Effortless Scheduling for Magic: The Gathering Commander Nights</p>

    <a href="/login" class="login-btn">Login with Discord</a>
  </div>

  <footer>© {new Date().getFullYear()} Time Spiral Scheduler</footer>
</div>

<style>
  .page-container {
    height: 100vh;
    font-family: Arial, sans-serif;
    color: #ffffff;
    background: linear-gradient(135deg, #240046, #560bad, #480ca8, #7209b7);
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
  }

  .logo {
    width: 120px;
    height: 120px;
    margin-bottom: 20px;
  }

  h1 {
    font-size: 3rem;
    margin-bottom: 15px;
  }

  p {
    font-size: 1.2rem;
    color: #e0e0e0;
    margin-bottom: 30px;
  }

  .login-btn {
    background-color: #ff9900;
    color: #121212;
    padding: 12px 24px;
    border-radius: 25px;
    text-decoration: none;
    font-weight: bold;
    transition: background-color 0.3s ease;
  }

  .login-btn:hover {
    background-color: #e68a00;
  }

  footer {
    position: absolute;
    bottom: 15px;
    color: #cccccc;
    font-size: 0.8rem;
  }
</style>
