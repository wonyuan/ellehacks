import { post } from "./fetchRequests";
const baseURL = import.meta.env.VITE_BASE_URL;

interface evaluationProps {
  params: { 
    chat_history: [{ text: string; isUser: boolean }],
    scenario: string
  };
}

export const fetchEvaluation = async ({ params }: evaluationProps) => {
  try {
    console.log("AHHH", params);

    const data = await post({
      url: `${baseURL}/evaluation`,
      body: { 
        scenario: params.scenario, 
        chat_history: params.chat_history  
      },
    });

    console.log("data", data);
    return data;
  } catch (error) {
    console.error("Error fetching evaluation:", error);
    throw error;
  }
};
