const RateLimitUI = () => {
    return (
        <div>
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-white shadow-lg rounded-2xl p-8 max-w-sm w-full text-center border border-red-300">
                    <div className="text-red-500 text-5xl mb-4">⚠️</div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">
                        Rate Limit Reached
                    </h1>
                    <p className="text-gray-600 mb-6">
                        You have exceeded the allowed request limit.
                        Please wait a moment and try again.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg">
                        Retry
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RateLimitUI
