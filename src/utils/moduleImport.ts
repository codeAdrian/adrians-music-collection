import { lazy } from 'react';

export const moduleImport = (module: string) =>
    lazy(() => import(`modules/${module}`));
