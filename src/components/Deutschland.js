import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Radio, RadioGroup, FormControlLabel, FormControl, Paper, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Select, MenuItem, InputLabel } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomRadio from './CustomRadio';
//import './customStyles.css'; // Import custom CSS file

const theme = createTheme({
  palette: {
    primary: {
      main: '#1e88e5',
    },
  },
});

const totalQuestions = 300;
const questionsPerPart = 30;
const totalParts = Math.ceil(totalQuestions / questionsPerPart);

// Subject-specific question IDs
const politicsIds = [
  13, 20, 28, 31, 42, 43, 44, 48, 55, 57, 58, 65, 70, 71, 72, 74, 75, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 98, 129,
  3, 6, 11, 22, 26, 27, 30, 32, 34, 41, 51, 52, 53, 54, 60, 61, 63, 143, 144, 145, 147, 148,
  24, 25, 37, 38, 39, 49, 64, 67,
  23, 35, 36, 45, 97, 99, 100, 285,
  1, 2, 4, 7, 8, 9, 10, 12, 14, 15, 16, 17, 18, 19, 101, 135, 262, 274, 277, 278, 281, 289,
  5, 62, 93, 94, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 130, 132, 133, 134,
  59, 73, 76, 78, 79, 92, 103,
  46, 47, 68, 77,
  95, 96, 105, 106, 248, 249, 260, 282,
  21, 29, 40, 66, 214, 216,
  56, 69, 131, 253, 255, 256, 259, 265, 273, 288,
  102, 104, 136, 137, 138, 139, 140, 141, 142, 146, 149, 150, 241, 242, 243, 245, 246, 247, 251, 252, 254, 258, 263, 266, 267, 268, 272, 275, 276, 279, 280, 283, 286, 287, 290, 291
];

const historyIds = [
  152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 170, 175, 176, 177, 179, 184, 220,
  50, 151, 165, 166, 167, 168, 169, 171, 172, 174, 178, 180, 181, 182, 183, 185, 186, 187, 188, 189, 190, 193, 199, 202, 203, 207, 208, 209, 210, 211, 212, 215, 217,
  191, 192, 194, 195, 196, 197, 198, 200, 201, 204, 205, 206, 218, 219, 228,
  173, 213, 221, 222, 223, 224, 225
];

const societyIds = [
  33, 292, 294, 295, 296,
  244, 250, 257, 261, 269, 270, 284,
  297, 298, 299, 300,
  264, 271, 293
];

