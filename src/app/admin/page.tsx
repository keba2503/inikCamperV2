'use client';

export default function Page() {
    return (
        <main className="space-y-8 p-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow dark:bg-gray-800 p-4 min-h-[100px]">
                    <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white mb-3">
                        Panel de administrador
                    </h5>
                </div>
            </div>
        </main>
    );
}
