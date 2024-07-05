import React from 'react';
import PropTypes from 'prop-types';
import HeroClient from '../../../(client-components)/(Admin)/Hero/HeroClient';

interface GuideIdPageProps {
  params: {
    id: string;
  };

}

const HeroIdPage: React.FC<GuideIdPageProps> = ({ params }) => {
  const { id } = params;

  return <HeroClient id={id} />;
};

HeroIdPage.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default HeroIdPage;
