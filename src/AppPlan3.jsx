import Link from "./components/Link";
import Route from "./components/Route";

import AccountPage from './pages/AccountPage';
import AboutPage from './pages/AboutPage';
import LabelsPage from './pages/LabelsPage';
import NotesPage from './pages/NotesPage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';

function AppPlan3() {
    return <div>
        <Link to="/about">[About]</Link>&nbsp;
        <Link to="/notes">[Notes]</Link>
        <Link to="/labels">[Labels]</Link>&nbsp;
        <Link to="/registration">Registration</Link>&nbsp;
        <Link to="/account">[Account]</Link>&nbsp;
        <Link to="/login">[Login]</Link>&nbsp;
        
            <Route path="/about"> <AboutPage /></Route>
            <Route path="/notes"> <NotesPage /></Route>
            <Route path="/labels"> <LabelsPage /></Route>
            <Route path="/registration"> <RegistrationPage /></Route>
            <Route path="/login"> <LoginPage /></Route>
            <Route path="/account"> <AccountPage /></Route>
    </div>
}

export default AppPlan3;