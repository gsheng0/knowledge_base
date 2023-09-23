

function LoginPage() {
    return <div><h1> Login Page</h1>
    <form>
        <table>
            <tr><td>User ID:</td><td><input type="text" /></td></tr>
            <tr><td>Password:</td><td><input type="password" /></td></tr>
            <tr>
                <td><button>Cancel</button></td>
                <td><button>Login</button></td>
            </tr>
        </table>
    </form>
    </div>
}
export default LoginPage;