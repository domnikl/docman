const React = require("react");

import FileList from "./FileList";
import PdfPreview from "./PdfPreview";

const Main = () => {
  return (
    <div class="min-h-screen flex flex-row flex-auto flex-shrink-0 antialiased bg-gray-50 text-gray-800">
      <div class="w-2/6 bg-gray-900 h-screen shadow-lg">
        <div class="flex items-center pl-6 h-20 border-b border-gray-800">
          <p class="text-md font-medium tracking-wide truncate text-gray-100 font-sans pr-2">
            docman
          </p>
          <div class="badge">
            <span class="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-blue-800 bg-blue-100 rounded-full">
              Organizing
            </span>
          </div>
        </div>
        <div class="overflow-y-auto overflow-x-hidden flex-grow">
          <FileList />
        </div>
      </div>

      <div class="h-screen">
        <PdfPreview />
      </div>
    </div>
  );
};

export default Main;
