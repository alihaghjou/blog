"use client";

import { ExclamationTriangleIcon, InformationCircleIcon } from "@heroicons/react/24/outline";

export default function Alert({
  state,
  message,
}: {
  state: string;
  message: string;
}) {
  return (
    <>
      {state === "success" && (
        <div
          className="flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 "
          role="alert"
        >
          <InformationCircleIcon height={30} />
          <span className="sr-only">Info</span>
          <div>
            <span className="font-medium">Success alert!</span> {message}
          </div>
        </div>
      )}
      {state === "error" && (
        <div
          className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
          role="alert"
        >
          <ExclamationTriangleIcon height={30} />
          <div>
            <span className="font-medium">Danger alert!</span> {message}
          </div>
        </div>
      )}
    </>
  );
}
