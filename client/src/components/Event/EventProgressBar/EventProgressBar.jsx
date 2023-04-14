import React from 'react';

const ProgressBar = (props) => {
  const { bgcolor, completed } = props;

  const containerStyles = {
    height: 50,
    maxWidth: '100%',
    backgroundColor: '#eeeeee',
    borderRadius: 2
  };

  const fillerStyles = {
    height: '100%',
    maxWidth: `${completed}%`,
    backgroundColor: bgcolor,
    borderRadius: 2
  };

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}></div>
    </div>
  );
};

export default ProgressBar;