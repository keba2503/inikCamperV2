import React from 'react';
import PropTypes from 'prop-types';
import FaqClient from '../../../(client-components)/(Admin)/Faq/FaqClient';

interface FaqIdPageProps {
  params: {
    id: string;
  };
}

const FaqIdPage: React.FC<FaqIdPageProps> = ({ params }) => {
  const { id } = params;

  return <FaqClient id={id} />;
};

FaqIdPage.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default FaqIdPage;
