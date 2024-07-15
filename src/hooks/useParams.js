import { useSearchParams } from "react-router-dom";

export default function useParams(latParam, lngParam) {
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get(latParam);
  const lng = searchParams.get(lngParam);
  return [lat, lng];
}
