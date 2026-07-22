import { CONTENT_URLS } from "../shared/config";
import type {
  Post,
  PostsIndexDoc,
} from "./types";

let postsIndexPromise: Promise<PostsIndexDoc> | null = null;

const postDetailPromises = new Map<
  string,
  Promise<Post>
>();
export async function getPosts() {
  const response = await fetch(CONTENT_URLS.POSTS);
  return response.json();
}

async function fetchIndex() {
  const response = await fetch(CONTENT_URLS.POSTS);
  return response.json();
}
export async function getPostsIndex() {
  postsIndexPromise ??= fetchIndex();

  return postsIndexPromise;
}
export async function getPost(id: string) {
  if (!postDetailPromises.has(id)) {
    postDetailPromises.set(id, fetchPost(id));
  }

  return postDetailPromises.get(id)!;
}

async function fetchPost(id: string) {
  const response = await fetch(`${CONTENT_URLS.POSTS}/${id}`);
  return response.json();
}