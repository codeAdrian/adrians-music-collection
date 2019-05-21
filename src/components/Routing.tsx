import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { moduleImport } from 'utils';

const About = moduleImport('About');
const AlbumDetail = moduleImport('AlbumDetail');
const AlbumList = moduleImport('AlbumList');
const Home = moduleImport('Home');
const NotFound = moduleImport('NotFound');
const Admin = moduleImport('Admin');

const Routing: React.FC = () => (
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
);

export { Routing };
