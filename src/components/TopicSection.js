// src/components/TopicSection.js
import React, { useState } from 'react';
import { Box, Button, Typography, Radio, RadioGroup, FormControlLabel, FormControl, Paper } from '@mui/material';

const TopicSection = ({ topic, onBack, updateStatistics, answerStatuses, setSelectedAnswers, setIsSubmitted }) => {
  const [answers, setAnswers] = useState(answerStatuses);
  const [submitted, setSubmitted] = useState(false);
  const [statistics, setStatistics] = useState({ correct: 0, wrong: 0, unanswered: 0 });

  const handleChangeAnswer = (questionId, option) => {
    if (!submitted) {
      setAnswers(prev => ({ ...prev, [questionId]: option }));
      setSelectedAnswers(true);
    }
  };

  const handleSubmit = () => {
    const correctAnswers = topic.questions.filter(q => answers[q.id] === q.answer).length;
    const wrongAnswers = topic.questions.filter(q => answers[q.id] && answers[q.id] !== q.answer).length;
    const unansweredQuestions = topic.questions.length - Object.keys(answers).length;
    setStatistics({ correct: correctAnswers, wrong: wrongAnswers, unanswered: unansweredQuestions });
    setSubmitted(true);
    setIsSubmitted(true);
    updateStatistics(topic.id, correctAnswers, topic.questions.length, answers);
  };

  return (
    <Box>
      {topic.questions.map((q, index) => (
        <Paper
          key={q.id}
          elevation={3}
          style={{ padding: '20px', marginBottom: '10px', backgroundColor: submitted && answers[q.id] === q.answer ? 'lightgreen' : '#f0f0f0' }}
        >
          <Typography variant="body1">Aufgabe {index + 1}: {q.question}</Typography>
          {q.image && (
            <img src={process.env.PUBLIC_URL + q.image} alt={`Question ${index + 1}`} style={{ width: '90%', margin: '10px 0' }} />
          )}
          <FormControl component="fieldset">
            <RadioGroup>
              {q.options.map(option => (
                <FormControlLabel
                  key={option}
                  value={option}
                  control={<Radio />}
                  label={
                    <Typography variant="caption">
                      {option}
                    </Typography>
                  }                   checked={answers[q.id] === option}
                  onChange={() => handleChangeAnswer(q.id, option)}
                  disabled={submitted}
                  style={{ display: 'block' }}
                />
              ))}
            </RadioGroup>
          </FormControl>
          {submitted && answers[q.id] !== q.answer && (
            <Typography variant="body2" color="green">
              Correct Answer: {q.answer}
            </Typography>
          )}
        </Paper>
      ))}
      {topic.questions.length > 0 && !submitted && (
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit Answers
          </Button>
        </Box>
      )}
      {submitted && (
        <Box mt={4} p={2} border={1} borderColor="grey.300" borderRadius="8px">
          <Typography variant="h6">Statistics</Typography>
          <Typography>Correct Answers: {statistics.correct}</Typography>
          <Typography>Wrong Answers: {statistics.wrong}</Typography>
          {statistics.unanswered > 0 && (
            <Typography>Unanswered Questions: {statistics.unanswered}</Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default TopicSection;
