<script lang="ts">
  export let user:
    | {
        user_metadata: {
          avatar_url?: string;
          full_name?: string;
        };
        email?: string;
        timezone?: string;
      }
    | undefined;

  export let timezone: string;

  const avatar = user?.user_metadata?.avatar_url;
  const displayName = user?.user_metadata?.full_name ?? 'Mystery Mage';
  const email = user?.email ?? 'No email provided';
</script>

<section class="bg-white/10 p-6 rounded-xl shadow-md backdrop-blur-sm border border-white/10">
  <h2 class="text-xl font-semibold mb-4 text-white">My Profile</h2>

  {#if user}
    <div class="flex items-center gap-4">
      {#if avatar}
        <img
          src={avatar}
          alt="User Avatar"
          class="w-16 h-16 rounded-full border-2 border-white/20 shadow"
        />
      {:else}
        <div class="w-16 h-16 rounded-full bg-white/10 border-2 border-white/20 shadow flex items-center justify-center">
          <span class="text-3xl text-white">👤</span>
        </div>
      {/if}

      <div>
        <p class="text-lg font-bold text-white">{displayName}</p>
        <p class="text-sm text-white/70">{email}</p>
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
