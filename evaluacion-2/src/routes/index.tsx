import {
    BrowserRouter,
    Route,
    Routes,
} from "react-router-dom";
import { Home } from "../pages";

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" Component={Home} />
                <Route />
                <Route />
                <Route />
                <Route />
                <Route />
                <Route />
                <Route />
            </Routes>
        </BrowserRouter>
    )
}
