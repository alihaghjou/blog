"use client";

export default function Toolpit({
  children,
  text,
}: {
  children: React.ReactNode;
  text: string;
}) {
  return (
    <div className="p-1">
      <div className="group relative w-max">
        {children}
        <span className="pointer-events-none text-sm absolute bg-sky-900 text-sky-200 p-1 rounded -bottom-9 left-0 text-center w-max opacity-0 transition-opacity group-hover:opacity-100">
          {text}
        </span>
      </div>
    </div>
  );
}
