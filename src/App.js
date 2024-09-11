import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import LogIn from "./pages/LogIn";
import Header from "./component/Header";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import BlogPage from "./pages/BlogPage";
import CreateBlog from "./pages/CreateBlog";
import ErrorPage from "./pages/ErrorPage";
import { Provider } from "react-redux";
import appStore from "./store/appStore";

const FirstComponent = () =>{
  return(
    <div className="">
      <Header />
      <Outlet />
    </div>
  )
}


const appRouter = createBrowserRouter([
  {
  path:"/login",
  element:<LogIn />,
  errorElement: <ErrorPage />
  },
  {
    path:"/",
    element: <FirstComponent />,
    errorElement: <ErrorPage />,
    children:[
      {
        path:"/",
        element: <Home />,
      },
      {
        path:"/profile/:userId",
        element:<Profile />,
      },
      {
        path:"/blog/:blogId",
        element: <BlogPage />,
      },
      {
        path:"/create/:userId",
        element: <CreateBlog />,
      }
    ]
  }
])

function App() {
  return (
    <Provider store={appStore}>
    <RouterProvider router={appRouter} >
    <div className="App">
      
    </div>
    </RouterProvider>
    </Provider>
  );
}

export default App;
