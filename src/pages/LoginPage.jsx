import classNames
 from "classnames";
function LoginPage(props) {
    const actionButtonClassName = classNames({  "w-16": true, 
    "bg-blue-100": true, 
    "rounded-lg": true,  
    "border-solid": true,  
    "border-1": true, 
    "border-blue-400": true,
    "outline": true,
    "outline-offset-1": true,
    "outline-1": true,
    "hover:text-blue-800": true,
    "hover:font-extrabold": true
    });
    return <div>
        <div className="h-16 mb-2 text-center text-3xl font-extrabold text-blue-800 bg-blue-50"> 
            {props.loginId ? "Logout?" : "Please Login"}
        </div>
        <form onSubmit={props.onLoginSubmit} className="grid">
                <label className="font-bold mb-2">Login ID</label>
                <input className="w-1/2 mb-5" id="loginId" type="text" readOnly={props.loginId} defaultValue={props.loginId}/>
                {!props.loginId && 
                    <div className="mb-5 grid">
                    <label className="mb-2 font-bold">Password</label>
                    <input className="w-1/2" id="password" type="password" />
                    </div> 
                }
                <div className="flex gap-5">
                    <button className={actionButtonClassName} type='submit'>Submit</button>
                    <button className={actionButtonClassName} onClick={props.onLoginCancel}>Cancel</button>
                </div>
        </form>
    </div>
}
export default LoginPage;