<!-- Future Sight Dashboard Layout - SvelteKit Component Composition -->

<script lang="ts">
	import NextGame from '$lib/components/NextGame.svelte';
	import ScheduleGameForm from '$lib/components/ScheduleGameForm.svelte';
	import UpcomingGamesFeed from '$lib/components/UpcomingGamesFeed.svelte';
	import UserProfile from '$lib/components/UserProfile.svelte';
  
	import { user, upcomingGames, myGames } from '$lib/stores';
	let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  </script>
  
  <main class="min-h-screen bg-[#0c0f1c] text-white p-6">
	<!-- Header -->
	<header class="flex items-center justify-between mb-8">
	  <h1 class="text-2xl font-bold">Future Sight</h1>
	  <div class="text-sm text-gray-400">Timezone: {timezone}</div>
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
  </main>
  
  <style>
	main {
	  font-family: system-ui, sans-serif;
	}
  </style>
  