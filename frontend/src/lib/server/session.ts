import { parse } from 'cookie';

export function getSession(request: Request) {
	const cookieHeader = request.headers.get('cookie') || '';
	const cookies = parse(cookieHeader);
	const session = cookies.session ? JSON.parse(cookies.session) : null;
	return session;
}
