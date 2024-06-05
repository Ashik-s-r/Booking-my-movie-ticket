import { createBrowserRouter } from "react-router-dom";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import MovieListitem from "./components/blog/MovieListitem";
import MovieDetails from "./components/blog/MovieDetails";
import List from './components/blog/List';
import MovieBooking from './components/blog/MovieBooking'
import Bookings from './components/blog/Bookings'


const router = createBrowserRouter([
    { path: '', element: <Signup/> },
    { path: '/login', element: <Login/> },
    { path: '/list', element: <List/> },
    { path: '/Pre', element: <Bookings/> },
    { path:'/blog/posts/details', element:<MovieListitem/>},
    { path: 'blog/posts/:postId', element: <MovieDetails/>},
    { path: 'blog/post/:postId', element: <MovieBooking/>},
]);

export default router;