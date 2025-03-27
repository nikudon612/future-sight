<script lang="ts">
  export let user: {
    username: string;
    global_name?: string;
    avatar_url?: string;
    email?: string;
    timezone?: string;
  };
  export let timezone: string;
</script>

<section class="bg-white/10 p-6 rounded-xl shadow-md backdrop-blur-sm border border-white/10">
  <h2 class="text-xl font-semibold mb-4 text-white">My Profile</h2>

  <div class="flex items-center gap-4">
    {#if user.avatar_url}
      <img
        src={user.avatar_url}
        alt="User Avatar"
        class="w-16 h-16 rounded-full border-2 border-white/20 shadow"
      />
    {/if}
    <div>
      <p class="text-lg font-bold text-white">{user.global_name ?? user.username}</p>
      <p class="text-sm text-white/70">@{user.username}</p>
      <p class="text-xs text-white/50">{user.email}</p>
    </div>
  </div>

  <div class="mt-4 text-sm text-white/80">
    <p><strong>Timezone:</strong> {timezone}</p>
    <p><strong>RSVP Preferences:</strong> Coming soon…</p>
  </div>
</section>
