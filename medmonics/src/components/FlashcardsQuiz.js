import React, { useState } from 'react';
import { ChevronLeft, Brain, Check, X } from 'lucide-react';

const FlashcardQuiz = ({ mnemonics, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentMnemonic = mnemonics[currentIndex];

  const handleAnswer = (correct) => {
    setScore(prev => ({
      ...prev,
      [correct ? 'correct' : 'incorrect']: prev[correct ? 'correct' : 'incorrect'] + 1
    }));
    
    setTimeout(() => {
      if (currentIndex + 1 >= mnemonics.length) {
        setQuizCompleted(true);
      } else {
        setCurrentIndex(prev => prev + 1);
        setShowAnswer(false);
      }
    }, 500);
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setShowAnswer(false);
    setScore({ correct: 0, incorrect: 0 });
    setQuizCompleted(false);
  };

  if (quizCompleted) {
    const totalQuestions = score.correct + score.incorrect;
    const percentage = Math.round((score.correct / totalQuestions) * 100);

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="h-10 w-10 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Quiz Complete!</h2>
            <p className="text-gray-600">Great job studying those mnemonics!</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">{percentage}%</div>
            <div className="text-sm text-gray-600">
              {score.correct} correct out of {totalQuestions} questions
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={resetQuiz}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={onBack}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Back to Library
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Library
          </button>
          <div className="text-sm text-gray-600">
            Question {currentIndex + 1} of {mnemonics.length}
          </div>
          <div className="text-sm text-gray-600">
            Score: {score.correct}/{score.correct + score.incorrect}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl">
          <div className="text-center mb-8">
            <div className="bg-blue-100 rounded-lg p-4 mb-4">
              <h2 className="text-xl font-bold text-blue-900 mb-2">{currentMnemonic.title}</h2>
              <p className="text-blue-700">{currentMnemonic.category}</p>
            </div>

            {!showAnswer ? (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  What does this mnemonic help you remember?
                </h3>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <p className="text-lg font-medium text-yellow-800">{currentMnemonic.mnemonic}</p>
                </div>
                <button
                  onClick={() => setShowAnswer(true)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Show Answer
                </button>
              </div>
            ) : (
              <div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <p className="text-green-800">{currentMnemonic.explanation}</p>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Did you get it right?</h3>
                <div className="flex space-x-4 justify-center">
                  <button
                    onClick={() => handleAnswer(false)}
                    className="flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Incorrect
                  </button>
                  <button
                    onClick={() => handleAnswer(true)}
                    className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Correct
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / mnemonics.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardQuiz;