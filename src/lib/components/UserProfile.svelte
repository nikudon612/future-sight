<script lang="ts">
    export let user: {
      username: string;
      globalName?: string;
      avatar?: string;
      email?: string;
      timezone?: string;
    } | undefined;  // Add undefined as a possible type
    export let timezone: string;
  </script>
  
  <section class="bg-white/10 p-6 rounded-xl shadow-md backdrop-blur-sm border border-white/10">
    <h2 class="text-xl font-semibold mb-4 text-white">My Profile</h2>
  
    {#if user}
      <div class="flex items-center gap-4">
        {#if user.avatar}
          <img
            src={user.avatar}
            alt="User Avatar"
            class="w-16 h-16 rounded-full border-2 border-white/20 shadow"
          />
        {:else}
          <div class="w-16 h-16 rounded-full bg-white/10 border-2 border-white/20 shadow flex items-center justify-center">
            <span class="text-3xl text-white">👤</span>
          </div>
        {/if}
        <div>
          <p class="text-lg font-bold text-white">{user.globalName ?? user.username}</p>
          <p class="text-sm text-white/70">@{user.username}</p>
          <p class="text-xs text-white/50">{user.email ?? 'No email provided'}</p>
        </div>
      </div>
  
      <div class="mt-4 text-sm text-white/80">
        <p><strong>Timezone:</strong> {timezone}</p>
        <p><strong>RSVP Preferences:</strong> Coming soon…</p>
      </div>
    {:else}
      <div class="text-white text-center py-4">
        <div class="w-16 h-16 rounded-full bg-white/10 border-2 border-white/20 shadow flex items-center justify-center mx-auto mb-3">
          <span class="text-3xl text-white">👤</span>
        </div>
        <p>User profile is loading...</p>
      </div>
    {/if}
  </section>