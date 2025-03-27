<!-- Future Sight Dashboard Layout - Styled for Homepage Consistency -->

<script lang="ts">
	import NextGame from '$lib/components/NextGame.svelte';
	import ScheduleGameForm from '$lib/components/ScheduleGameForm.svelte';
	import UpcomingGamesFeed from '$lib/components/UpcomingGamesFeed.svelte';
	import UserProfile from '$lib/components/UserProfile.svelte';
  
	import { user, upcomingGames, myGames } from '$lib/stores';
	let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  </script>
  
  <main class="min-h-screen text-white bg-gradient-to-br from-[#c3efff] via-[#69a8e3] to-[#2f4da1] bg-fixed bg-cover bg-blend-overlay p-6 font-sans">
	<div class="max-w-4xl mx-auto space-y-10">
	  <!-- Header -->
	  <header class="flex items-center justify-between">
		<h1 class="text-3xl font-bold drop-shadow">🔮 Future Sight</h1>
		<div class="text-sm text-white/80">Timezone: {timezone}</div>
	  </header>
  
	  <!-- Next Game Widget -->
	  {#if myGames.length > 0}
		<NextGame game={myGames[0]} />
	  {/if}
  
	  <!-- Schedule a Game -->
	  <ScheduleGameForm />
  
	  <!-- Upcoming Games Feed -->
	  <UpcomingGamesFeed games={upcomingGames} />
  
	  <!-- My Profile -->
	  <UserProfile {user} {timezone} />
  
	  <footer class="text-center text-white/60 text-sm pt-10">
		© {new Date().getFullYear()} Future Sight Scheduler
	  </footer>
	</div>
  </main>
  
  <style>
	main {
	  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	  background-image: url('https://www.transparenttextures.com/patterns/white-wall.png'), linear-gradient(135deg, #c3efff 0%, #69a8e3 40%, #2f4da1 100%);
	  background-blend-mode: overlay;
	  background-size: cover;
	}
  </style>
  