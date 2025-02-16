import { post } from "./fetchRequests";
const baseURL = import.meta.env.VITE_BASE_URL;

interface Message {
  text: string;
  isUser: boolean;
}

interface evaluationProps {
  params: { chat_history: Message[] };
}

export const fetchEvaluation = async ({ params }: evaluationProps) => {
  try {
    console.log("AHHH", params);

    // Convert chat history to an array of strings
    const inputs = params.chat_history.map((msg) => msg.text);

    const data = await post({
      url: `${baseURL}/evaluation`,
      body: { inputs }, // Send as an array of strings
    });

    console.log("data", data);
    return data;
  } catch (error) {
    console.error("Error fetching evaluation:", error);
    throw error;
  }
};
