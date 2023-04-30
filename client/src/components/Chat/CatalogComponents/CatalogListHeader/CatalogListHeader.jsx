import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import {
  changeShowModeCatalog,
  changeRenameCatalogMode,
  changeCatalogName,
} from '../../../../store/slices/chatSlice';
import styles from './CatalogHeader.module.sass';
import FormInput from '../../../FormInput/FormInput';
import Schems from '../../../../utils/validators/validationSchems';

const CatalogListHeader = (props) => {
  const changeCatalogName = (values) => {
    const { changeCatalogName, id } = props;
    changeCatalogName({ catalogName: values.name, catalogId: id });
  };
  const {
    name,
    changeShowModeCatalog,
    changeRenameCatalogMode,
    isRenameCatalog,
  } = props;
  return (
    <div className={styles.headerContainer}>
      <i
        className="fas fa-long-arrow-alt-left"
        onClick={() => changeShowModeCatalog()}
      />
      {!isRenameCatalog && (
        <div className={styles.infoContainer}>
          <span>{name}</span>
          <i
            className="fas fa-edit"
            onClick={() => changeRenameCatalogMode()}
          />
        </div>
      )}
      {isRenameCatalog && (
        <div className={styles.changeContainer}>
          <Formik
            onSubmit={changeCatalogName}
            initialValues={props.initialValues}
            validationSchema={Schems.CatalogSchema}
          >
            <Form>
              <FormInput
                name="name"
                classes={{
                  container: styles.inputContainer,
                  input: styles.input,
                  warning: styles.fieldWarning,
                  notValid: styles.notValid,
                }}
                type="text"
                label="Catalog Name"
              />
              <button type="submit">Change</button>
            </Form>
          </Formik>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  const { isRenameCatalog } = state.chatStore;
  const { name, id } = state.chatStore.currentCatalog;
  return {
    id,
    name,
    isRenameCatalog,
    initialValues: {
      name,
    },
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeShowModeCatalog: () => dispatch(changeShowModeCatalog()),
  changeRenameCatalogMode: () => dispatch(changeRenameCatalogMode()),
  changeCatalogName: (data) => dispatch(changeCatalogName(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CatalogListHeader);
