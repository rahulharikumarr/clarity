import fetch from "node-fetch";

export async function POST(req) {
  const { text } = await req.json();
  const apiKey = process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY;

  if (!text) {
    return new Response(
      JSON.stringify({ error: "Text input is required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "API key is missing" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  const prompt = `
    Here is a journal entry, give a text summary of the journal entry. Then analyze the sentiment and summarize the mood for the entry. Keep the original entry and add a mood rating at the end.

    Journal Entry: "${text}"

    Polished Journal Entry:
  `;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000); // 15 seconds timeout

  try {
    const response = await fetch("https://api-inference.huggingface.co/models/google/flan-t5-large", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: prompt, parameters: { max_length: 300 } }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    const data = await response.json();
    console.log("Hugging Face API raw response:", data);

    if (!data || response.status !== 200) {
      throw new Error(data.error || "Failed to fetch polished text");
    }

    const polishedText =
      Array.isArray(data) && data.length > 0
        ? data[0]?.generated_text
        : data?.generated_text || "No response from model";

    return new Response(
      JSON.stringify({ polishedText }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Hugging Face API error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to process text" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
