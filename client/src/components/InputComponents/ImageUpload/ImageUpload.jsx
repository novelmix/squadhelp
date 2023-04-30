import React from 'react';
import { useField, ErrorMessage } from 'formik';

const ImageUpload = ({ name, classes }) => {
  const [{ value, ...restField }, { touched, error }, helpers] = useField(name);
  const { uploadContainer, inputContainer, imgStyle, imgNone } = classes;
  const onChange = (e) => {
    const node = window.document.getElementById('imagePreview');
    const file = e.target.files[0];
    const imageType = /image.*/;
    if (!file.type.match(imageType)) {
      e.target.value = '';
    } else {
      helpers.setValue(file, false);
      const reader = new FileReader();
      reader.onload = () => {
        node.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className={uploadContainer}>
      <div className={inputContainer}>
        <span>Support only images (*.png, *.gif, *.jpeg, *.jpg)</span>
        <input
          {...restField}
          id="fileInput"
          type="file"
          accept=".jpg, .png, .jpeg, .gif"
          onChange={onChange}
        />
        <label htmlFor="fileInput">Chose file</label>
      </div>
      <ErrorMessage name={name} component="span" className={classes.warning} />
      <img
        id="imagePreview"
        className={!!value ? imgStyle : imgNone}
        alt="user"
      />
    </div>
  );
};

export default ImageUpload;
