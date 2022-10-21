import classes from './Header.module.css';
import { Fragment } from 'react';
import headerImg from '../../images/meals-header-image.jpg'
import HeaderCartButton from './HeaderCartButton';

const Header = ({onShowCart}) => {
    return (
        <Fragment>
            <header className={classes.header}>
                <h1>ReactMeals</h1>
                <HeaderCartButton onClick={onShowCart}/>
            </header>
            <div className={classes['main-image']}>
                <img src={headerImg} alt="A table with food"/>
            </div>
        </Fragment>
    );
}

export default Header;