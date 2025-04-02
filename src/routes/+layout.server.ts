// // src/routes/+layout.server.ts
// import type { LayoutServerLoad } from './$types';

// export const load: LayoutServerLoad = async ({ locals }) => {
//   // Validate the session
//   const session = await locals.auth.validate();
  
//   if (session) {
//     // Return the user if session exists
//     return {
//       user: session.user
//     };
//   }
  
//   // Return null if no session
//   return {
//     user: null
//   };
// };