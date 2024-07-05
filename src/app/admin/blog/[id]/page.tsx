import React from 'react';
import PropTypes from 'prop-types';
import HeroClient from '../../../(client-components)/(Admin)/Blog/BlogClient';

interface GuideIdPageProps {
  params: {
    id: string;
  };
}

const BlogIdPage: React.FC<GuideIdPageProps> = ({ params }) => {
  const { id } = params;

  return <HeroClient id={id} />;
};

BlogIdPage.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default BlogIdPage;
