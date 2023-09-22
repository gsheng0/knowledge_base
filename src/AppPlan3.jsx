import Link from "./components/Link";
import Route from "./components/Route";
import AccountPage from './pages/AccountPage';
import AboutPage from './pages/AboutPage';
import LabelsPage from './pages/LabelsPage';
import NotesPage from './pages/NotesPage';
import LoginPage from './pages/LoginPage';


function AppPlan3() {

    return <div>
        <Link to="/about">[About]</Link>
        <Link to="/login">[Login]</Link>
        <Link to="/account">[Account]</Link>
        <Link to="/labels">[Labels]</Link>
        <Link to="/notes">[Notes]</Link>
        <div>
            <Route path="/about"> <AboutPage /></Route>
            <Route path="/notes"> <NotesPage /></Route>
            <Route path="/labels"> <LabelsPage /></Route>
            <Route path="/login"> <LoginPage /></Route>
            <Route path="/account"> <AccountPage /></Route>
        </div>
    </div>
}

export default AppPlan3;