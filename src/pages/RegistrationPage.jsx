
function RegistrationPage(props) {
    return <div>
        <div className="mb-2 text-center text-3xl font-extrabold text-blue-800 bg-blue-50">
            Please Register
        </div>        
        <form onSubmit={props.onRegistrationSubmit}>
        <table><tbody>
            <tr><td>email:</td><td><input id="email" type="text" /></td></tr>
            <tr><td>Login ID:</td><td><input id="loginId" type="text" /></td></tr>
            <tr><td>Password:</td><td><input id="password" type="password" /></td></tr>
            <tr><td>re-type Password:</td><td><input id="reTypedPassword" type="password" /></td></tr>
            <tr><td></td>
                <td><button type="submit">Register</button>&nbsp;&nbsp;
                    <button onClick={props.onRegistrationCancel}>Cancel</button></td>
            </tr>
        </tbody></table>
        </form>        
    </div>
}

export default RegistrationPage;