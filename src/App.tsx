import { Routes, Route } from "react-router";
import Home from "./pages/Home.tsx";
import Books from "./pages/Books.tsx";
import BookDetails from "./pages/BookDetails.tsx";
import Profile from "./pages/Profile.tsx";
import NotFound from "./pages/NotFound.tsx";
import Register from "./pages/Register.tsx";
import Login from "./pages/Login.tsx";
import Navbar from "./pages/Navbar.tsx";
import UpdateProfile from "./pages/Update.tsx";
import ListBooks from "./pages/AddListing.tsx";
import Admin from "./pages/Admin.tsx";
import ProtectedRoute from "./pages/ProtectedRoute.tsx";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/books" element={<Books />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/books/add" element={<ListBooks />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/update-profile" element={<UpdateProfile />} />
          <Route path="/books/:bookId" element={<BookDetails />} />
        </Route>
        

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
