import { get } from "./fetchRequests";
const baseURL = import.meta.env.VITE_BASE_URL;

interface scenarioProps {
  params: { situation: string };
}

export const fetchScenario = async ({ params }: scenarioProps) => {
    try {
      const data = await get({
        url: `${baseURL}/refined`,
        params: params,
      });
      console.log('data', data);
      return data;
    } catch (error) {
      console.error("Error fetching situation:", error);
      throw error;
    }
  };
  