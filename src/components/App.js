import React, { useState, useEffect } from 'react';
import { Button, Typography, Container, Box, Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MainTopic from './Deutschland';
import SubTopics from './Bundesland';
import TopicSection from './TopicSection';
import MockTest from './Tests';
import TestList from './TestList';
import BottomNavBar from './BottomNavBar';
import Support from './Support';
import FactsLegal from './Infos';
import ControlPanel from './ControlPanel';
import MarkedQuestions from './MarkedQuestions';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import SafeArea from './SafeArea';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: '#1e88e5',
    },
  },
});

const App = () => {
  const [view, setView] = useState('main');
  const [subView, setSubView] = useState('home');
  const [navigationHistory, setNavigationHistory] = useState([]);
  const [selectedSubTopic, setSelectedSubTopic] = useState(null);
  const [mockTests, setMockTests] = useState([]);
  const [currentMockTest, setCurrentMockTest] = useState(null);
  const [showTests, setShowTests] = useState(false);
  const [statistics, setStatistics] = useState({
    mainTopic: { total: 300, correct: 0 },
    subTopics: [
      { id: 2, name: 'Baden-Württemberg', total: 10, correct: 0 },
      { id: 3, name: 'Bayern', total: 10, correct: 0 },
      { id: 4, name: 'Berlin', total: 10, correct: 0 },
      { id: 5, name: 'Brandenburg', total: 10, correct: 0 },
      { id: 6, name: 'Bremen', total: 10, correct: 0 },
      { id: 7, name: 'Hamburg', total: 10, correct: 0 },
      { id: 8, name: 'Hessen', total: 10, correct: 0 },
      { id: 9, name: 'Mecklenburg-Vorpommern', total: 10, correct: 0 },
      { id: 10, name: 'Niedersachsen', total: 10, correct: 0 },
      { id: 11, name: 'Nordrhein-Westfalen', total: 10, correct: 0 },
      { id: 12, name: 'Rheinland-Pfalz', total: 10, correct: 0 },
      { id: 13, name: 'Saarland', total: 10, correct: 0 },
      { id: 14, name: 'Sachsen', total: 10, correct: 0 },
      { id: 15, name: 'Sachsen-Anhalt', total: 10, correct: 0 },
      { id: 16, name: 'Schleswig-Holstein', total: 10, correct: 0 },
      { id: 17, name: 'Thüringen', total: 10, correct: 0 }
    ]
  });

  const [answerStatuses, setAnswerStatuses] = useState({
    mainTopic: Array(300).fill('unanswered'),
    subTopics: {
      2: Array(10).fill('unanswered'),
      3: Array(10).fill('unanswered'),
      4: Array(10).fill('unanswered'),
      5: Array(10).fill('unanswered'),
      6: Array(10).fill('unanswered'),
      7: Array(10).fill('unanswered'),
      8: Array(10).fill('unanswered'),
      9: Array(10).fill('unanswered'),
      10: Array(10).fill('unanswered'),
      11: Array(10).fill('unanswered'),
      12: Array(10).fill('unanswered'),
      13: Array(10).fill('unanswered'),
      14: Array(10).fill('unanswered'),
      15: Array(10).fill('unanswered'),
      16: Array(10).fill('unanswered'),
      17: Array(10).fill('unanswered'),
    }
  });

  const [markedQuestions, setMarkedQuestions] = useState([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [autoMarkWrong, setAutoMarkWrong] = useState(false);
  const [autoUnmarkCorrect, setAutoUnmarkCorrect] = useState(false);
  const [showControlPanel, setShowControlPanel] = useState(false);

  useEffect(() => {
    fetch('/MockTestQuestions.json')
      .then(response => response.json())
      .then(data => setMockTests(data));
  }, []);

  useEffect(() => {
    const savedMarkedQuestions = localStorage.getItem('markedQuestions');
    const savedStatistics = localStorage.getItem('statistics');
    const savedAnswerStatuses = localStorage.getItem('answerStatuses');

    if (savedMarkedQuestions) {
      setMarkedQuestions(JSON.parse(savedMarkedQuestions));
    }

    if (savedStatistics) {
      setStatistics(JSON.parse(savedStatistics));
    }

    if (savedAnswerStatuses) {
      setAnswerStatuses(JSON.parse(savedAnswerStatuses));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('markedQuestions', JSON.stringify(markedQuestions));
  }, [markedQuestions]);

  useEffect(() => {
    localStorage.setItem('statistics', JSON.stringify(statistics));
  }, [statistics]);

  useEffect(() => {
    localStorage.setItem('answerStatuses', JSON.stringify(answerStatuses));
  }, [answerStatuses]);

  const handleMainTopicClick = () => {
    setNavigationHistory(prevHistory => [...prevHistory, { view, subView }]);
    setSubView('mainTopic');
  };

  const handleSubTopicsClick = () => {
    setNavigationHistory(prevHistory => [...prevHistory, { view, subView }]);
    setSubView('subTopics');
  };

  const handleMockTestClick = () => {
    setNavigationHistory(prevHistory => [...prevHistory, { view, subView }]);
    setSubView('testList');
  };

  const handleTestSelect = (test) => {
    setNavigationHistory(prevHistory => [...prevHistory, { view, subView }]);
    setCurrentMockTest(test);
    setSubView('mockTest');
  };

  const handleSubTopicSelect = (subTopicData) => {
    setNavigationHistory(prevHistory => [...prevHistory, { view, subView }]);
    setSelectedSubTopic(subTopicData);
    setSubView('questions');
  };

  const handleMarkedQuestionsClick = () => {
    setNavigationHistory(prevHistory => [...prevHistory, { view, subView }]);
    setSubView('markedQuestions');
  };

  const handleBack = () => {
    if (navigationHistory.length > 0) {
      const lastNavigation = navigationHistory[navigationHistory.length - 1];
      setNavigationHistory(prevHistory => prevHistory.slice(0, -1));
      setView(lastNavigation.view);
      setSubView(lastNavigation.subView);
    } else {
      setSubView('home');
      setShowTests(false);
    }
  };

  const updateStatistics = (topicId, correctAnswers, totalAnswers, newStatuses) => {
    if (topicId === 1) {
      setStatistics(prevStats => ({
        ...prevStats,
        mainTopic: {
          ...prevStats.mainTopic,
          correct: correctAnswers,
          total: totalAnswers
        }
      }));
      setAnswerStatuses(prevStatuses => ({
        ...prevStatuses,
        mainTopic: newStatuses
      }));
    } else {
      setStatistics(prevStats => ({
        ...prevStats,
        subTopics: prevStats.subTopics.map(subTopic =>
          subTopic.id === topicId ? { ...subTopic, correct: correctAnswers, total: totalAnswers } : subTopic
        )
      }));
      setAnswerStatuses(prevStatuses => ({
        ...prevStatuses,
        subTopics: {
          ...prevStatuses.subTopics,
          [topicId]: newStatuses
        }
      }));
    }
  };

  const handleMainClick = () => {
    if (!isSubmitted && selectedAnswers && (subView === 'mainTopic' || subView === 'questions' || subView === 'mockTest'
      || subView === 'subTopics'
    )) {
      setShowConfirmDialog(true);
    } else {
      setView('main');
      setSubView('home');
      setNavigationHistory([]);
    }
  };

  const handleNavClick = (newView) => {
    if (!isSubmitted && selectedAnswers && (subView === 'mainTopic' || subView === 'questions' || subView === 'mockTest')) {
      setShowConfirmDialog(true);
    } else {
      setNavigationHistory(prevHistory => [...prevHistory, { view, subView }]);
      setView(newView);
      if (newView === 'main') {
        setSubView('home');
        setNavigationHistory([]);
      }
    }
  };

  const handleConfirmClose = (confirm) => {
    setShowConfirmDialog(false);
    if (confirm) {
      setView('main');
      setSubView('home');
      setNavigationHistory([]);
      setSelectedAnswers(false); // Reset the flag
    }
  };

  const handleMarkQuestion = (question) => {
    setMarkedQuestions(prev => [...prev, question]);
  };

  const handleUnmarkQuestion = (question) => {
    setMarkedQuestions(prev => prev.filter(q => q.id !== question.id));
  };

  const toggleControlPanel = () => {
    setShowControlPanel(prev => !prev);
  };

  const getTitle = () => {
    switch (subView) {
      case 'home':
        return <Typography variant="h6" align='center' marginBottom={-0.5}>Einbürgerungstest</Typography>;
      case 'mainTopic':
        return <Typography variant="h6" align='center' marginBottom={-0.5}>Deutschland</Typography>;
      case 'subTopics':
        return <Typography variant="h6" align='center' marginBottom={-0.5}>Bundesländer</Typography>;
      case 'questions':
        return selectedSubTopic ? selectedSubTopic.name : '';
      case 'testList':
        return <Typography variant="h6" align='center' marginBottom={-0.5}>Tests</Typography>;
      case 'mockTest':
        return <Typography variant="h6" align='center' marginBottom={-0.5}>Test</Typography>;
      case 'markedQuestions':
        return <Typography variant="h6" align='center' marginBottom={-0.5}>Lesezeichen</Typography>;
      default:
        return '';
    }
  };

  const renderMainView = () => (
    <>
      {subView === 'home' && (
        <>
          <Box mt={2} sx={{
            display: 'flex',
            justifyContent: 'center'
          }}>
            <Box sx={{
              display: 'inline-flex',
              backgroundColor: '#1e88e5',
              padding: 1,
              boxShadow: '5px 5px 15px rgba(0,0,0,0.3)',
              borderRadius: '8px',
              color: 'white',
              textAlign: 'center'
            }}>
              <Typography variant="body2" align='center' marginBottom={0}>
                Willkommen bei Einbürgerung Pro
              </Typography>
            </Box>
          </Box>

          <Box mt={3} display="flex" justifyContent="center" flexWrap="wrap">
            <Button
              variant="contained"
              color="primary"
              onClick={handleMainTopicClick}
              style={{ boxShadow: '5px 5px 15px rgba(30,0,0.3)', margin: '20px', minWidth: '200px', height: '100px', backgroundColor: 'black', color: 'white', fontWeight: 'bold' }}
            >
              Deutschland
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSubTopicsClick}
              style={{ boxShadow: '5px 5px 15px rgba(30,0,0.3)', margin: '20px', minWidth: '200px', height: '100px', backgroundColor: 'red', color: 'white', fontWeight: 'bold' }}
            >
              Bundesland
            </Button>
            <Button
              variant="contained"
              onClick={handleMockTestClick}
              style={{ boxShadow: '5px 5px 15px rgba(30,0,0.3)', margin: '20px', minWidth: '200px', height: '100px', backgroundColor: 'gold', color: 'black', fontWeight: 'bold' }}
            >
              Tests
            </Button>
          </Box>
        </>
      )}
      {subView === 'mainTopic' && (
        <MainTopic
          updateStatistics={(correct, total, statuses) => updateStatistics(1, correct, total, statuses)}
          answerStatuses={answerStatuses.mainTopic}
          setSelectedAnswers={setSelectedAnswers}
          setIsSubmitted={setIsSubmitted}
          autoMarkWrong={autoMarkWrong}
          autoUnmarkCorrect={autoUnmarkCorrect}
          markedQuestions={markedQuestions}
          onMarkQuestion={handleMarkQuestion}
          onUnmarkQuestion={handleUnmarkQuestion}
        />
      )}
      {subView === 'subTopics' && (
        <SubTopics
          onSelectSubTopic={handleSubTopicSelect}
          updateStatistics={updateStatistics}
          answerStatuses={answerStatuses}
          setSelectedAnswers={setSelectedAnswers}
          setIsSubmitted={setIsSubmitted}
          autoMarkWrong={autoMarkWrong}
          autoUnmarkCorrect={autoUnmarkCorrect}
          markedQuestions={markedQuestions}
          onMarkQuestion={handleMarkQuestion}
          onUnmarkQuestion={handleUnmarkQuestion}
          onBack={handleBack}
        />
      )}
      {subView === 'questions' && selectedSubTopic && (
        <TopicSection
          topic={selectedSubTopic}
          updateStatistics={(correct, total, statuses) => updateStatistics(selectedSubTopic.id, correct, total, statuses)}
          answerStatuses={answerStatuses.subTopics[selectedSubTopic.id] || []}
          setSelectedAnswers={setSelectedAnswers}
          setIsSubmitted={setIsSubmitted}
          autoMarkWrong={autoMarkWrong}
          autoUnmarkCorrect={autoUnmarkCorrect}
          markedQuestions={markedQuestions}
          onMarkQuestion={handleMarkQuestion}
          onUnmarkQuestion={handleUnmarkQuestion}
          onBack={handleBack}
        />
      )}
      {subView === 'testList' && (
        <TestList
          tests={mockTests}
          onSelectTest={handleTestSelect}
        />
      )}
      {subView === 'mockTest' && currentMockTest && (
        <MockTest
          questions={currentMockTest.questions}
          statistics={statistics}
          setSelectedAnswers={setSelectedAnswers}
          setIsSubmitted={setIsSubmitted}
          markedQuestions={markedQuestions}
          onMarkQuestion={handleMarkQuestion}
          onUnmarkQuestion={handleUnmarkQuestion}
          onBack={handleBack}
        />
      )}
      {subView === 'markedQuestions' && (
        <MarkedQuestions
          questions={markedQuestions}
          updateStatistics={updateStatistics}
          answerStatuses={answerStatuses}
          setSelectedAnswers={setSelectedAnswers}
          setIsSubmitted={setIsSubmitted}
          autoMarkWrong={autoMarkWrong}
          autoUnmarkCorrect={autoUnmarkCorrect}
          onMarkQuestion={handleMarkQuestion}
          onUnmarkQuestion={handleUnmarkQuestion}
          onBack={handleBack}
        />
      )}
    </>
  );

  return (
      <BrowserRouter basename="/EinbuergerungstestPro">
    <ThemeProvider theme={theme}>
      <Container style={{ paddingTop: '80px', paddingBottom: '56px' }}>
        <SafeArea onBack={handleBack} showBackButton={subView !== 'home'} title={view !== 'support' && view !== 'factsLegal' ? getTitle() : ''} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={9}>
            {view === 'main' && renderMainView()}
            {view === 'support' && <Support showBox={true} />}
            {view === 'factsLegal' && <FactsLegal />}
          </Grid>
        </Grid>
        <BottomNavBar currentView={view} onChangeView={handleNavClick} onMainClick={handleMainClick} />
        {subView === 'home' && view !== 'support' && view !== 'factsLegal' && (
          <Button
            elevation={30}
            variant="contained"
            color="primary"
            onClick={toggleControlPanel}
            style={{ boxShadow: '1px 5px 15px rgba(0,0,0.3)', margin: '2px', position: 'fixed', bottom: '160px', right: '20px', borderRadius: '50%', padding: '1px', minWidth: '56px', minHeight: '56px', backgroundColor: '#007bff', color: 'white' }}
          >
            <BookmarkAddedIcon />
          </Button>
        )}
        {showControlPanel && subView === 'home' && (
          <Paper style={{ position: 'fixed', bottom: '150px', right: '20px', padding: '20px', borderRadius: '8px' }}>
            <ControlPanel
              totalQuestions={300}
              answeredQuestions={Object.values(answerStatuses.mainTopic).filter(status => status !== 'unanswered').length}
              markedQuestions={markedQuestions}
              autoMarkWrong={autoMarkWrong}
              setAutoMarkWrong={setAutoMarkWrong}
              autoUnmarkCorrect={autoUnmarkCorrect}
              setAutoUnmarkCorrect={setAutoUnmarkCorrect}
              correctAnswers={statistics.mainTopic.correct}
              setShowControlPanel={setShowControlPanel}
            />
          </Paper>
        )}

        {markedQuestions && subView === 'home' && view !== 'support' && view !== 'factsLegal' && (
          <Paper elevation={30} style={{ position: 'fixed', bottom: '90px', right: '20px', padding: '2px', borderRadius: '10px' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleMarkedQuestionsClick}
              style={{ boxShadow: '1px 5px 15px rgba(0,0,0.3)', margin: '2px', minWidth: '20px', height: '50px', backgroundColor: '#007bff', color: 'white', fontWeight: 'bold' }}
            >
              <BookmarksIcon /> &nbsp; ({markedQuestions.length})
            </Button>
          </Paper>
        )}

        <Dialog
          open={showConfirmDialog}
          onClose={() => handleConfirmClose(false)}
        >
          <DialogTitle>Navi bestätigen</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Möchten Sie wirklich die Sitzung verlassen? Ihr aktueller Fortschritt geht verloren.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleConfirmClose(false)} color="primary">
              Abbrechen
            </Button>
            <Button onClick={() => handleConfirmClose(true)} color="primary" autoFocus>
              Bestätigen
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </ThemeProvider>
    </BrowserRouter>

  );
};

export default App;
