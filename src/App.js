"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            messages: [
              {
                role: "system",
                content: "You are an AI sales agent assistant that helps people find out about Wetility. Wetility is a smart energy company that sells solar products.",
              },
              ...chatHistory,
              { role: "user", content: "Hi" }
            ]
          })
        });

        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }

        const result = await response.json();

        setChatHistory(prevHistory => [
          ...prevHistory,
          { role: "user", content: "Hi" },
          { role: "system", content: result.choices[0].message.content ?? "No response" }
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <h1 className="text-4xl font-bold">Welcome to Wetility</h1>

      <div className="flex flex-col w-full p-4">
        {chatHistory.map((message, index) => (
          <div
            key={index}
            className={`${
              message.role === "system" ? "bg-blue-950 text-white self-start w-fit" : "bg-yellow-500 text-blue-950 self-end w-fit"
            } p-4 rounded-lg mt-2`}
          >
            {message.content}
          </div>
        ))}
      </div>
    </main>
  );
}
