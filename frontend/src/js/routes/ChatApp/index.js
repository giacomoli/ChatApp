import React from 'react'
import { Switch } from 'react-router-dom'
import PropTypes from 'prop-types'

import {
  Nav,
  PropsRoute,
} from '../../components'
import {
  ChatBase,
  Menu,
} from '../../containers'
import { AppContainer } from '../../styles'

function ChatAppRoute({match, handleHeader, ...props}) {

  return (
    <AppContainer>
      <Nav handleHeader={handleHeader} />
      <Menu />
      <Switch>
        <PropsRoute
          exact
          path={match.url}
          component={ChatBase}
          content="chatRoom"
          {...props}
          />
        <PropsRoute
          path={`${match.url}/create room`}
          component={ChatBase}
          content="form"
          {...props}
        />
      </Switch>
    </AppContainer>
  );
}

ChatAppRoute.propTypes = {
  match: PropTypes.object.isRequired,
  handleHeader: PropTypes.func.isRequired,
}

export default ChatAppRoute
