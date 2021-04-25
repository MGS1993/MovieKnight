import React, { useContext } from 'react';
import styles from './HomePageHeader.module.css';
import routerContext from '../../context/routerContext';
const HomePageHeader = props => {
  const routerState = useContext(routerContext);
  return (
    <div className={styles.headerWrapper}>
      {routerState.loggedIn ? (
        <div onClick={() => routerState.handleLogout()} className={styles.loginText}>
          LogOut
        </div>
      ) : (
        <div onClick={props.clicked} className={styles.loginText}>
          Login
        </div>
      )}
      <div>
        <h2>MovieKnight</h2>
      </div>
    </div>
  );
}

export default HomePageHeader