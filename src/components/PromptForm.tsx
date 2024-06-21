import axios from "axios";
import { Lightbulb, Loader } from "lucide-react";
import { Recursive } from "next/font/google";
import { useState } from "react";

const font = Recursive({ subsets: ["latin"] });

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import Image from "next/image";
import { getRandomPrompt } from "../utils/index";
import { Button } from "./ui/button";

export default function PromptForm({}: any) {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsGenerating(true);
    setIsModalOpen(true);

    try {
      const response = await axios.post("/api/openai", { prompt });

      if (response?.status === 200) {
        setGeneratedImageUrl(response?.data?.imageData[0]?.url);
        setIsGenerating(false);
      } else {
        setGeneratedImageUrl("");
        setIsGenerating(false);
      }
      console.log(response?.data?.imageData[0]?.url);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
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
          className="rounded-full py-1.5 px-4 text-sm leading-6 ring-1 ring-gray-900/10 hover:ring-[#f1b7f1] m-2 shadow-sm w-full sm:w-fit bg-[#e79de7] sm:bg-transparent text-white sm:text-black"
        >
          Generate
        </button>

        <Dialog
          open={isModalOpen}
          onOpenChange={(isOpen) => {
            !isGenerating && setIsModalOpen(isOpen);
          }}
        >
          <DialogContent hideCloseIcon className={font.className}>
            <DialogHeader>
              <DialogDescription className="flex justify-center items-center">
                {isGenerating && (
                  <>
                    <Loader className="animate-spin my-4" />
                    <span className="ml-2">Generating...</span>
                  </>
                )}

                {!isGenerating && generatedImageUrl && (
                  <>
                    <div className="flex flex-col items-center">
                      <Image
                        src={generatedImageUrl ?? "/placeholder.png"}
                        width={500}
                        height={500}
                        alt="generated image"
                      />

                      <div className="w-full flex gap-2 mt-5">
                        <Button
                          variant="ghost"
                          onClick={() => setIsModalOpen(false)}
                          className="w-full "
                        >
                          Continue
                        </Button>
                        <Button className="w-full bg-gradient-to-tr from-[#e79de7] to-[#f28df2] text-black hover:to-[#ee77ee]">
                          Mint NFT
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-2 mt-1 flex sm:justify-center">
        <div
          className="relative flex gap-2 overflow-hidden mt-2 rounded-full py-1.5 px-4 text-sm leading-6 border-1 border-gray-300 bg-gradient-to-r from-gray-50 to-gray-100 bg-opacity-50 ring-1 focus:border-none focus:ring-gray-900/20 focus:outline-none ring-gray-900/10 hover:ring-[#f1b7f1] cursor-pointer mx-auto select-none"
          onClick={() => {
            handleSupriseMe();
          }}
        >
          <Lightbulb className="sm:h-5 h-3 sm:w-5 w-3" />
          <span className="absolute inset-0 hidden lg:absolute md:absolute" />
          Suprise me
        </div>
      </div>
    </form>
  );
}
