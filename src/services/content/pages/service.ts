import { CONTENT_URLS } from "../shared/config";
import type {
  Page,
  PagesIndexDoc,
} from "./types";

let pagesIndexPromise: Promise<PagesIndexDoc> | null = null;

const pageDetailPromises = new Map<
  string,
  Promise<Page>
>();
export async function getPages() {
  const response = await fetch(CONTENT_URLS.PAGES);
  return response.json();
}

async function fetchIndex() {
  const response = await fetch(CONTENT_URLS.PAGES);
  return response.json();
}
export async function getPagesIndex() {
  pagesIndexPromise ??= fetchIndex();

  return pagesIndexPromise;
}
export async function getPage(id: string) {
  if (!pageDetailPromises.has(id)) {
    pageDetailPromises.set(id, fetchPage(id));
  }

  return pageDetailPromises.get(id)!;
}

async function fetchPage(id: string) {
  const response = await fetch(`${CONTENT_URLS.PAGES}/${id}`);
  return response.json();
}