

function AccountPage(props) {
    return <div>{
        !props.user.userId ? "login or regsiter first" 
        :
        <center>
        <h4>Your Profile</h4>
        <table>
            <tbody>
                <tr><td>Login ID: </td><td><input readOnly value={props.user.loginId} /></td></tr>
            </tbody>
        </table>         
        </center>
    }</div>
}

export default AccountPage;