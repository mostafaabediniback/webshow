import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
export default defineConfig([
  ...nextVitals,
  globalIgnores(['.next/**', 'node_modules/**', 'reports/**', 'public/sw.js', 'scripts/migrate.mjs', 'scripts/adapt.mjs']),
  { rules: { 'no-undef': 'error', 'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^[A-Z_]' }],
    // The backend controls media hosts; keep the existing CSS and direct image URLs.
    '@next/next/no-img-element': 'off' } },
  {
    files: ['features/**', 'components/SettingsPages/**', 'components/Upload/**', 'components/VideoDropzone.jsx', 'components/EditVideoModal.jsx'],
    // Preserve the established imperative video/form integrations during migration.
    rules: { 'react-hooks/set-state-in-effect': 'off', 'react-hooks/refs': 'off', 'react-hooks/preserve-manual-memoization': 'off' },
  },
]);
