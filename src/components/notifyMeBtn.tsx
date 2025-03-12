"use client"

import { updateContactPrefs } from "@/serverActions";
import { useState } from "react";

export default function NotifyMeBtn({ userId, stockSymbol }) {
  const [selections, setSelections] = useState({
    inApp: false,
    email: false,
    push: false,
  });

  const [showOptions, setShowOptions] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false)


  if (showOptions) {
    window.addEventListener('click', (e) => {
      if (e.target.localName !== "button" || e.target.nodeName !== "BUTTON") { setShowOptions(false) }
    })
  }


  const toggleSelection = (type: keyof typeof selections) => {
    setSelections((prev) => ({ ...prev, [type]: !prev[type] }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault()
    setShowOptions(false);
    try {
      for (const key in selections) {
        await updateContactPrefs(userId, stockSymbol, key, selections[key])
      }
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
      }, 1500);

    } catch (error) {
      setIsError(true)
    } finally {
      setTimeout(() => {
        setIsError(false)
      }, 2000);
    }
  }


  return (
    <div className="relative">
      {/* Button to Show Options */}
      {!showOptions && (
        <button
          onClick={() => setShowOptions(true)}
          className="px-2 py-1 ml-1 bg-blue-900 text-white rounded-md cursor-pointer"
        >
          Set Alerts
        </button>
      )}
      {isSubmitted && (
        <p className="text-green-600 text-xs block absolute top-full ml-2 mb-4 w-full">Alerts Updated!</p>
      )}

      {isError && (
        <p className="text-red-600 text-xs block absolute top-full ml-2 mb-4 w-full">Set alert failed!</p>
      )}

      {/* Notification Options */}
      {showOptions && (
        <div className="ml-2 mt-8">


          <div className="flex flex-col gap-2">
            {Object.entries(selections).map(([key, value]) => (
              <button
                key={key}
                onClick={() => toggleSelection(key as keyof typeof selections)}
                className={`px-2 py-1 rounded-md transition-all duration-200 cursor-pointer ${value ? "hover:bg-blue-600" : "hover:bg-gray-400"}  ${value ? "bg-blue-900 text-white" : "bg-gray-300 text-black"
                  }`}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            ))}
          </div>

          {/* Submit Button */}
          <button
            onClick={async (e) => { handleSubmit(e) }}
            className="mt-4 mb-2 px-2 py-1 bg-green-600 text-white rounded-md cursor-pointer"
          >
            Submit
          </button>


        </div>
      )}
    </div>
  )
}