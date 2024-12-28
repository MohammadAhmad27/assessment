import React, { Suspense, lazy } from "react";
const Data = lazy(() => import("@/components/Data"));

export default function Page() {
  return (
    <div className="flex flex-col justify-center items-center gap-8 max-md:px-4 px-8 py-10">
      <h1 className="text-5xl max-md:text-3xl text-blue-500 font-bold">
        Assessment
      </h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Data />
      </Suspense>
    </div>
  );
}
