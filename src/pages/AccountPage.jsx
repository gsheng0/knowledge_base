import { pageTitleClassName, formLabelClassName, formFixedClassName} from "../AppCss"; 


function AccountPage(props) {
    return <div>
    <div className={pageTitleClassName}>Account</div>
    {
        !props.user.userId ? 
        <div className="mb-20 text-2xl bg-blue-50">
            Please login or register for free if you don't have an account.
        </div>
        :
        <div className="grid ml-16">
            <label className={formLabelClassName}>Login ID</label>
            <input className={formFixedClassName} readOnly value={props.user.loginId} />
        </div>
    }
    </div>
}

export default AccountPage;