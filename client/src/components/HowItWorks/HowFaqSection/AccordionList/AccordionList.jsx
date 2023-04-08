import React, { useState } from 'react';
import styles from './AccordionList.module.sass';

const AccordionList = ({ data: { anchor, title, list } }) => {
  const [item, setItem] = useState(0);

  const handleToggle = (index) => {
    item === index ? setItem(null) : setItem(index);
  };

  return (
    <div id={anchor}>
      <h2 className={styles.faqListTitle}>{title}</h2>
      <ul>
        {list.map(({ btnText, text, subList }, index) => (
          <li className={styles.faqListAcc} key={index}>
            <button
              className={styles.faqListAccBtn}
              onClick={() => handleToggle(index)}
            >
              {btnText}
              <span>{item === index ? '—' : '+'} </span>
            </button>
            {item === index && (
              <div className={styles.faqListAccText}>
                <p dangerouslySetInnerHTML={{ __html: text }} />
                <ul>
                  {subList &&
                    subList.map(({ subText }, index) => (
                      <li
                        key={index}
                        dangerouslySetInnerHTML={{ __html: subText }}
                      />
                    ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
      <hr />
    </div>
  );
};

export default AccordionList;
