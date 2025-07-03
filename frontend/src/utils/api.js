// Utility to get backend base URI from environment
export const BASE_URI = import.meta.env.VITE_BACKEND_BASE_URI;

export function apiUrl(path) {
  // Ensure no double slashes
  return `${BASE_URI}${path.startsWith('/') ? '' : '/'}${path}`;
}

export function formatPKR(price) {
  if (typeof price !== 'number') return '';
  return 'PKR ' + Math.round(price).toLocaleString();
} 