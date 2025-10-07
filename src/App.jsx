import { BrowserRouter, Routes, Route } from "react-router-dom"
import CardsTraining from "../pages/CardsTraining";
import DefaultLayout from "../layout/DefaultLayout";
import CardTrainingPage from "../pages/CardTrainingPage";
import Esercizio from "../pages/Esercizio";
import { SchedeContextProvider } from "../context/schedeContext";
import Esercizi from "../pages/Esercizi";
import CardCreateTraining from "../pages/CardCreateTraining";
function App() {


  return (
    <>
      <SchedeContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DefaultLayout />} >
            <Route index element={<CardsTraining />} />
            <Route path="/create-training" element={<CardCreateTraining />} />
            <Route path=":id" element={<CardTrainingPage />} />
            <Route path=":id/esercizio" element={<Esercizi />} />
            <Route path=":id/esercizio/:idEsercizio" element={<Esercizio />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </SchedeContextProvider>
    </>
  )
}

export default App
