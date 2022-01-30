import { BrowserRouter,Route, Routes } from "react-router-dom";
import Expense from "./HomeExpenses/components/Expense";
import ShowExpenses from "./HomeExpenses/components/ShowExpenses";
import BarChart from "./HomeExpenses/components/BarChart";
import MedicalPlan from "./MedicalExpenses/screens/MedicalPlanTableScreen";
import Home from "./Home";
import TourHome from "./TourExpenses/screens/TourHome";
import ToursScreen from "./TourExpenses/screens/ToursScreen";
import TourMembersScreen from "./TourExpenses/screens/TourMembersScreen";

function App() {
 
  return (
 <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/home_expenses" element={<Expense />} />
        <Route path="/show_expenses" element={<ShowExpenses />} />
        <Route path="/bar_chart" element={<BarChart />} />
        <Route path="/medical_expenses" element={<MedicalPlan />} />
        <Route path="/tour_expenses" element={<TourHome />} />
        <Route path="/tour_expenses/:id/:name" element={<ToursScreen />}/>
        <Route path="/tour_expenses/:id/:name/:mid/:mname" element={<TourMembersScreen/>}/>
      </Routes>
    </BrowserRouter>
 
  );
}

export default App;
