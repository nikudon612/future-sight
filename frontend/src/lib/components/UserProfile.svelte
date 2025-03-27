<script lang="ts">
    export let user: { username: string };
    export let timezone: string;
  </script>
  
  <section class="bg-[#1a1e30] p-6 rounded-xl shadow">
    <h2 class="text-xl font-semibold mb-4">My Profile</h2>
    <div class="space-y-2">
      <p><strong>User:</strong> {user.username}</p>
      <p><strong>Timezone:</strong> {timezone}</p>
      <p><strong>RSVP Preferences:</strong> Coming soon...</p>
    </div>
  </section>
  