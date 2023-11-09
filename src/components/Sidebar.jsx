import Link from "./Link";

function Sidebar({user}) {
    const links = [
        { condition: true, label: 'About', path: '/about'},
        { condition: true, label: 'Notes', path: '/notes'},
        { condition: true, label: 'Tags', path: '/labels'},
        { condition: !user.userId, label: 'Registration', path: '/registration'},
        { condition: true, label: 'Account', path: '/account'},
        { condition: user.userId, label: 'Logout', path: '/login'},
        { condition: !user.userId, label: 'Login', path: '/login'},
    ];

    return (
        <div className="sticky top-2 flex flex-col bg-blue-50">
            { links.map((link) => {
                return link.condition ? 
                        <Link 
                            key={link.label} 
                            to={link.path} 
                            className="ml-4 mt-2 mb-2 text-lg"
                            activeClassName="text-3xl font-bold border-l-4 border-blue-500 pl-2"
                        >{link.label}</Link>        
                        : null;
               })
            }
        </div>
    );
}
export default Sidebar;