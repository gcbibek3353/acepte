// ...existing code...
"use client";
import React, { useState } from "react";

type Blank = { position: number; correctWord: string };

export default function Page() {
  const [questionId, setQuestionId] = useState("");
  const [title, setTitle] = useState("");
  const [audioTranscribedText, setAudioTranscribedText] = useState("");
  const [passage, setPassage] = useState("");
  const [difficulty, setDifficulty] = useState<"EASY" | "MEDIUM" | "HARD">(
    "EASY"
  );
  const [blanks, setBlanks] = useState<Blank[]>(
    Array.from({ length: 5 }, (_, i) => ({ position: i + 1, correctWord: "" }))
  );
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const updateBlank = (index: number, value: string) => {
    setBlanks((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], correctWord: value };
      return next;
    });
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!audioFile) {
      setStatus("Please choose an audio file.");
      return;
    }
    if (blanks.length !== 5) {
      setStatus("Exactly 5 blanks are required.");
      return;
    }
    setLoading(true);
    setStatus("Requesting presigned URL...");
    try {
      // 1) Request presigned URL from backend
      const creds = { email: `admin@gmail.com`, password: `Admin@1234` }; // TODO : remove this hardcoded value later
      const presignedRes = await fetch("/api/v1/s3/put-object-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(creds),
      });
      if (!presignedRes.ok) {
        const err = await presignedRes.text();
        setStatus(`Failed to get presigned URL: ${presignedRes.status} ${err}`);
        setLoading(false);
        return;
      }
      const presignedJson = await presignedRes.json();
      const uploadUrl: string = presignedJson?.url;
      if (!uploadUrl) {
        setStatus("Presigned URL not returned by server.");
        setLoading(false);
        return;
      }

      // 2) Upload audio file to S3 with PUT
      setStatus("Uploading audio to S3...");
      const putRes = await fetch(uploadUrl, {
        method: "PUT",
        headers: {
          // use file mime type if available
          ...(audioFile.type ? { "Content-Type": audioFile.type } : {}),
        },
        body: audioFile,
      });

      if (!putRes.ok) {
        const errText = await putRes.text().catch(() => "");
        setStatus(`Upload failed: ${putRes.status} ${errText}`);
        setLoading(false);
        return;
      }

      // 3) Construct audio URL to send to create-question endpoint.
      // Assume backend returned the accessible object URL in presigned response.
      // If presigned URL points to upload endpoint, backend might return final object URL instead.
      const audioURL = presignedJson.objectUrl ?? presignedJson.url;

      setStatus("Creating question in backend...");
      const payload = {
        questionId,
        title,
        audioTranscribedText,
        passage,
        difficulty,
        blanks: blanks.map((b) => ({
          position: b.position,
          correctWord: b.correctWord,
        })),
        audioUrl: audioURL,
      };

      const createRes = await fetch(
        "/api/v1/admin/create-question/listening/fillTheBlanks",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!createRes.ok) {
        const err = await createRes.text();
        setStatus(`Create question failed: ${createRes.status} ${err}`);
        setLoading(false);
        return;
      }

      setStatus("Question created successfully.");
    } catch (err) {
      setStatus(`Error: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-sm border">
      <h2 className="text-lg font-semibold mb-4">
        Create Fill-the-Blanks Listening Question
      </h2>

      <form onSubmit={handleCreate} className="space-y-4">

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Question ID
          </label>
          <input
            value={questionId}
            onChange={(e) => setQuestionId(e.target.value)}
            required
            className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Audio Transcribed Text
          </label>
          <textarea
            value={audioTranscribedText}
            onChange={(e) => setAudioTranscribedText(e.target.value)}
            rows={3}
            className="mt-1 w-full px-3 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Passage
          </label>
          <textarea
            value={passage}
            onChange={(e) => setPassage(e.target.value)}
            rows={5}
            className="mt-1 w-full px-3 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Difficulty
          </label>
          <select
            value={difficulty}
            onChange={(e) =>
              setDifficulty(e.target.value as "EASY" | "MEDIUM" | "HARD")
            }
            className="mt-1 w-full px-3 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="EASY">Easy</option>
            <option value="MEDIUM">Medium</option>
            <option value="HARD">Hard</option>
          </select>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">
            Blanks (exactly 5)
          </p>
          <div className="space-y-2">
            {blanks.map((b, idx) => (
              <div key={b.position} className="flex items-center gap-2">
                <span className="text-xs text-gray-500 w-20">
                  Position {b.position}
                </span>
                <input
                  value={b.correctWord}
                  onChange={(e) => updateBlank(idx, e.target.value)}
                  required
                  className="flex-1 px-3 py-1.5 border rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Audio File
          </label>
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setAudioFile(e.target.files?.[0] ?? null)}
            required
            className="mt-1 w-full text-sm file:mr-3 file:px-4 file:py-2 file:border-0 file:rounded-md file:bg-black file:text-white hover:file:bg-gray-800"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {loading ? "Processing..." : "Create Question"}
        </button>
      </form>

      {status && (
        <div className="mt-4 text-sm text-gray-700">
          <strong>Status:</strong> {status.substring(0, 500)}
        </div>
      )}
    </div>

  );
}