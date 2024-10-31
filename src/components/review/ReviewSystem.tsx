import {
  Box,
  Button,
  Link,
  List,
  ListItem,
  ListItemText,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { IReview } from "./IReview";
import reviewData from "../../config/db/data.json";
import { GitHub } from "@mui/icons-material";

export const ReviewSystem: React.FC = () => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [reviews, setReviews] = useState<IReview[]>(reviewData);

  const handleSubmit = () => {
    const newReview = {
      id: Math.random().toString(36).substring(2, 8),
      rating,
      comment,
      date: new Date().toLocaleDateString(),
    };

    setReviews([newReview, ...reviews]);
    setRating(0);
    setComment("");
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 3 }}>
      <div>
        <Typography variant='h6' gutterBottom>
          Leave a Review
        </Typography>
        <Link
          href='https://github.com/mkusztal/review-system-nettribes'
          target='_blank'
          rel='noreferrer'
          color='inherit'
        >
          <GitHub />
        </Link>
      </div>
      <Rating
        name='Rating'
        value={rating}
        onChange={(e, newValue: number | null) => setRating(newValue || 0)}
      />
      <TextField
        fullWidth
        label='Comment'
        variant='outlined'
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={4}
        multiline
      />
      <Button
        type='submit'
        variant='contained'
        color='info'
        disabled={!rating || !comment}
        onClick={handleSubmit}
      >
        Submit
      </Button>

      <List sx={{ mt: 4 }}>
        {reviews.length > 0 &&
          reviews.map((review) => (
            <ListItem key={review.id}>
              <ListItemText
                primary={
                  <>
                    <Rating value={review.rating} readOnly />
                    <Typography>{review.date}</Typography>
                  </>
                }
                secondary={review.comment}
              />
            </ListItem>
          ))}
      </List>
    </Box>
  );
};
