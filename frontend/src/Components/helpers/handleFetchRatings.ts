import { fetchNoToken } from "../hooks/useFetch";

export const fetchRatings = async (_id: string) => {
  const req = await fetchNoToken(`rating/${_id}`, {});
  const answ = await req.json();
  if (!answ.status) return;
  return answ.ratings;
};
