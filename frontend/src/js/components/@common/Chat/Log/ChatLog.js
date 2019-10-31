import React, { Fragment, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import {
  Message,
  NewMessagesLabel,
} from './index'
import { Spinner } from '../../../index'
import { StyledChatLog } from '../styles'
import { P } from '../../../../styles'


function ChatLog(props) {
  const {
    data,
    success,
    error,
    messageProps,
  } = props
  const ChatLog = React.createRef()

  const [maxOffset, setMaxOffset] = useState(null)

  const handleScroll = useCallback((e) => {
    const elementDom = e.target
    const new_value = elementDom.scrollTop + elementDom.offsetHeight
    const scrollHeight = elementDom.scrollHeight
    if (!maxOffset) {
      setMaxOffset(new_value)
    }
    else if ( Math.abs(maxOffset - new_value) > 100) {
      setMaxOffset(new_value)
    }
    else if (new_value === scrollHeight) {
      setMaxOffset(scrollHeight)
    }
  }, [maxOffset])

  return (
    <StyledChatLog
      onScroll={handleScroll}
      ref={ChatLog}
    >
      {
        success
          ? data && data.messages.length > 0
            ? data.messages.map(message => {
                return (
                  <Fragment key={message.id}>
                    <NewMessagesLabel
                      id={message.id}
                    />
                    <Message
                      key={message.id}
                      maxOffset={maxOffset}
                      message={message}
                      {...messageProps}
                    />
                  </Fragment>
                )
              }
            )
            : <P center>No messages yet...</P>
          : error
            ? <P center>Error</P>
            : <Spinner />
      }
    </StyledChatLog>
  );
}

ChatLog.propTypes = {
  data: PropTypes.object,
  fetching: PropTypes.bool.isRequired,
  success: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default ChatLog;
