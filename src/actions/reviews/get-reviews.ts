"use server";

export default async function getReviews() {
  const reviewsResponse = await fetch(`${process.env.API_URL}/reviews`, {
    method: "GET",
  });

  const reviews = await reviewsResponse.json();
  return reviews;
}
