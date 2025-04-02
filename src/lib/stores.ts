// src/lib/stores.ts
import { writable } from 'svelte/store';

// Simulated logged-in user (replace with real auth later)
export const user = writable({
  username: 'niku'
});

// Example upcoming games
export const upcomingGames = writable([
  {
    title: 'Friday Night Commander',
    datetime: new Date().toISOString(),
    players: ['niku', 'travis', 'ike', 'd'],
    notes: 'Brackets 2-3. Bring precons only.'
  }
]);

// Example for 'your next game'
export const myGames = writable([
  {
    title: 'Friday Night Commander',
    datetime: new Date().toISOString(),
    players: ['niku', 'travis', 'ike', 'd'],
    notes: 'Brackets 2-3. Bring precons only.'
  }
]);
