import React from 'react';
import { Form, Formik } from 'formik';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CONSTANTS from '../../constants';
import { getDataForContest } from '../../store/slices/dataForContestSlice';
import styles from './ContestForm.module.sass';
import Spinner from '../Spinner/Spinner';
import FormInput from '../FormInput/FormInput';
import SelectInput from '../SelectInput/SelectInput';
import FieldFileInput from '../InputComponents/FieldFileInput/FieldFileInput';
import FormTextArea from '../InputComponents/FormTextArea/FormTextArea';
import TryAgain from '../TryAgain/TryAgain';
import Schems from '../../utils/validators/validationSchems';
import OptionalSelects from '../OptionalSelects/OptionalSelects';
import ButtonGroup from '../ButtonGroup/ButtonGroup';

const variableOptions = {
  [CONSTANTS.NAME_CONTEST]: {
    styleName: '',
    typeOfName: '',
  },
  [CONSTANTS.LOGO_CONTEST]: {
    nameVenture: '',
    brandStyle: '',
  },
  [CONSTANTS.TAGLINE_CONTEST]: {
    nameVenture: '',
    typeOfTagline: '',
  },
};

class ContestForm extends React.Component {
  getPreference = () => {
    const { contestType } = this.props;
    switch (contestType) {
      case CONSTANTS.NAME_CONTEST: {
        this.props.getData(CONSTANTS.NAME_CONTEST);
        break;
      }
      case CONSTANTS.TAGLINE_CONTEST: {
        this.props.getData(CONSTANTS.TAGLINE_CONTEST);
        break;
      }
      case CONSTANTS.LOGO_CONTEST: {
        this.props.getData(CONSTANTS.LOGO_CONTEST);
        break;
      }
    }
  };

  componentDidMount() {
    this.getPreference();
  }

  render() {
    const { isFetching, error } = this.props.dataForContest;
    if (error) {
      return <TryAgain getData={this.getPreference} />;
    }
    if (isFetching) {
      return <Spinner />;
    }
    return (
      <>
        <div className={styles.formContainer}>
          <Formik
            initialValues={{
              title: '',
              industry: '',
              focusOfWork: '',
              targetCustomer: '',
              file: '',
              url: 'yes',
              ...variableOptions[this.props.contestType],
              ...this.props.initialValues,
            }}
            onSubmit={this.props.handleSubmit}
            validationSchema={this.props.contestType == CONSTANTS.NAME_CONTEST ? Schems.ContestSchemName : Schems.ContestSchem}
            innerRef={this.props.formRef}
            enableReinitialize
          >
            <Form>
              <div className={styles.inputContainer}>
                <span className={styles.inputHeader}>Title of contest</span>
                <FormInput
                  name="title"
                  type="text"
                  label="Title"
                  classes={{
                    container: styles.componentInputContainer,
                    input: styles.input,
                    warning: styles.warning,
                  }}
                />
              </div>
              <div className={styles.inputContainer}>
                <SelectInput
                  name="industry"
                  classes={{
                    inputContainer: styles.selectInputContainer,
                    inputHeader: styles.selectHeader,
                    selectInput: styles.select,
                    warning: styles.warning,
                  }}
                  header="Describe industry associated with your venture"
                  optionsArray={this.props.dataForContest.data.industry}
                />
              </div>
              <div className={styles.inputContainer}>
                <span className={styles.inputHeader}>
                  What does your company / business do?
                </span>
                <FormTextArea
                  name="focusOfWork"
                  type="text"
                  label="e.g. We`re an online lifestyle brand that provides stylish and high quality apparel to the expert eco-conscious shopper"
                  classes={{
                    container: styles.componentInputContainer,
                    inputStyle: styles.textArea,
                    warning: styles.warning,
                  }}
                />
              </div>
              <div className={styles.inputContainer}>
                <span className={styles.inputHeader}>
                  Tell us about your customers
                </span>
                <FormTextArea
                  name="targetCustomer"
                  type="text"
                  label="customers"
                  classes={{
                    container: styles.componentInputContainer,
                    inputStyle: styles.textArea,
                    warning: styles.warning,
                  }}
                />
              </div>
              <OptionalSelects {...this.props} />
              <FieldFileInput
                name="file"
                classes={{
                  fileUploadContainer: styles.fileUploadContainer,
                  labelClass: styles.label,
                  fileNameClass: styles.fileName,
                  fileInput: styles.fileInput,
                  warning: styles.warning,
                }}
                type="file"
              />
              {this.props.contestType === 'name' && <ButtonGroup name='url'/>}
              {this.props.isEditContest ? (
                <button type="submit" className={styles.changeData}>
                  Set Data
                </button>
              ) : null}
            </Form>
          </Formik>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { isEditContest } = state.contestByIdStore;
  return {
    isEditContest,
    contestCreationStore: state.contestCreationStore,
    dataForContest: state.dataForContest,
    initialValues: ownProps.defaultData,
  };
};
const mapDispatchToProps = (dispatch) => ({
  getData: (data) => dispatch(getDataForContest(data)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ContestForm)
);
