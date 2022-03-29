import React from 'react';
import { Routes, Route, Outlet, Link } from "react-router-dom";

// Available layouts
import { Main as MainLayout } from './layouts';

// Landing pages
import { Home as HomeView, NoMatch as NoMatchView } from './views/landingPages'
const BingoView = React.lazy(() => import("./views/landingPages/Bingo"))

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<HomeView />} />
                <Route
                    path="bingo"
                    element={
                        <React.Suspense fallback={<>...</>}>
                            <BingoView />
                        </React.Suspense>
                    }
                />
                <Route path="*" element={<NoMatchView />} />
            </Route>
        </Routes>
    );
};

function Layout() {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/bingo">Bingo</Link>
                    </li>
                </ul>
            </nav>

            <hr />

            <Outlet />
        </div>
    );
}


export default AppRoutes;
