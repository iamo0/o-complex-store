"use server";

import { Review } from "@/types/review";

export default async function getReviews() {
  const reviewsResponse = await fetch(`${process.env.API_URL}/reviews`, {
    method: "GET",
  });

  const reviews = await reviewsResponse.json() as Review[];
  return reviews;
}
