import { authService } from '../api/auth/auth.service.js'

export async function requireAuth(req, res, next) {
  try {
    const token = req.cookies?.loginToken;
    if (!token) throw 'Missing login token';

    const user = authService.validateToken(token);
    if (!user) throw 'Invalid login token';

    req.loggedinUser = user; // 💡 Store user for next middleware/controller
    next();
  } catch (err) {
    console.error('Auth Middleware:', err);
    res.status(401).send('Unauthorized');
  }
}
