import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Main } from "./pages/Main";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/main" element={<Main />}/>
    </Routes>
  )
}