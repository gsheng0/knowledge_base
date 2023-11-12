

function AccountPage(props) {
    return <div>
    <div className="h-12 mb-2 text-center text-3xl font-extrabold text-blue-800 bg-blue-50">Account</div>
    {
        !props.user.userId ? 
        <div className="mb-20 text-2xl bg-blue-50">
            Please login or register for free if you don't have an account.
        </div>
        :
        <div className="grid">
            <div className="mb-2 text-md font-bold">Login ID</div>
            <input className="w-1/2" readOnly value={props.user.loginId} />
        </div>
    }
    </div>
}

export default AccountPage;