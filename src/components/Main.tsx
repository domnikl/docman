const React = require("react");

import FileList from "./FileList";

const Main = () => {
  return (
    <div class="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-50 text-gray-800">
      <div class="fixed flex flex-col top-0 left-0 w-64 bg-gray-900 h-full shadow-lg">
        <div class="flex items-center pl-6 h-20 border-b border-gray-800">
          <div class="ml-1">
            <p class="ml-1 text-md font-medium tracking-wide truncate text-gray-100 font-sans">
              docman
            </p>
            <div class="badge">
              <span class="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-blue-800 bg-blue-100 rounded-full">
                Organizing
              </span>
            </div>
          </div>
        </div>
        <div class="overflow-y-auto overflow-x-hidden flex-grow">
          <FileList />
        </div>
      </div>
    </div>
  );
};

export default Main;
