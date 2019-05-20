import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { PrivateRoute } from './components/PrivateRoute';

type moduleImportFunction = (module: String) => () => Promise<any>;

const moduleImport: moduleImportFunction = module => () =>
    import(`modules/${module}`);

const About = lazy(() => import('modules/About'));
const AlbumDetail = lazy(() => import('modules/AlbumDetail'));
const AlbumList = lazy(() => import('modules/AlbumList'));
const Home = lazy(moduleImport('Home'));
const NotFound = lazy(() => import('modules/NotFound'));
const Admin = lazy(() => import('modules/Admin'));

const Routing = () => (
    <BrowserRouter>
        <Switch>
            <PrivateRoute exact path='/admin'>
                <Suspense fallback={null}>
                    <Admin />
                </Suspense>
            </PrivateRoute>
            <Route exact path='/about'>
                <Suspense fallback={null}>
                    <About />
                </Suspense>
            </Route>
            <Route
                exact
                path='/album/:id'
                render={props => (
                    <Suspense fallback={null}>
                        <AlbumDetail {...props} />
                    </Suspense>
                )}
            />
            <Route exact path='/albums'>
                <Suspense fallback={null}>
                    <AlbumList />
                </Suspense>
            </Route>
            <Route exact path='/'>
                <Suspense fallback={null}>
                    <Home />
                </Suspense>
            </Route>
            <Route>
                <Suspense fallback={null}>
                    <NotFound />
                </Suspense>
            </Route>
        </Switch>
    </BrowserRouter>
);

export default Routing;
