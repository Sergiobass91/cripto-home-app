import React from 'react';

const ButtonForm = ( {text, classes} ) => {
  return (
    <button className={classes}>
    {text}
  </button>
  );
}

export default ButtonForm;
