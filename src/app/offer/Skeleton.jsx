const Skeleton = () => {
    return (
        <div className="animate-pulse">
            <div className="relative bg-gray-300 dark:bg-gray-700 h-[20rem] sm:h-[24rem] md:h-[28rem] lg:h-[32rem] xl:h-[30rem] z-10"></div>
            <div className="container px-1 sm:px-4 mb-24 mt-[25rem] sm:mt-[30rem] md:mt-[30rem] lg:mt-[30rem] xl:mt-[30rem] relative z-0">
                <div className="bg-gray-300 dark:bg-gray-700 h-6 rounded w-1/2 mb-4"></div>
                <div className="bg-gray-300 dark:bg-gray-700 h-4 rounded w-3/4 mb-4"></div>
                <div className="bg-gray-300 dark:bg-gray-700 h-4 rounded w-5/6 mb-4"></div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                    <div className="relative w-full h-64 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
                    <div className="relative w-full h-64 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
                    <div className="relative w-full h-64 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
                </div>
            </div>
        </div>
    );
};

export default Skeleton;