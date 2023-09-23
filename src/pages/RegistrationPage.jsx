function RegistrationPage() {
    return <div>
        <h1>Regsitration</h1>
        <form>
        <table>
            <tr><td>email:</td><td><input type="text" /></td></tr>
            <tr><td>User ID:</td><td><input type="text" /></td></tr>
            <tr><td>Password:</td><td><input type="password" /></td></tr>
            <tr><td>re-type Password:</td><td><input type="password" /></td></tr>
            <tr><td></td>
                <td><button>Cancel</button>&nbsp;&nbsp;
                    <button>Register</button></td>
            </tr>
        </table>
        </form>        
    </div>
}

export default RegistrationPage;