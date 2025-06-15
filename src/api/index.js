// src/api/index.js
export const fetchQuestions = async (topicId) => {
  const questions = {
    1: [
      {
        id: 1,
        text: 'What is the capital of Germany?',
        options: ['Berlin', 'Munich', 'Frankfurt'],
        correctAnswer: 'Berlin',
        explanation: 'Berlin is the capital of Germany.',
      },
      {
        id: 2,
        text: 'What is the national language of Germany?',
        options: ['French', 'German', 'English'],
        correctAnswer: 'German',
        explanation: 'German is the national language of Germany.',
      },
    ],
    2: [
      {
        id: 3,
        text: 'What is the largest city in Germany?',
        options: ['Berlin', 'Munich', 'Hamburg'],
        correctAnswer: 'Berlin',
        explanation: 'Berlin is the largest city in Germany.',
      },
    ],
  };
  return questions[topicId] || [];
};

export const fetchSubTopics = async () => {
  const subTopics = [
    { id: 2, name: 'Sub Topic 1' },
    { id: 3, name: 'Sub Topic 2' },
  ];
  return subTopics;
};
