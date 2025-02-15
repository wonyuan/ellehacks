import { post } from "./fetchRequests";
const baseURL = import.meta.env.VITE_BASE_URL;

interface classifyTextProps {
  params: { paragraph: string };
}

export const fetchPersona = async ({ params }: classifyTextProps) => {
  const data = await post({
    url: `${baseURL}/classify`,
    body: params,
  });
  console.log('data', data);   
  return data;
};
