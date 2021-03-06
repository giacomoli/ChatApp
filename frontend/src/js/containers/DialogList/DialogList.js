import React, { useState } from 'react'
import { useSelector } from 'react-redux'
// import PropTypes from 'prop-types'

import { setActiveDialog } from '../../actions/dialogActions'
import {
  getDialogsInfo,
  getDialogsList,
  getNotEmptyDialogsData,
} from './selectors'
import { ChatList } from '../../components'

function DialogList() {
  // allow dialogs without messages
  const [allowEmpty, setAllowEmpty] = useState(false);

  function handleAllowEmpty() {
    setAllowEmpty(!allowEmpty)
  }

  // data
  const dialogsInfo = useSelector(state => getDialogsInfo(state));
  const { fetching, error } = dialogsInfo;
  const dialogs = useSelector(state => {
    if (allowEmpty) {
      return getDialogsList(state)
    } else {
      return getNotEmptyDialogsData(state)
    }
  });

  return (
    <ChatList
      listProps={{
        list: dialogs,
        fetching,
        errorMessage: "You don't have any dialogs.",
        error
      }}
      additionalBtnProps={{
        handler: handleAllowEmpty
      }}
      cardProps={{
        setActive: setActiveDialog
      }}
      getCardData={(data) => {
        return {
          ...data,
          avatar: data.interlocutor.avatar,
          title: data.interlocutor.user,
        }
      }}
    />
  )
}

// DialogList.propTypes = {
//   data: PropTypes.array.isRequired,
//   success: PropTypes.bool.isRequired,
//   fetching: PropTypes.bool.isRequired,
//   error: PropTypes.string,
//   getDialogDetails: PropTypes.func.isRequired,
// };

export default DialogList;
