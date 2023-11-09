

function AccountPage(props) {
    return <div>
    <div className="mb-2 text-center text-3xl font-extrabold text-blue-800 bg-blue-50">Account</div>

    {
        !props.user.userId ? <div className="mb-20 text-2xl bg-blue-50">Please login or register for free if you don't have an account.</div>
        :
        <center>
        <h4>Your Profile</h4>
        <table>
            <tbody>
                <tr><td>Login ID: </td><td><input readOnly value={props.user.loginId} /></td></tr>
            </tbody>
        </table>         
        </center>
    }
    </div>
}

export default AccountPage;