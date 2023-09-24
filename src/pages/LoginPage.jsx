

function LoginPage(props) {
    return <center><h1> {props.loginId ? "Are you sure to logout?" : "Please login"}</h1>
    <form onSubmit={props.onLoginSubmit}>
        <table>
        <tbody>
            <tr><td>Login ID:</td><td><input id="loginId" type="text" readOnly={props.loginId} defaultValue={props.loginId}/></td></tr>
            {!props.loginId && <tr><td>Password:</td><td><input id="password" type="password" /></td></tr>}
            <tr>
                <td><button type='submit'>Submit</button></td>
                <td><button onClick={props.onLoginCancel}>Cancel</button></td>
            </tr>
        </tbody></table>
    </form>
    </center>
}
export default LoginPage;