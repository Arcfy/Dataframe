import React from "react";

const LandingPage: React.FC = () => {
  return (
    <div className="h-screen bg-gray-700">
      <main className="flex flex-col items-center justify-center flex-1 text-center py-16">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Dataframe Demo
        </h1>
        <p className="text-lg text-gray-600 max-w-lg mx-auto">
          In progress.
        </p>
      </main>
    </div>
  );
};

export default LandingPage;