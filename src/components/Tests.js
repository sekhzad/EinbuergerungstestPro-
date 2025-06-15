import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Radio, RadioGroup, FormControlLabel, FormControl, Paper, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Select, MenuItem, InputLabel } from '@mui/material';
import { subTopics, useSubTopicQuestions } from './Bundesland';
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomRadio from './CustomRadio';

const MockTest = ({ questions, onBack, statistics, setSelectedAnswers, setIsSubmitted, markedQuestions, onMarkQuestion, onUnmarkQuestion }) => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [passed, setPassed] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showSubmitConfirmation, setShowSubmitConfirmation] = useState(false);
  const [selectedSubTopic, setSelectedSubTopic] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(30 * 60);
  const [showStartConfirmation, setShowStartConfirmation] = useState(true);
  const [testStarted, setTestStarted] = useState(false);
  const [showLeaveConfirmation, setShowLeaveConfirmation] = useState(false);

  const subTopicQuestions = useSubTopicQuestions(subTopics.find(topic => topic.name === selectedSubTopic));

  useEffect(() => {
    if (showAnswer) {
      const timer = setTimeout(() => setShowAnswer(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [showAnswer]);

  useEffect(() => {
    if (!submitted && testStarted && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prevTime => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
    if (timeRemaining === 0) {
      handleSubmit();
    }
  }, [submitted, timeRemaining, testStarted]);

  const handleChangeAnswer = (questionId, answer) => {
    if (!submitted) {
      setAnswers(prev => ({ ...prev, [questionId]: answer }));
      setSelectedAnswers(true);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const correctAnswers = [...questions, ...subTopicQuestions].filter(q => answers[q.id] === q.answer).length;
    setScore(correctAnswers);
    setPassed(correctAnswers >= 15);
    setIsSubmitted(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length + subTopicQuestions.length - 1) {
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

  const handleStartConfirmation = (confirm) => {
    if (confirm && selectedSubTopic) {
      setShowStartConfirmation(false);
      setTestStarted(true);
    } else if (!confirm) {
      onBack();
    } else {
      alert('Bitte wählen Sie ein Bundesland aus, um fortzufahren.');
    }
  };

  const handleSubTopicSelection = (event) => {
    setSelectedSubTopic(event.target.value);
  };

  const handleQuestionSelection = (event) => {
    const questionIndex = event.target.value - 1;
    setCurrentQuestionIndex(questionIndex);
  };

  const handleMarkToggle = (question) => {
    if (markedQuestions.some(q => q.id === question.id)) {
      onUnmarkQuestion(question);
    } else {
      onMarkQuestion(question);
    }
  };

  const currentQuestion = currentQuestionIndex < questions.length
    ? questions[currentQuestionIndex]
    : subTopicQuestions[currentQuestionIndex - questions.length];

  if (!questions || !Array.isArray(questions)) {
    return <Typography variant="body2">Loading questions...</Typography>;
  }

  const percentage = (score / (questions.length + subTopicQuestions.length)) * 100;
  const progressPercentage = ((currentQuestionIndex + 1) / (questions.length + subTopicQuestions.length)) * 100;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleLeaveTest = () => {
    setShowLeaveConfirmation(true);
  };

  const confirmLeaveTest = (confirm) => {
    setShowLeaveConfirmation(false);
    if (confirm) {
      onBack();
    }
  };

  return (
    <Box>
      {testStarted ? (
        <>
          {questions.length > 0 && (
            <>
              <Box mt={2} display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <FormControl variant="outlined" color="primary" style={{ minWidth: 80, maxWidth: 130 }}>
                  <InputLabel>Bundesland</InputLabel>
                  <Select
                    value={selectedSubTopic}
                    onChange={handleSubTopicSelection}
                    label="Bundesland"
                    style={{ height: '40px', lineHeight: '40px' }}
                  >
                    {subTopics.map((topic) => (
                      <MenuItem key={topic.id} value={topic.name}>
                        {topic.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl variant="outlined" color="primary" style={{ minWidth: 88 }}>
                  <Box mt={0} p={0} border={1} borderColor="grey.10" borderRadius="8px" display="flex" flexDirection="column" gap={1}>
                    <Typography variant="h6" align='center' color="textPrimary">
                      {formatTime(timeRemaining)}
                    </Typography>  
                  </Box>
                </FormControl>

                <FormControl variant="outlined" color="primary" style={{ minWidth: 60, maxWidth: 100 }}>
                  <InputLabel>Frage</InputLabel>
                  <Select
                    value={currentQuestionIndex + 1}
                    onChange={handleQuestionSelection}
                    label="Frage"
                    style={{ height: '40px', lineHeight: '40px' }}
                  >
                    {[...questions, ...subTopicQuestions].map((_, index) => (
                      <MenuItem key={index} value={index + 1}>
                        {index + 1}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box display="flex"  alignItems="center" mb={2}>
                <Box style={{ flex: 4, position: 'relative' }}>
                  <ProgressBar now={progressPercentage} className="custom-progress-bar" />
                  <span className="progress-bar-label">{`${currentQuestionIndex + 1} von ${questions.length + subTopicQuestions.length}`}</span>
                </Box>
              </Box>
              {currentQuestion && (
                <Paper
                  key={currentQuestion.id}
                  elevation={20}
                  style={{
                    padding: '20px',
                    marginBottom: '10px',
                  }}
                >
                  <Typography variant="body1" style={{ display: 'block' }}>Aufgabe {currentQuestionIndex + 1}: {currentQuestion.question}</Typography>
                  {currentQuestion.image && (
                    <img src={process.env.PUBLIC_URL + currentQuestion.image} alt={`Question ${currentQuestionIndex + 1}`} style={{ width: '90%', margin: '10px 0' }} />
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
                      {markedQuestions.some(marked => marked.id === currentQuestion.id) ? 'Unmark' : 'Mark'}
                    </Button>
                  </Box>
                  {submitted && answers[currentQuestion.id] !== currentQuestion.answer && (
                    <Typography variant="body2" color="green">
                      Richtige Antwort: {currentQuestion.answer}
                    </Typography>
                  )}
                </Paper>
              )}
            </>
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
              {currentQuestionIndex < questions.length + subTopicQuestions.length - 1 ? (
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
              <Typography variant="caption">Korrekte Antworten: {score}</Typography> <br/>
              <Typography variant="caption">Falsche Antworten: {questions.length + subTopicQuestions.length - score}</Typography>
              {passed ? (
                <Typography variant="h6" color="primary">Glückwunsch! Du hast den Test bestanden!</Typography>
              ) : (
                <Typography variant="h6" color="error">Knapp daneben. Versuch's noch mal!</Typography>
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

          <Dialog
            open={showLeaveConfirmation}
            onClose={() => confirmLeaveTest(false)}
            aria-labelledby="leave-confirmation-title"
            aria-describedby="leave-confirmation-description"
          >
            <DialogTitle id="leave-confirmation-title">Test verlassen?</DialogTitle>
            <DialogContent>
              <DialogContentText id="leave-confirmation-description">
                Möchten Sie den Test wirklich verlassen? Ihr aktueller Fortschritt geht verloren.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => confirmLeaveTest(false)} color="primary">
                Abbrechen
              </Button>
              <Button onClick={() => confirmLeaveTest(true)} color="primary" autoFocus>
                Verlassen
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        <Dialog
          open={showStartConfirmation}
          onClose={() => handleStartConfirmation(false)}
          aria-labelledby="start-confirmation-title"
          aria-describedby="start-confirmation-description"
        >
          <DialogTitle id="start-confirmation-title">Test Starten</DialogTitle>
          <DialogContent>
            <DialogContentText id="start-confirmation-description">
              Bitte wählen Sie ein Bundesland und bestätigen Sie, dass Sie bereit sind, den Test zu starten. Sie haben 30 Minuten Zeit, um den Test abzuschließen.
            </DialogContentText>
            <FormControl variant="outlined" color="primary" fullWidth style={{ marginTop: '20px' }}>
              <InputLabel>Bundesland</InputLabel>
              <Select
                value={selectedSubTopic}
                onChange={handleSubTopicSelection}
                label="Bundesland"
                style={{ height: '45px', lineHeight: '40px' }}
              >
                {subTopics.map((topic) => (
                  <MenuItem key={topic.id} value={topic.name}>
                    {topic.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleStartConfirmation(false)} color="primary">
              Abbrechen
            </Button>
            <Button onClick={() => handleStartConfirmation(true)} color="primary" autoFocus>
              Starten
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default MockTest;
