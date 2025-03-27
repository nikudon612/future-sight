<script lang="ts">
    let title = '';
    let datetime = '';
    let players = '';
    let notes = '';
    let ping = false;
  
    function scheduleGame() {
      // Hook up Supabase or backend logic here
      console.log({ title, datetime, players, notes, ping });
    }
  </script>
  
  <section class="bg-[#1a1e30] p-6 rounded-xl shadow mb-8">
    <h2 class="text-xl font-semibold mb-4">Schedule a Game</h2>
    <form class="grid gap-4" on:submit|preventDefault={scheduleGame}>
      <input bind:value={title} type="text" placeholder="Game Title" class="bg-gray-800 p-2 rounded" />
      <input bind:value={datetime} type="datetime-local" class="bg-gray-800 p-2 rounded" />
      <input bind:value={players} type="text" placeholder="Players (comma separated)" class="bg-gray-800 p-2 rounded" />
      <textarea bind:value={notes} placeholder="Notes (power level, theme, guests)" class="bg-gray-800 p-2 rounded"></textarea>
      <label class="flex items-center gap-2">
        <input type="checkbox" bind:checked={ping} /> Ping players in Discord
      </label>
      <button type="submit" class="px-4 py-2 bg-green-600 rounded">Create & Notify</button>
    </form>
  </section>
  