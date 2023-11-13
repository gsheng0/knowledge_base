import { pageTitleClassName, actionButtonClassName, formLabelClassName, formInputClassName} from "../AppCss"; 

function LoginPage(props) {
    return <div>
        <div className={pageTitleClassName}> 
            {props.loginId ? "Logout?" : "Please Login"}
        </div>
        <form onSubmit={props.onLoginSubmit} className="grid ml-16">
                <label className={formLabelClassName}>Login ID</label>
                <input className={formInputClassName} id="loginId" type="text" readOnly={props.loginId} defaultValue={props.loginId}/>
                {!props.loginId && 
                  <div className="grid">
                    <label className={formLabelClassName}>Password</label>
                    <input className={formInputClassName} id="password" type="password" />
                  </div>
                }
                <div className="mt-5 flex gap-5">
                    <button className={actionButtonClassName} type='submit'>Submit</button>
                    <button className={actionButtonClassName} onClick={props.onLoginCancel}>Cancel</button>
                </div>
        </form>
    </div>
}
export default LoginPage;