import { useState, useEffect, useContext } from 'react';
import NavigationContext from './context/navigation';
import Link from "./components/Link";
import Route from "./components/Route";

import AccountPage from './pages/AccountPage';
import AboutPage from './pages/AboutPage';
import LabelsPage from './pages/LabelsPage';
import NotesPage from './pages/NotesPage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import { KbRepo } from './KbRepo';

function AppPlan3() {
    const [user, setUser] = useState({userId: '1', loginId: 'DemoUser'});
    const {navigate } = useContext(NavigationContext);

    useEffect(()=>{
        user.loginId && navigate("/notes");
    }, []);

    function onLoginSubmit(event) {
        console.log("submit login/off.")
        event.preventDefault();
        const inputLoginId = event.target.loginId.value;
        if (inputLoginId === user.loginId) {  // logout
            setUser({userId: undefined, loginId: undefined});
            navigate("/about");
        }
        else { // login
            const pswd = event.target.password.value;
            KbRepo.loginAs(inputLoginId, pswd,  (userIdFromDb) => {
                if (userIdFromDb) {
                    setUser({userId: userIdFromDb, loginId: inputLoginId})
                    navigate("/notes");
                }
                else {
                    alert("login failed!");
                }
            });   
            
        }
    }
    function onLoginCancel(event) {
        console.log("cancel login/off.")
        event.preventDefault();
        navigate("/notes");
    }
    function onRegistrationSubmit(event) {
        console.log("submit registration.")
        event.preventDefault();
        const inputLoginId = event.target.loginId.value;
        const inputEmail = event.target.email.value;
        const inputPswd = event.target.password.value;
        const inputPswd2 = event.target.reTypedPassword.value;

        if (inputPswd != inputPswd2) {
            alert("password do not match!");
        }
        else {
            KbRepo.registerAs(inputEmail, inputLoginId, inputPswd,  (userIdFromDb) => {
                if (userIdFromDb) {
                    setUser({userId: userIdFromDb, loginId: inputLoginId})
                    navigate("/notes");
                }
                else {
                    alert("registration failed!");
                }
            });   
        }                    
    }
    function onRegistrationCancel(event) {
        console.log("cancel regtistration.")
        event.preventDefault();
        navigate("/login");
    }

    return <div>
        <Link to="/about">About</Link>&nbsp;
        <Link to="/notes">Notes</Link>&nbsp;
        <Link to="/labels">Tags</Link>&nbsp;
        { !user.userId && 
        <Link to="/registration">Registration</Link>
        }&nbsp;
        <Link to="/account">Account</Link>&nbsp;
        <Link to="/login">{user.userId ? "Logout " + user.loginId  : "Login"}</Link>
        <Route path="/"> <AboutPage /></Route>
        <Route path="/about"> <AboutPage /></Route>
        <Route path="/notes"> <NotesPage userId={user.userId} loginId={user.loginId} /></Route>
        <Route path="/labels"> <LabelsPage userId={user.userId} /></Route>
        <Route path="/registration"> 
            <RegistrationPage onRegistrationSubmit={onRegistrationSubmit} onRegistrationCancel={onRegistrationCancel} />
        </Route>
        <Route path="/login"> 
            <LoginPage loginId={user.loginId} onLoginSubmit={onLoginSubmit} onLoginCancel={onLoginCancel} />
        </Route>
        <Route path="/account">
            <AccountPage user={user}/>
        </Route>
    </div>
}

export default AppPlan3;