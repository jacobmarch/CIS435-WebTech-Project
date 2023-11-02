import Header from './components/Header';
import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Account from "./pages/Account";
import MainFeed from "./pages/MainFeed";
import Search from "./pages/Search";
import Trending from "./pages/Trending";

function App() {

    //Initialize router
    const router = createBrowserRouter([
        {
            element: <Header />,
            children: [
                {
                    path: "/",
                    element: <MainFeed/>
                },
                {
                    path: "/trending",
                    element: <Trending/>
                },
                {
                    path: "/account",
                    element: <Account/>
                },
                {
                    path: "/search",
                    element: <Search/>
                },
            ],
        },
    ])

    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
