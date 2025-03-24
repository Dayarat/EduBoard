import { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  TextField,
  Rating,
  Button,
  Paper,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import { Send, SentimentSatisfiedAlt, SentimentDissatisfied } from '@mui/icons-material';

const Message = () => {
  const [rating, setRating] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [feedbackType, setFeedbackType] = useState('general');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Here you would typically make an actual API call
      // await axios.post('/api/feedback', { rating, feedback, email, feedbackType });

      setSubmitSuccess(true);
      setRating(null);
      setFeedback('');
      setEmail('');
    } catch (err) {
      setError('Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          Share Your Feedback
        </Typography>

        {submitSuccess && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Thank you! Your feedback has been submitted successfully.
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Box mb={3}>
            <Typography variant="h6" gutterBottom>
              How would you rate your experience?
            </Typography>
            <Box display="flex" alignItems="center">
              <Rating
                value={rating}
                onChange={(_, newValue) => setRating(newValue)}
                size="large"
                icon={<SentimentSatisfiedAlt fontSize="inherit" color="primary" />}
                emptyIcon={<SentimentDissatisfied fontSize="inherit" />}
              />
              <Typography variant="body2" sx={{ ml: 2 }}>
                {rating ? `${rating} star${rating > 1 ? 's' : ''}` : 'Not rated'}
              </Typography>
            </Box>
          </Box>

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Feedback Type</InputLabel>
            <Select
              value={feedbackType}
              label="Feedback Type"
              onChange={(e) => setFeedbackType(e.target.value)}
            >
              <MenuItem value="general">General Feedback</MenuItem>
              <MenuItem value="bug">Bug Report</MenuItem>
              <MenuItem value="feature">Feature Request</MenuItem>
              <MenuItem value="ui">UI/UX Feedback</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Your Feedback"
            multiline
            rows={4}
            fullWidth
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            sx={{ mb: 3 }}
            required
            placeholder="What did you like or what can we improve?"
          />

          <TextField
            label="Email (Optional)"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 3 }}
            placeholder="If you'd like us to follow up with you"
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            endIcon={isSubmitting ? <CircularProgress size={24} /> : <Send />}
            disabled={isSubmitting || !feedback || !rating}
            sx={{ px: 4 }}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </Button>
        </form>
      </Paper>

      <Box mt={4} textAlign="center">
        <Typography variant="body2" color="text.secondary">
          We value your input to help improve EduBoard.
        </Typography>
      </Box>
    </Container>
  );
};

export default Message;
