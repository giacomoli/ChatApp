import React from 'react';
import PropTypes from 'prop-types';

import {
  AllowEmptyBtn,
  Search,
  Card,
} from './index'
import {
  ColoredLine,
  Spinner,
} from '../../index'
import { StyledList } from './styles'
import { ContentGrid, P } from '../../../styles'

function List(props) {
  const {
    listProps: {
      list,
      fetching,
      errorMessage,
      error,
    },
    cardProps,
    additionalBtnProps,
    getCardData
  } = props

  if (error) {
    return <P>Error {error}</P>
  } else if (fetching) {
    return <Spinner />
  }

  return (
    <StyledList>
      <Search />
      <ColoredLine color="secondary"/>
      <AllowEmptyBtn {...additionalBtnProps} />
      {
        list.length > 0
          ? <ContentGrid
              container
              direction="column"
            >
            {
              list.map(
                card => (
                  <Card
                    key={card.id}
                    data={getCardData(card)}
                    {...cardProps}
                  />
                )
              )
            }
            </ContentGrid>
          : <P center>{errorMessage}</P>
      }
    </StyledList>
  );
}

List.propTypes = {
  listProps: PropTypes.shape({
    list: PropTypes.array,
    fetching: PropTypes.bool.isRequired,
    error: PropTypes.object,
  }),
  additionalBtnProps: PropTypes.object,
  cardProps: PropTypes.object.isRequired,
  getCardData: PropTypes.func.isRequired,
};

export default List;
