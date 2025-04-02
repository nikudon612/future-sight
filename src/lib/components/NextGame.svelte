<script lang="ts">
    export let game: {
      title: string;
      datetime: string;
      players: string[];
      notes?: string;
    };
  </script>
  
  <section class="bg-[#1a1e30] p-6 rounded-xl shadow mb-8">
    <h2 class="text-xl font-semibold mb-2">Your Next Game</h2>
  
    <div class="space-y-1">
      <p class="text-lg font-medium">{game.title}</p>
      <p class="text-sm text-gray-400">
        {new Date(game.datetime).toLocaleString()} — {game.players.join(', ')}
      </p>
      {#if game.notes}
        <p class="text-sm text-gray-500">{game.notes}</p>
      {/if}
    </div>
  
    <div class="mt-4 flex gap-2">
      <button class="px-4 py-2 bg-blue-600 rounded">View Game</button>
      <button class="px-4 py-2 bg-gray-700 rounded">Edit RSVP</button>
    </div>
  </section>
  