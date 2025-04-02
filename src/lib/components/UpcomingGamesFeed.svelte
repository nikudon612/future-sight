<script lang="ts">
    export let games: {
      title: string;
      datetime: string;
      players: string[];
      notes?: string;
    }[];
  </script>
  
  <section class="bg-[#1a1e30] p-6 rounded-xl shadow mb-8">
    <h2 class="text-xl font-semibold mb-4">Upcoming Games</h2>
    <div class="space-y-4">
      {#each games as game}
        <div class="bg-[#2a2e45] p-4 rounded flex justify-between items-center">
          <div>
            <p class="text-lg font-medium">{game.title}</p>
            <p class="text-sm text-gray-400">{new Date(game.datetime).toLocaleString()} — {game.players.join(', ')}</p>
            {#if game.notes}
              <p class="text-sm text-gray-500 mt-1">{game.notes}</p>
            {/if}
          </div>
          <div>
            <button class="bg-blue-700 px-3 py-1 rounded">View</button>
          </div>
        </div>
      {/each}
    </div>
  </section>
  