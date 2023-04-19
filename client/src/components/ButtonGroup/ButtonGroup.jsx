import React from 'react';
import { Field } from 'formik';
import CONSTANSTS from '../../constants'
import styles from './ButtonGroup.module.sass';

const ButtonGroup = () => {
  return (
    <div className={styles.btnGroupContainer}>
      {CONSTANSTS.BUTTON_GROUP.map(({ title, text, value }, index) => (
        <label key={index} className={styles.btnGroupLabel}>
          <Field type="radio" name="url" value={value} className={styles.btnGroupinput}/>
          <article>
            <h4>{title}</h4>
            <p>{text}</p>
          </article>
        </label>
      ))}
    </div>
  );
};

export default ButtonGroup;
