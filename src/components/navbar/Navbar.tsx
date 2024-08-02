import { NavLink, useLocation } from 'react-router-dom';
import navbarStyles from './Navbar.module.scss';
import classNames from 'classnames';

type Props = {
  onClick?: () => void;
  isOpen: boolean;
  withoutUnderline?: boolean;
};

type NavBarItem = {
  name: string;
  url: string;
  pageUp?: boolean;
  external?: boolean;
};

export const Navbar: React.FC<Props> = ({
  onClick,
  isOpen,
  withoutUnderline,
}) => {
  // Use location to get the current URL path
  const location = useLocation();
  const currentPath = location.pathname;

  // prettier-ignore
  const navBarLinkItems: NavBarItem[] = !withoutUnderline
    ? [
      { name: 'home', url: '/', pageUp: currentPath === '/' },
      { name: 'phones', url: '/phones', pageUp: currentPath === '/phones',},
      { name: 'tablets', url: '/tablets', pageUp: currentPath === '/tablets',
      },
      { name: 'accessories', 
        url: '/accessories', 
        pageUp: currentPath === '/accessories',
      },
    ]
    : [
      {
        name: 'github',
        url: 'https://github.com/ivan-baranovskyi',
        external: true,
      },
      { name: 'contacts', url: '/contacts' },
      { name: 'rights', url: '/rights' },
    ];

  const handleNavLinkClick = (pageUp?: boolean) => {
    if (pageUp) {
      window.scrollTo(0, 0);
    }

    if (onClick) {
      onClick();
    }
  };

  return (
    <div
      className={classNames(navbarStyles.navbar, {
        [navbarStyles.open]: isOpen,
        [navbarStyles.footer]: withoutUnderline,
      })}
    >
      <ul
        className={`${isOpen && !withoutUnderline ? navbarStyles.navbar__aside : ''} ${withoutUnderline ? navbarStyles.navbar__footer_ul : navbarStyles.navbar__items}`}
      >
        {navBarLinkItems.map(item => (
          <li className={navbarStyles.navbar__item} key={item.name}>
            {isOpen}
            <NavLink
              to={item.url}
              onClick={() => handleNavLinkClick(item.pageUp)}
              target={item.external ? '_blank' : ''}
              className={({ isActive }) =>
                classNames(navbarStyles.navbar__itemlink, {
                  [navbarStyles.navbar__itemlink_active]:
                    isActive && !withoutUnderline,
                })
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
