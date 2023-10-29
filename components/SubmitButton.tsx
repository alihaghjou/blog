import { useFormStatus } from "react-dom";

export function SubmitButton({text} : {text: string}) {
    const { pending } = useFormStatus();
  
    return (
      <button
        disabled={pending}
        type="submit"
        className="disabled:bg-blue-500 disabled:text-blue-200 disabled:ring-0 hover:bg-green-500 hover:text-green-100 ring-1 ring-green-500 rounded px-4 py-2 my-4 mb-6 self-center"
      >
        {pending ? "Sending" : text}
      </button>
    );
  }
  