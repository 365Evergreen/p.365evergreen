import { CONTENT_URLS } from "../shared/config";

export async function getTabs() {
  const response = await fetch(CONTENT_URLS.TABS);
  return response.json();
}