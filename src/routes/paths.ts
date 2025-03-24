export const rootPaths = {
  root: '/',
  pagesRoot: 'pages',
  authRoot: 'authentication',
  errorRoot: 'error',
  dashboard: 'dashboard',
  recommendation: 'recommendations',
  message: 'messages',
};

export default {
  login: `/${rootPaths.authRoot}/login`,
  signup: `/${rootPaths.authRoot}/sign-up`,
  dashboard: `/${rootPaths.dashboard}`,
  recommendation: `/${rootPaths.recommendation}`,
  messages: `/${rootPaths.message}`,
};
