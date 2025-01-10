import React from "react";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Create from "./pages/Create";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LeftBar from "./components/LeftBar";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-row">
        <LeftBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tarif/:id" element={<Detail />} />
          <Route path="/ekle" element={<Create />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
