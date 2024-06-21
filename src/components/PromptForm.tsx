import { useState } from "react";

export default function PromptForm({}: any) {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(prompt, "promptt");
  };

  return (
    <form onSubmit={handleSubmit} className="animate-in fade-in duration-700">
      <div className="flex flex-col gap-2 sm:gap-0 sm:flex-row justify-center items-center p-2">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          name="prompt"
          className="bg-transparent w-[250px] lg:w-[500px] md:w-[350px] relative overflow-hidden rounded-full py-1.5 px-4 text-sm leading-6 ring-1 focus:border-none focus:ring-gray-900/20 focus:outline-none ring-gray-900/10 hover:ring-[#f1b7f1] shadow-sm"
          placeholder="Enter a prompt..."
        />
        <button
          type="submit"
          className="relative overflow-hidden rounded-full py-1.5 px-4 text-sm leading-6 ring-1 ring-gray-900/10 hover:ring-[#f1b7f1] m-2 shadow-sm w-full sm:w-fit bg-[#e79de7] sm:bg-transparent text-white sm:text-black"
        >
          Generate
        </button>
      </div>
    </form>
  );
}
