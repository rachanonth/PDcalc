import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Peddose', icon: '💊', description: 'Main Calculator' },
    { path: '/calcpack', label: 'Package', icon: '📋', description: 'Multi-Drug Calculator' },
    { path: '/emerdrug', label: 'Emergency', icon: '🚑', description: 'Emergency & ICU Drugs' },
    { path: '/info', label: 'Info', icon: 'ℹ️', description: 'About & Links' }
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname === path;
  };

  return (
    <nav className="ios-navigation" role="navigation" aria-label="Main navigation">
      <div className="ios-nav-container">
        <ul className="ios-nav-list" role="menubar">
          {navItems.map((item) => (
            <li key={item.path} className="ios-nav-item" role="none">
              <Link
                to={item.path}
                className={`ios-nav-link ${isActive(item.path) ? 'ios-nav-link-active' : ''}`}
                role="menuitem"
                aria-current={isActive(item.path) ? 'page' : undefined}
                aria-label={item.description}
                title={item.description}
              >
                <span className="ios-nav-icon" aria-hidden="true">{item.icon}</span>
                <span className="ios-nav-text">{item.label}</span>
                {isActive(item.path) && (
                  <span className="ios-nav-indicator" aria-hidden="true"></span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation; 