import { BrowserRouter, Routes, Route } from "react-router-dom"
import CardsTraining from "../pages/CardsTraining";
import DefaultLayout from "../layout/DefaultLayout";
function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DefaultLayout />} >
          <Route path="/schede" element={<CardsTraining />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
