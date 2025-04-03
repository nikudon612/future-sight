<script lang="ts">
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabaseClient';
  import { goto } from '$app/navigation';

  onMount(async () => {
    console.log('🔁 We are in /callback!');
    console.log('Current location:', window.location.href);

    await new Promise((r) => setTimeout(r, 300)); // wait for hydration

    const { data: { session }, error } = await supabase.auth.getSession();

    if (error) {
      console.error('Error getting session:', error);
    } else if (session) {
      console.log('✅ Session retrieved:', session);
      goto('/dashboard');
    } else {
      console.warn('⛔ No session found');
    }
  });
</script>

<p>Logging you in...</p>
