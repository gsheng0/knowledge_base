
import useNavigation from '../hooks/useNavigation';
import classname from 'classnames';

function Link({to, children, className, activeClassName}) {
    const {navigate, currentPath } = useNavigation();

    const classes = classname(
        'text-blue-800 hover:font-bold', 
        className,
        currentPath === to && activeClassName
    );

    const handleClick = (event) => {
        if (event.ctrlKey || event.metaKey) {
            return;
        }
        event.preventDefault();
        navigate(to);
    };
    return <a className={classes} href={to} onClick={handleClick}>{children}</a>
}

export default Link;