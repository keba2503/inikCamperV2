'use client';

import VideoForm from '../../(client-components)/(Admin)/Videos/VideoForm';
import VideoTable from '../../(client-components)/(Admin)/Videos/VideoTable';

const VideoPage = () => {
    return (
        <main className="flex flex-col items-center p-2 md:p-4 lg:p-6 min-h-screen">
            <div className="w-full max-w-7xl">
                <h1 className={`mb-4 text-2xl md:text-3xl text-center`}>
                    Videos
                </h1>
                <VideoForm/>
                <div className="mt-4">
                    <VideoTable/>
                </div>
            </div>
        </main>
    );
};

export default VideoPage;
