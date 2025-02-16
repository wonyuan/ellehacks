import { post } from "./fetchRequests";
const baseURL = import.meta.env.VITE_BASE_URL;

interface chatProps {
  params: {
    classification: string;
    situation: string;
    user_input: string;
  }
}

export const fetchChat = async ({ params }: chatProps) => {
    try {
      const data = await post({
        url: `${baseURL}/chat`,
        body: params,
      });
      return data;
    } catch (error) {
      console.error('Error fetching chatbot response:', error);
    }
  };