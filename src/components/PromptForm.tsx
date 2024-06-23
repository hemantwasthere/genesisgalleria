import axios from "axios";
import { Lightbulb, Loader } from "lucide-react";
import { Recursive } from "next/font/google";
import Image from "next/image";
import { useState } from "react";

const font = Recursive({ subsets: ["latin"] });

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { getRandomPrompt } from "../utils/index";
import { Button } from "./ui/button";

export default function PromptForm({}: any) {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ipfsHash, setIpfsHash] = useState("");
  const [generatedImageUrl, setGeneratedImageUrl] = useState(
    // ""
    // "https://shorturl.at/Dvlqm"
    "https://oaidalleapiprodscus.blob.core.windows.net/private/org-CF0C6y3lv4lQ8ilB5bQ9SAna/user-C41QIYbDmRAXSSXjMq9xyjUJ/img-5ERbwKYIQU8FdpcBIuZBtBiP.png?st=2024-06-23T02:46:36Z&se=2024-06-23T04:46:36Z&sp=r&sv=2023-11-03&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-06-22T23:04:49Z&ske=2024-06-23T23:04:49Z&sks=b&skv=2023-11-03&sig=Dr6O1BbLlhOqlmxeBJ37NcEFXHpwG1MlNdvSqMSkNBU%3D"
    // "https://oaidalleapiprodscus.blob.core.windows.net/private/org-CF0C6y3lv4lQ8ilB5bQ9SAna/user-C41QIYbDmRAXSSXjMq9xyjUJ/img-tJPa6t6Cbp4N5cADLqbYeGI3.png?st=2024-06-23T02%3A55%3A38Z&se=2024-06-23T04%3A55%3A38Z&sp=r&sv=2023-11-03&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-06-22T14%3A08%3A33Z&ske=2024-06-23T14%3A08%3A33Z&sks=b&skv=2023-11-03&sig=3dxSdAs6Ow1YjDQkf2YSZfSuDYwJRHNmSTPD5esnoEM%3D"
  );

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

  const JWT = process.env.NEXT_PUBLIC_PINATA_JWT!;

  async function uploadByURL(url: string) {
    try {
      const blob = new Blob([generatedImageUrl], {
        type: "text/plain",
      });

      const file = new File([blob], "file");

      const data = new FormData();
      data.append("file", file);

      const upload = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${JWT}`,
            Accept: "text/plain",
            "Allow-Access-Control-Origin": "*",
          },
          body: data,
        }
      );
      const uploadRes = await upload.json();
      setIpfsHash(uploadRes.IpfsHash);
      console.log(uploadRes, "uploadRes");
    } catch (error) {
      console.log(error);
    }
  }

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

        {/* <Dialog
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
                        <Button
                          onClick={async () => {
                            generatedImageUrl && uploadByURL(generatedImageUrl);
                          }}
                          className="w-full bg-gradient-to-tr from-[#e79de7] to-[#f28df2] text-black hover:to-[#ee77ee]"
                        >
                          Mint NFT
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog> */}

        <Dialog open={true}>
          <DialogContent hideCloseIcon className={font.className}>
            <DialogHeader>
              <DialogDescription className="flex justify-center items-center">
                <>
                  <div className="flex flex-col items-center">
                    <Image
                      src={"/vercel.svg"}
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
                      <Button
                        onClick={async () => {
                          uploadByURL(generatedImageUrl);
                        }}
                        className="w-full bg-gradient-to-tr from-[#e79de7] to-[#f28df2] text-black hover:to-[#ee77ee]"
                      >
                        Mint NFT
                      </Button>
                    </div>
                  </div>
                </>
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
