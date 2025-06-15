import React, { useState, useEffect } from 'react';
import {
  Box, Typography, CircularProgress, Paper, Button, FormControl, RadioGroup,
  FormControlLabel, Radio, Dialog, DialogActions, DialogContent, DialogContentText,
  DialogTitle, Select, MenuItem, InputLabel, Avatar
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomRadio from './CustomRadio';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1e88e5',
    },
  },
});

const subTopics = [
  { id: 2, name: 'Baden-Württemberg', icon: './BundeslandFlags/BW.png' },
  { id: 3, name: 'Bayern', icon: '/BundeslandFlags/Bayern.png' },
  { id: 4, name: 'Berlin', icon: '/BundeslandFlags/Berlin.png' },
  { id: 5, name: 'Brandenburg', icon: '/BundeslandFlags/Brandenburg.png' },
  { id: 6, name: 'Bremen', icon: '/BundeslandFlags/Bremen.png' },
  { id: 7, name: 'Hamburg', icon: '/BundeslandFlags/Hamburg.png' },
  { id: 8, name: 'Hessen', icon: '/BundeslandFlags/Hessen.png' },
  { id: 9, name: 'Mecklenburg-Vorpommern', icon: '/BundeslandFlags/Mecklenburg-Vorpommern.png' },
  { id: 10, name: 'Niedersachsen', icon: '/BundeslandFlags/Niedersachsen.png' },
  { id: 11, name: 'Nordrhein-Westfalen', icon: '/BundeslandFlags/NRW.png' },
  { id: 12, name: 'Rheinland-Pfalz', icon: '/BundeslandFlags/Rheinland-Pfalz.png' },
  { id: 13, name: 'Saarland', icon: '/BundeslandFlags/Saarland.png' },
  { id: 14, name: 'Sachsen', icon: '/BundeslandFlags/Sachsen.png' },
  { id: 15, name: 'Sachsen-Anhalt', icon: '/BundeslandFlags/Sachsen-Anhalt.png' },
  { id: 16, name: 'Schleswig-Holstein', icon: '/BundeslandFlags/Schleswig-Holstein.png' },
  { id: 17, name: 'Thüringen', icon: '/BundeslandFlags/Thueringen.png' }
];

const useSubTopicQuestions = (selectedSubTopic) => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('/Bundesland.json');
        const data = await response.json();
        const subTopicKey = `subTopic${selectedSubTopic.id - 1}`;
        const subTopicQuestions = (data.subTopics[subTopicKey] || []).slice(0, 10);
        setQuestions(subTopicQuestions.sort(() => 0.5 - Math.random()).slice(0, 3));
      } catch (error) {
        console.error('Failed to fetch subtopic questions:', error);
      }
    };

    if (selectedSubTopic) {
      fetchQuestions();
    }
  }, [selectedSubTopic]);

  return questions;
};

export { subTopics, useSubTopicQuestions };

