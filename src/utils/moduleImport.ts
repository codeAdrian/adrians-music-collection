import { lazy } from 'react';

export const moduleImport = (view: string) =>
    lazy(() => import(`views/${view}`));
