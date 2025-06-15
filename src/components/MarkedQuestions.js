import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Radio, RadioGroup, FormControlLabel, FormControl, Paper, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import ProgressBar from 'react-bootstrap/ProgressBar'; // Import ProgressBar component
import 'bootstrap/dist/css/bootstrap.min.css'; // Import bootstrap CSS
import CustomRadio from './CustomRadio';

const MarkedQuestions = ({
  questions,
  updateStatistics,
  answerStatuses,
  setSelectedAnswers,
  setIsSubmitted,
  autoMarkWrong,
  autoUnmarkCorrect,
  onMarkQuestion,
  onUnmarkQuestion
}) => {
  const [answers, setAnswers] = useState(answerStatuses);
  const [submitted, setSubmitted] = useState(false);
  const [statistics, setStatistics] = useState({ correct: 0, wrong: 0, unanswered: 0 });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showSubmitConfirmation, setShowSubmitConfirmation] = useState(false);

  useEffect(() => {
    if (showAnswer) {
      const timer = setTimeout(() => setShowAnswer(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [showAnswer]);

  const handleChangeAnswer = (questionId, answer) => {
    if (!submitted) {
      setAnswers(prev => ({ ...prev, [questionId]: answer }));
      setSelectedAnswers(true);
    }
  };

  const handleMarkToggle = (question) => {
    if (questions.some(q => q.id === question.id)) {
      onUnmarkQuestion(question);
    } else {
      onMarkQuestion(question);
    }
  };

  const handleSubmit = () => {
    const correctAnswers = questions.filter(q => answers[q.id] === q.answer).length;
    const wrongAnswers = questions.filter(q => answers[q.id] && answers[q.id] !== q.answer).length;
    const unansweredQuestions = questions.length - Object.keys(answers).length;
    setStatistics({ correct: correctAnswers, wrong: wrongAnswers, unanswered: unansweredQuestions });

    questions.forEach(q => {
      if (answers[q.id] !== q.answer && autoMarkWrong) {
        onMarkQuestion(q);
      } else if (answers[q.id] === q.answer && autoUnmarkCorrect) {
        onUnmarkQuestion(q);
      }
    });

    setSubmitted(true);
    setIsSubmitted(true);
    updateStatistics(1, correctAnswers, questions.length, answers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setShowAnswer(true);
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
      }, 1000);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleOpenSubmitConfirmation = () => {
    setShowSubmitConfirmation(true);
  };

  const handleCloseSubmitConfirmation = (confirm) => {
    if (confirm) {
      handleSubmit();
    }
    setShowSubmitConfirmation(false);
  };

  const currentQuestion = questions[currentQuestionIndex];

  const percentage = (statistics.correct / questions.length) * 100;
  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100; // Calculate progress percentage

  return (
    <Box mt={2}>
      <Typography variant="body1" gutterBottom>
        {questions.length > 0 ? `Lesezeichen: ${questions.length}` : 'Es wurden noch keine Fragen markiert.'}
      </Typography>
      {questions.length > 0 && (
        <Box display="flex" alignItems="center" mb={2}>
          <Box style={{ flex: 4, position: 'relative' }}>
            <ProgressBar now={progressPercentage} className="custom-progress-bar" />
            <span className="progress-bar-label">{`${currentQuestionIndex + 1} von ${questions.length}`}</span>
          </Box>
        </Box>
      )}
      {currentQuestion && (
        <Paper
          key={currentQuestion.id}
          elevation={3}
          style={{
            padding: '20px',
            marginBottom: '10px',
            boxShadow: '5px 5px 15px rgba(30,0,0.3)',
            backgroundColor: showAnswer && answers[currentQuestion.id] === currentQuestion.answer
              ? 'lightgreen'
              : showAnswer && answers[currentQuestion.id] !== currentQuestion.answer
                ? 'lightcoral'
                : '#f0f0f0'
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
            <Typography variant="body1" style={{ display: 'block' }}>Aufgabe {currentQuestionIndex + 1}: {currentQuestion.question}</Typography>
          </Box>
          {currentQuestion.image && (
            <img src={process.env.PUBLIC_URL + currentQuestion.image} alt={`Question ${currentQuestionIndex + 1}`} style={{ width: '100%', margin: '10px 0' }} />
          )}
          <Box display="block">
            <FormControl component="fieldset" style={{ margin: '20px 0' }}>
              <RadioGroup>
                {currentQuestion.options.map(option => (
                  <Paper key={option} elevation={3} style={{ padding: '10px', marginBottom: '10px' }}>
                    <FormControlLabel
                      value={option}
                      control={<CustomRadio />}
                      label={
                        <Typography variant="caption" style={{ display: 'block' }}>
                          {option}
                        </Typography>
                      }
                      checked={answers[currentQuestion.id] === option}
                      onChange={() => handleChangeAnswer(currentQuestion.id, option)}
                      disabled={submitted}
                    />
                  </Paper>
                ))}
              </RadioGroup>
            </FormControl>
          </Box>
          <Box display="flex" justifyContent="flex-end" alignItems="center" marginBottom={-2}>
            <Button onClick={() => handleMarkToggle(currentQuestion)}>
              {questions.some(marked => marked.id === currentQuestion.id) ? 'Unmark' : 'Mark'}
            </Button>
          </Box>
          {submitted && answers[currentQuestion.id] !== currentQuestion.answer && (
            <Typography variant="body2" color="green">
              Richtige Antwort: {currentQuestion.answer}
            </Typography>
          )}
        </Paper>
      )}
      {questions.length > 0 && (
        <Box display="flex" justifyContent="space-between" mb={2} mt={2}>
          {currentQuestionIndex > 0 ? (
            <Button variant="contained" onClick={handlePreviousQuestion}>
              Vorherige
            </Button>
          ) : (
            <Box />
          )}
          {currentQuestionIndex < questions.length - 1 ? (
            <Button variant="contained" color="primary" onClick={handleNextQuestion}>
              Nächste
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={handleOpenSubmitConfirmation}>
              Antworten einreichen
            </Button>
          )}
        </Box>
      )}
      {submitted && (
        <Box mt={4} p={2} border={1} borderColor="grey.300" borderRadius="8px" textAlign="center" mb={10}>
          <Typography variant="h6">Statistik</Typography>
          <CircularProgress
            variant="determinate"
            value={percentage}
            size={100}
            thickness={4}
            style={{ marginBottom: '20px', color: percentage >= 50 ? 'green' : 'red' }}
          />
          <Typography variant="h6">{percentage.toFixed(2)}%</Typography>
          <Typography variant="caption">Korrekte Antworten: {statistics.correct}</Typography> <br />
          <Typography variant="caption">Falsche Antworten: {statistics.wrong}</Typography> <br />
          {statistics.unanswered > 0 && (
            <Typography variant="caption">Unbeantwortete Fragen: {statistics.unanswered}</Typography>
          )}
        </Box>
      )}
      <Dialog
        open={showSubmitConfirmation}
        onClose={() => handleCloseSubmitConfirmation(false)}
        aria-labelledby="submit-confirmation-title"
        aria-describedby="submit-confirmation-description"
      >
        <DialogTitle id="submit-confirmation-title">Antworten einreichen?</DialogTitle>
        <DialogContent>
          <DialogContentText id="submit-confirmation-description">
            Möchten Sie Ihre Antworten jetzt einreichen?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseSubmitConfirmation(false)} color="primary">
            Abbrechen
          </Button>
          <Button onClick={() => handleCloseSubmitConfirmation(true)} color="primary" autoFocus>
            Einreichen
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MarkedQuestions;
