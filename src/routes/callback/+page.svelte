<script lang="ts">
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabaseClient';
  import { goto } from '$app/navigation';

  onMount(async () => {
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error) {
      console.error('Error retrieving session:', error);
    } else if (session) {
      console.log('Session:', session);
      goto('/dashboard'); // or wherever you want
    } else {
      console.warn('No session found');
    }
  });
</script>

<p>Logging you in...</p>