const SubTopics = ({
  updateStatistics, answerStatuses, setSelectedAnswers, setIsSubmitted, autoMarkWrong,
  autoUnmarkCorrect, markedQuestions, onMarkQuestion, onUnmarkQuestion
}) => {
  const [loading, setLoading] = useState(false);
  const [selectedSubTopic, setSelectedSubTopic] = useState(null);
  const [questions, setQuestions] = useState([]);
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

  const handleSubTopicSelect = async (subTopic) => {
    setLoading(true);
    try {
      const response = await fetch('/Bundesland.json');
      const data = await response.json();
      const subTopicKey = `subTopic${subTopic.id - 1}`;
      const subTopicQuestions = (data.subTopics[subTopicKey] || []).slice(0, 10);
      setSelectedSubTopic({ ...subTopic, questions: subTopicQuestions });
      setQuestions(subTopicQuestions);
      setAnswers({});
      setSubmitted(false);
      setIsSubmitted(false);
      setSelectedAnswers(false);
      setCurrentQuestionIndex(0);
    } catch (error) {
      console.error('Failed to fetch subtopic questions:', error);
    }
    setLoading(false);
  };

  const handleChangeAnswer = (questionId, answer) => {
    if (!submitted) {
      setAnswers(prev => ({ ...prev, [questionId]: answer }));
      setSelectedAnswers(true);
    }
  };

  const handleMarkToggle = (question) => {
    if (markedQuestions.some(q => q.id === question.id)) {
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
    updateStatistics(selectedSubTopic.id, correctAnswers, questions.length, answers);
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

  const handleQuestionSelection = (event) => {
    const questionIndex = event.target.value - 1;
    setCurrentQuestionIndex(questionIndex);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
  const percentage = (statistics.correct / questions.length) * 100;

  return (
    <Box>
      <ThemeProvider theme={theme}>
        {!selectedSubTopic && (
          <Box mt={1} sx={{
            display: 'inline-block',
            backgroundColor: '#1e88e5',
            padding: 0.8,
            boxShadow: '5px 5px 15px rgba(30,0,0.3)',
            borderRadius: '8px',
            color: 'white'
          }}>
            <Typography variant="body2" marginBottom={0}>
            Bitte wählen Sie Ihr Bundesland aus:
            </Typography>
          </Box>
        )}
      </ThemeProvider>

      <Box mt={2} display="flex" flexWrap="wrap" justifyContent="center">
        {loading ? (
          <CircularProgress />
        ) : selectedSubTopic ? (
          <Box width="100%">
            <Box display="flex" justifyContent="flex-end" alignItems="center" mb={1}>
              <FormControl variant="outlined" color="primary" style={{ minWidth: 60, maxWidth: 100 }}>
                <InputLabel>Frage</InputLabel>
                <Select
                  value={currentQuestionIndex + 1}
                  onChange={handleQuestionSelection}
                  label="Frage"
                  style={{ height: '40px', lineHeight: '40px' }}
                >
                  {questions.map((_, index) => (
                    <MenuItem key={index} value={index + 1}>
                      {index + 1}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box display="flex" alignItems="center" mb={2}>
              <Box style={{ flex: 4, position: 'relative' }}>
                <ProgressBar now={progressPercentage} className="custom-progress-bar" />
                <span className="progress-bar-label">{`${currentQuestionIndex + 1} von ${questions.length}`}</span>
              </Box>
            </Box>
            <Paper
              key={currentQuestion?.id}
              elevation={20}
              style={{
                padding: '20px',
                marginBottom: '10px',
                boxShadow: '5px 5px 15px rgba(0,0,0,0.3)',
                backgroundColor: showAnswer && answers[currentQuestion?.id] === currentQuestion?.answer
                  ? 'lightgreen'
                  : showAnswer && answers[currentQuestion?.id] !== currentQuestion?.answer
                    ? 'lightcoral'
                    : '#f0f0f0'
              }}
            >
              <Box display="flex" justifyContent="flex-start" alignItems="center" marginBottom={0}>
                <Typography variant="body1" style={{ display: 'block' }}>Frage {currentQuestionIndex + 1}: {currentQuestion?.question}</Typography>
              </Box>
              {currentQuestion?.image && (
                <img src={process.env.PUBLIC_URL + currentQuestion.image} alt={`Question ${currentQuestionIndex + 1}`} style={{ width: '100%', margin: '10px 0' }} />
              )}
              <Box display="block">
                <FormControl component="fieldset" style={{ margin: '20px 0' }}>
                  <RadioGroup>
                    {currentQuestion?.options.map(option => (
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

              <Box display="flex" justifyContent="right" alignItems="center" marginBottom={-2}>
                <Button onClick={() => handleMarkToggle(currentQuestion)}>
                  {markedQuestions.some(marked => marked.id === currentQuestion?.id) ? 'Unmark' : 'Mark'}
                </Button>
              </Box>
              {submitted && answers[currentQuestion?.id] !== currentQuestion?.answer && (
                <Typography variant="body2" color="green">
                  Richtige Antwort: {currentQuestion?.answer}
                </Typography>
              )}
            </Paper>
            {selectedSubTopic && (
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
          </Box>
        ) : (
          subTopics.map((subTopic) => (
            <Paper
              key={subTopic.id}
              elevation={20}
              style={{
                margin: '7px',
                padding: '10px',
                minWidth: '80px',
                cursor: 'pointer',
                backgroundColor: '#f0f0f0',
                
              }}
              onClick={() => handleSubTopicSelect(subTopic)}
            >
              <Box display="flex" alignItems="center">
                <Avatar src={subTopic.icon} sx={{  mr: 1 }} variant="square" />
                <Typography variant="body1">{subTopic.name}</Typography>
              </Box>
            </Paper>
          ))
        )}
      </Box>

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

export default SubTopics;
