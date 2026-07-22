import { CONTENT_URLS } from "../shared/config";

export async function getResources() {
  const response = await fetch(CONTENT_URLS.RESOURCES);
  return response.json();
}