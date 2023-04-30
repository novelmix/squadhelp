import React, { Component } from 'react';
import styles from './Footer.module.sass';
import CONSTANTS from '../../constants';

class Footer extends Component {
  topFooterItemsRender = item => (
    <div key={item.title}>
      <h4>{item.title}</h4>
      {item.items.map((i, index) => (
        <a key={index} href={i.href}>
          {i.text}
        </a>
      ))}
    </div>
  );

  topFooterRender () {
    return CONSTANTS.FOOTER_ITEMS.map(item => this.topFooterItemsRender(item));
  }

  render () {
    return (
      <div className={styles.footerContainer}>
        <div className={styles.footerTop}>
          <div>{this.topFooterRender()}</div>
        </div>
      </div>
    );
  }
}

export default Footer;
