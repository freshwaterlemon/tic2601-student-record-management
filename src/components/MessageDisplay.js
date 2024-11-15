import React from 'react';
import './MessageDisplay.css';

const MessageDisplay = ({ message }) => {
    return message ? <p className="updatedMessage">{message}</p> : null;
};

export default MessageDisplay;
