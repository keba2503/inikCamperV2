import React from 'react';
import PropTypes from 'prop-types';
import BlogClient from '../../../(client-components)/(Admin)/Blog/BlogClient';

interface GuideIdPageProps {
  params: {
    id: string;
  };
}

const GuideIdPage: React.FC<GuideIdPageProps> = ({ params }) => {
  const { id } = params;

  return <BlogClient id={id} />;
};

GuideIdPage.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default GuideIdPage;
