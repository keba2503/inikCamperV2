import React from 'react';
import PropTypes from 'prop-types';
import VideoClient from '../../../(client-components)/(Admin)/Videos/VideoClient';

interface GuideIdPageProps {
  params: {
    id: string;
  };
}

const VideoIdPage: React.FC<GuideIdPageProps> = ({ params }) => {
  const { id } = params;

  return <VideoClient id={id} />;
};

VideoIdPage.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default VideoIdPage;
