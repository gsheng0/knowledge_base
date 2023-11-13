import { pageTitleClassName, actionButtonClassName, formLabelClassName, formInputClassName } from "../AppCss"; 

function RegistrationPage(props) {
    return <div>
        <div className={pageTitleClassName}>
            Registration
        </div>        
        <form onSubmit={props.onRegistrationSubmit} className="ml-16 grid">
            <label className={formLabelClassName}>Email</label>
            <input className={formInputClassName} id="email" type="text" />
            <label className={formLabelClassName}>Login ID</label>
            <input className={formInputClassName} id="loginId" type="text" />
            <label className={formLabelClassName}>Password</label>
            <input className={formInputClassName} id="password" type="password" />
            <label className={formLabelClassName}>re-type Password</label>
            <input className={formInputClassName} id="reTypedPassword" type="password" />          
            <div className="flex gap-5 mt-5">
                <button className={actionButtonClassName} type="submit">Register</button>
                <button className={actionButtonClassName} onClick={props.onRegistrationCancel}>Cancel</button>
            </div>
        </form>        
    </div>
}

export default RegistrationPage;