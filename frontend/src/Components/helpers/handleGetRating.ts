export const getRating = (reviews: any) => {
  let sum = 0;
  reviews.forEach((review: any) => {
    sum += review.stars;
  });
  return sum / reviews.length;
};
