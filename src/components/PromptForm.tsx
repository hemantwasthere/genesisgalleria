import { Lightbulb } from "lucide-react";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader } from "lucide-react";

import { getRandomPrompt } from "../utils/index";
export default function PromptForm({}: any) {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setIsModalOpen(true);
    console.log(prompt, "promptt");
    // setIsLoading(false);
  };
  const handleSupriseMe = () => {
    const randomPrompt = getRandomPrompt(prompt);
    setPrompt(randomPrompt);
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

        <Dialog
          open={isModalOpen}
          onOpenChange={(isOpen) => {
            setIsModalOpen(isOpen);
          }}
        >
          <DialogTrigger></DialogTrigger>
          <DialogContent>
            <DialogHeader>
              {/* <DialogTitle>Image action</DialogTitle> */}
              <DialogDescription className="flex justify-center items-center">
                {isLoading && (
                  <>
                    <Loader className="animate-spin my-4" />
                    <span className="ml-2">Generating...</span>
                  </>
                )}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-2 mt-1 flex sm:justify-center">
        <div
          className="relative flex gap-2 overflow-hidden mt-2 rounded-full py-1.5 px-4 text-sm leading-6 border-1 border-gray-300 bg-gradient-to-r from-gray-50 to-gray-100 bg-opacity-50 ring-1 focus:border-none focus:ring-gray-900/20 focus:outline-none ring-gray-900/10 hover:ring-[#f1b7f1] cursor-pointer mx-auto"
          onClick={() => {
            handleSupriseMe();
          }}
        >
          <Lightbulb className="sm:h-5 h-3 sm:w-5 w-3" />
          <span
            className="absolute inset-0 hidden lg:absolute md:absolute"
            aria-hidden="true"
          />
          Suprise me
        </div>
      </div>
    </form>
  );
}
