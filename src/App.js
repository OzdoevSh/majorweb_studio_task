import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import RegistrationPage from './components/RegistrationPage';
import AccountPage from './components/AccountPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<RegistrationPage />} />
          <Route path="/account" element={<AccountPage />} />
        </Routes>
    </Router>
    </div>
  );
}

export default App;
