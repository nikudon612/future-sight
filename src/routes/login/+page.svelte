<script lang="ts">
    import { supabase } from '$lib/supabaseClient';
  
    async function loginWithDiscord() {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'discord',
        options: {
          redirectTo: 'http://localhost:5173/callback' // or your production domain
        }
      });
  
      if (error) {
        console.error('Error during login:', error);
      }
    }
  </script>
  
  <button on:click={loginWithDiscord}>
    Sign in with Discord
  </button>