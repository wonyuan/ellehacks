import { post } from "./fetchRequests";
const baseURL = import.meta.env.VITE_BASE_URL;

interface scenarioProps {
  params: { situation: string };
}

export const fetchScenario = async ({ params }: scenarioProps) => {
    try {
      const data = await post({
        url: `${baseURL}/refined`,
        body: params,
      });
      console.log('data', data);
      return data;
    } catch (error) {
      console.error("Error fetching situation:", error);
      throw error;
    }
  };
  