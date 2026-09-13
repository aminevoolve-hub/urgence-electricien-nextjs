'use client';

import { useEffect, useState } from 'react';

export function useGoogleDrive() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check for access token in URL (after OAuth redirect)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const token = params.get('access_token');

    if (token) {
      setAccessToken(token);
      localStorage.setItem('google_access_token', token);
      // Clean up URL
      window.history.replaceState({}, '', window.location.pathname);
    } else {
      // Try to restore from localStorage
      const saved = localStorage.getItem('google_access_token');
      if (saved) setAccessToken(saved);
    }
  }, []);

  const authenticate = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/api/auth/google';
    }
  };

  const fetchFiles = async () => {
    if (!accessToken) {
      setError('Not authenticated');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/drive/files', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch files');
      }

      const data = await response.json();
      setFiles(data.files || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching files');
      setFiles([]);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setAccessToken(null);
    localStorage.removeItem('google_access_token');
    setFiles([]);
  };

  return {
    accessToken,
    files,
    loading,
    error,
    authenticate,
    fetchFiles,
    logout,
    isAuthenticated: !!accessToken,
  };
}
