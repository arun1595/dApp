import Icon from 'antd/lib/icon';
import message from 'antd/lib/message';
import React from 'react';

import 'antd/lib/icon/style';
import 'antd/lib/message/style';

const iconStyle = {
  marginLeft: '16px',
  color: 'rgba(0, 0, 0, 0.25)',
  cursor: 'pointer'
};

const msgHandlers = {};

function showMessage(type, content, duration) {
  const msgKey = new Date();

  const handleClose = () => {
    // Clean-up and remove the dismiss handler from the object
    delete msgHandlers[msgKey];
  };

  const handleDismiss = () => {
    if (msgHandlers[msgKey]) {
      msgHandlers[msgKey]();

      handleClose();
    }
  };

  const msgBody = (
    <span>
      {content}
      <Icon type="close-circle" onClick={handleDismiss} style={iconStyle} />
    </span>
  );

  // AntD's message API returns a function to manually dismiss messages
  msgHandlers[msgKey] = message[type](msgBody, duration, handleClose);

  return handleDismiss;
}

export default showMessage;
