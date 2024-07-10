"use client";
import React, { useState } from "react";
// import { FaCopy } from "react-icons/fa"; // Import the copy icon
// import axios from "axios";
import Link from "next/link";

export default function Home() {
  const [storyPlot, setStoryPlot] = useState("");
  const [storyLength, setStoryLength] = useState("short");
  const [creativityLevel, setCreativityLevel] = useState(50);
  const [narrativePerspective, setNarrativePerspective] = useState("");
  const [genre, setGenre] = useState("");
  const [characterName, setCharacterName] = useState("");
  const [characterDescription, setCharacterDescription] = useState("");
  const [settingDescription, setSettingDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [generatedStory, setGeneratedStory] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  const handleGenerateStory = async () => {
    const storyData = {
      topic: storyPlot,
      length: storyLength,
      temperature: creativityLevel / 100,
      genre: genre || null,
      narrative_perspective: narrativePerspective || null,
      character_name: characterName || null,
      character_description: characterDescription || null,
      setting_description: settingDescription || null,
    };

    try {
      // const response = await axios.post("/api/generate", storyData);
      const response = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify(storyData),
        headers: {
          "Content-Type": "application/json"
        }
      });
      
      const data = await response.json();
      console.log("Story generated:", data);
      setGeneratedStory(data.story);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      setError("Failed to generate story. Please try again.");
      setGeneratedStory(null); // Clear the story if there was an error
    }
  };

  const handleTextToSpeech = () => {
    if (generatedStory) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(generatedStory);
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleCopyStory = () => {
    if (generatedStory) {
      navigator.clipboard
        .writeText(generatedStory)
        .then(() => {
          setCopyStatus("Story copied to clipboard!");
          setTimeout(() => setCopyStatus(null), 2000); // Clear the message after 2 seconds
        })
        .catch((err) => {
          console.error("Could not copy text: ", err);
          setCopyStatus("Failed to copy story.");
          setTimeout(() => setCopyStatus(null), 2000); // Clear the message after 2 seconds
        });
    }
  };

  return (
    <div className="bg-blue-400 pt-8 pb-8 mx-auto sm:w-full p-4 md:p-8">
      <div className="max-w-5xl mx-auto p-6 bg-white shadow-black shadow-lg rounded-3xl">
        <h1 className="text-5xl text-center font-extrabold mb-4">
          AI Story Generator
        </h1>
        <h1 className="text-3xl font-sans text-blue-400 text-center font-bold mb-4">
          Make your own story!
        </h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="mb-4">
          <label className="block text-md font-bold text-black">
            Story Plot
          </label>
          <input
            type="text"
            value={storyPlot}
            onChange={(e) => setStoryPlot(e.target.value)}
            className="mt-1 block outline-blue-400 w-full p-2 border border-gray-300 rounded-md"
            placeholder="Ex: A librarian discovers a magical book that can bring stories to life."
          />
        </div>
        <div className="">
          <div className="mb-4">
            <label className="block text-md font-bold text-black">
              Story Length
            </label>
            <select
              value={storyLength}
              onChange={(e) => setStoryLength(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="short">Short</option>
              <option value="medium">Medium</option>
              <option value="long">Long</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-md font-bold text-black">
              Creativity Level
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={creativityLevel}
              onChange={(e) => setCreativityLevel(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-md font-bold text-black">
            Narrative Perspective (Optional)
          </label>
          <select
            value={narrativePerspective}
            onChange={(e) => setNarrativePerspective(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="first">First Person</option>
            <option value="third">Third Person</option>
            <option value="observer">Observer</option>
            <option value="camera">Camera Eye</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-md font-bold text-black">
            Genre (Optional)
          </label>
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="romance">Romance</option>
            <option value="fantasy">Fantasy</option>
            <option value="thriller">Thriller</option>
            <option value="mystery">Mystery</option>
            <option value="nonfiction">Non-Fiction</option>
            <option value="horror">Horror</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-md font-bold text-black">
            Character Name (Optional)
          </label>
          <input
            type="text"
            value={characterName}
            onChange={(e) => setCharacterName(e.target.value)}
            className="mt-1 block w-full outline-blue-400 p-2 border border-gray-300 rounded-md"
            placeholder="Ex: Jhon Doye"
          />
        </div>
        <div className="mb-4">
          <label className="block text-md font-bold text-black">
            Character Description (Optional)
          </label>
          <input
            type="text"
            value={characterDescription}
            onChange={(e) => setCharacterDescription(e.target.value)}
            className="mt-1 block w-full p-2 outline-blue-400 border border-gray-300 rounded-md"
            placeholder="Ex: Jhon Doye is a librarien who is working in the old library"
          />
        </div>
        <div className="mb-4">
          <label className="block text-md font-bold text-black">
            Setting Description (Optional)
          </label>
          <input
            type="text"
            value={settingDescription}
            onChange={(e) => setSettingDescription(e.target.value)}
            className="mt-1 block w-full p-2 outline-blue-400 border border-gray-300 rounded-md"
            placeholder="Ex: An old library with many windows."
          />
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleGenerateStory}
            className="p-3 px-16 hover:cursor-pointer transition duration-100 hover:scale-105 bg-blue-400 text-white font-bold rounded-md"
          >
            Generate Story
          </button>
        </div>
        {generatedStory && (
          <div className="mt-6 mb-6 p-4 bg-gray-100 border border-gray-300 rounded-3xl">
            <h2 className="text-2xl font-bold">Generated Story:</h2>
            <p>{generatedStory}</p>
            {/* <div className="flex justify-end mt-2">
              <button
                onClick={handleCopyStory}
                className="flex items-center p-2 bg-blue-400 text-white font-bold rounded-md hover:cursor-pointer transition duration-100 hover:scale-105"
              >
                <FaCopy className="mr-2" /> Copy
              </button>
            </div> */}
            {/* {copyStatus && (
              <p className="text-green-500 mt-2 text-right">{copyStatus}</p>
            )} */}
          </div>
        )}
      </div>
    </div>
  );
};

