import React from 'react';
import PropTypes from 'prop-types';
import ReviewClient from '../../../(client-components)/(Admin)/Review/ReviewClient';

interface GuideIdPageProps {
  params: {
    id: string;
  };
}

const BlogIdPage: React.FC<GuideIdPageProps> = ({ params }) => {
  const { id } = params;

  return <ReviewClient id={id} />;
};

BlogIdPage.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default BlogIdPage;
