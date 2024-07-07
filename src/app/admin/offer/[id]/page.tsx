import React from 'react';
import PropTypes from 'prop-types';
import OfferClient from '../../../(client-components)/(Admin)/Offer/OfferClient';

interface GuideIdPageProps {
  params: {
    id: string;
  };
}

const OfferIdPage: React.FC<GuideIdPageProps> = ({ params }) => {
  const { id } = params;

  return <OfferClient id={id} />;
};

OfferIdPage.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default OfferIdPage;
