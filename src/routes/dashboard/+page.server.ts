// // src/routes/dashboard/+page.server.ts
// import type { PageServerLoad } from './$types';
// import { redirect } from '@sveltejs/kit';

// export const load: PageServerLoad = async ({ locals, parent }) => {
//   // Get parent data (including user from layout)
//   const parentData = await parent();
  
//   // If no user, redirect to login
//   if (!parentData.user) {
//     throw redirect(302, '/login');
//   }
  
//   // Get additional user data if needed
//   // const userData = await db.user.findUnique({
//   //   where: { id: parentData.user.userId }
//   // });
  
//   return {
//     user: parentData.user
//     // Or return enhanced user data:
//     // user: userData
//   };
// };