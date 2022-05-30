import React from 'react';

const GreetingText = () => {
  var today = new Date();
  var curHr = today.getHours();

  if (curHr < 12) {
    return 'GOOD MORNING';
  } else if (curHr < 18) {
    return 'GOOD AFTERNOON';
  } else {
    return 'GOOD EVENING';
  }
};

export default GreetingText;