const MainTopic = ({
  updateStatistics,
  answerStatuses,
  setSelectedAnswers,
  setIsSubmitted,
  autoMarkWrong,
  autoUnmarkCorrect,
  markedQuestions,
  onMarkQuestion,
  onUnmarkQuestion
}) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState(answerStatuses);
  const [submitted, setSubmitted] = useState(false);
  const [statistics, setStatistics] = useState({ correct: 0, wrong: 0, unanswered: 0 });
  const [selectedPart, setSelectedPart] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showSubmitConfirmation, setShowSubmitConfirmation] = useState(false);

  useEffect(() => {
    if (showAnswer) {
      const timer = setTimeout(() => setShowAnswer(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [showAnswer]);

  const fetchQuestions = async (part) => {
    const response = await fetch('/Deutschland.json');
    const data = await response.json();
    const start = (part - 1) * questionsPerPart;
    const end = start + questionsPerPart;
    return data.mainTopic.slice(start, end);
  };

  const handleSelectPart = async (part) => {
    setSelectedPart(part);
    const questionsPart = await fetchQuestions(part);
    setQuestions(questionsPart);
    setAnswers({});
    setSubmitted(false);
    setIsSubmitted(false);
    setSelectedAnswers(false);
    setCurrentQuestionIndex(0);
    setSelectedSubject(null);
  };

  const handleSelectSubject = async (subject) => {
    setSelectedSubject(subject);
    setSelectedPart(null);
    const response = await fetch('/Deutschland.json');
    const data = await response.json();
    const subjectIds = subject === 'Politics' ? politicsIds : subject === 'History' ? historyIds : societyIds;
    const filteredQuestions = data.mainTopic.filter(q => subjectIds.includes(q.id));
    setQuestions(filteredQuestions);
    setAnswers({});
    setSubmitted(false);
    setIsSubmitted(false);
    setSelectedAnswers(false);
    setCurrentQuestionIndex(0);
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
    updateStatistics(1, correctAnswers, totalQuestions, answers);
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
    const questionIndex = event.target.value - 1; // Convert to zero-based index
    setCurrentQuestionIndex(questionIndex);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
  const percentage = (statistics.correct / questions.length) * 100;


  return (
    <Box>
      {!selectedPart && !selectedSubject && (
        <>
          <ThemeProvider theme={theme}>
            <Box mt={2}>
              <Typography variant="body2" align='center' marginBottom={0}>
                Fragen Stand: 25.06.2024
              </Typography>
            </Box>
            <Box mt={1} sx={{
              display: 'inline-block',
              backgroundColor: '#1e88e5',
              padding: 1,
              boxShadow: '5px 5px 15px rgba(0,0,0,0.3)',
              borderRadius: '8px',
              color: 'white'
            }}>
              <Typography variant="body2" align='center' marginBottom={0}>
                Alle 300 Fragen nach BAMF-Reihenfolge, aufgeteilt in 10 Abschnitte:
              </Typography>
            </Box>
          </ThemeProvider>

          <Box mt={2} display="flex" flexWrap="wrap" justifyContent="center" marginBottom={1}>
            {Array.from({ length: totalParts }, (_, index) => (
              <Button
                key={index + 1}
                variant={selectedPart === index + 1 ? "contained" : "outlined"}
                color="primary"
                onClick={() => handleSelectPart(index + 1)}
                style={{ margin: '5px', minWidth: '110px' }}
              >
                {index * questionsPerPart + 1} .. {(index + 1) * questionsPerPart}
              </Button>
            ))}
          </Box>

          <ThemeProvider theme={theme}>
            <Box mt={3} sx={{
              display: 'inline-block',
              backgroundColor: '#1e88e5',
              padding: 1,
              boxShadow: '5px 5px 15px rgba(0,0,0,0.3)',
              borderRadius: '8px',
              color: 'white'
            }}>
              <Typography variant="body2" align='center' marginBottom={0}>
                Zuordnung zu Themengebieten:
              </Typography>
            </Box>
          </ThemeProvider>

          <Box mt={1} display="flex" justifyContent="center" flexWrap="wrap" mb={10}>
            
            <Button
              variant={selectedSubject === 'Politics' ? "contained" : "contained"}
              color="primary"
              onClick={() => handleSelectSubject('Politics')}
              style={{ boxShadow: '5px 10px 15px rgba(30,0,0.3)', margin: '10px', minWidth: '110px', height: '55px', backgroundColor: 'black', color: 'white', fontWeight: 'bold' }}
            >
              Politik
            </Button>
            <Button
              variant={selectedSubject === 'History' ? "contained" : "contained"}
              color="secondary"
              onClick={() => handleSelectSubject('History')}
              style={{ boxShadow: '5px 10px 15px rgba(30,0,0.3)', margin: '10px', minWidth: '110px', height: '55px', backgroundColor: 'red', color: 'white', fontWeight: 'bold' }}
            >
              Geschichte
            </Button>
            <Button
              variant={selectedSubject === 'Society' ? "contained" : "contained"}
              onClick={() => handleSelectSubject('Society')}
              style={{ boxShadow: '5px 10px 15px rgba(30,0,0.3)', margin: '10px', minWidth: '110px', height: '55px', backgroundColor: 'gold', color: 'black', fontWeight: 'bold' }}
            >
              Gesellschaft
            </Button>
          </Box>
        </>
      )}
      {(selectedPart || selectedSubject) && (
        <>
          <Box mt={2} display="flex" justifyContent="flex-end" alignItems="center" mb={1}>
            <FormControl
              variant="outlined"
              color="primary"
              style={{ minWidth: 60, maxWidth: 100 }}
            >
              <InputLabel>Frage</InputLabel>
              <Select
                value={currentQuestionIndex + 1}
                onChange={handleQuestionSelection}
                label="Frage"
                style={{ height: '40px', lineHeight: '40px' }}
              >
                {questions.map((_, index) => (
                  <MenuItem key={index} value={index + 1}>
                    {selectedSubject ? index + 1 : (selectedPart - 1) * questionsPerPart + index + 1}
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
          {currentQuestion && (
            <Paper
              key={currentQuestion.id}
              elevation={20}
              style={{
                padding: '20px',
                marginBottom: '10px',
                boxShadow: '5px 5px 15px rgba(0,0,0,0.3)',
                backgroundColor: showAnswer && answers[currentQuestion.id] === currentQuestion.answer
                  ? 'lightgreen'
                  : showAnswer && answers[currentQuestion.id] !== currentQuestion.answer
                    ? 'lightcoral'
                    : '#f0f0f0'
              }}
            >
              <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={1}>
                <Typography variant="body1" style={{ display: 'block' }}>Frage {currentQuestion.id}: {currentQuestion.question}</Typography>
              </Box>
              {currentQuestion.image && (
                <img src={process.env.PUBLIC_URL + currentQuestion.image} alt={`Question ${currentQuestion.id}`} style={{ width: '100%', margin: '10px 0' }} />
              )}
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
        </>
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
          <Typography variant="caption">Korrekte Antworten: {statistics.correct}</Typography>
          <br />
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

export default MainTopic;
