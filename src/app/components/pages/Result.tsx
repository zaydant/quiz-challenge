"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuizStore } from '@/app/store/quizStore';
import { Button } from '@/components/ui/button';

export default function ResultsPage() {
  const router = useRouter();
  const questions = useQuizStore((state) => state.questions);
  const userAnswers = useQuizStore((state) => state.answers);
  const correctAnswers = useQuizStore((state) => state.correctAnswers);
  const resetQuizState = useQuizStore((state) => state.resetQuizState);

  useEffect(() => {
    if (questions.length === 0) {
      router.push('/');
    }
  }, [questions, router]);

  const calculateScore = () => {
    return Object.keys(userAnswers).reduce((score, index) => {
      const userAnswer = userAnswers[parseInt(index)];
      const correctAnswer = correctAnswers[parseInt(index)]?.correct_answer;
      return userAnswer === correctAnswer ? score + 1 : score;
    }, 0);
  };

  const handleRetry = () => {
    resetQuizState();
    router.push('/'); 
  };

  const score = calculateScore();
  const totalQuestions = questions.length;

  const getUserAnswerDisplay = (answer: boolean | null) => {
    if (answer === null) return "Not Answered";
    return answer ? "True" : "False";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="w-full p-4 min-h-screen flex flex-col items-center justify-center">
        <h1 className="font-bold text-3xl mb-8">Quiz Results</h1>
        <p className="text-2xl mb-8">Your Score: {score} / {totalQuestions}</p>

        <div className="w-full max-w-2xl">
          {questions.map((question, index) => {
            const userAnswer = userAnswers[index];
            const correctAnswer = correctAnswers[index]?.correct_answer;
            return (
              <div key={index} className="mb-6 p-4 border rounded-lg">
                <p className="font-semibold mb-2">{question.question}</p>
                <p className="mb-1">Your answer: <span className={
                  userAnswer === null ? "text-yellow-600" :
                  userAnswer === correctAnswer ? "text-green-600" : "text-red-600"
                }>{getUserAnswerDisplay(userAnswer)}</span></p>
                <p className="mb-1">Correct answer: {correctAnswer ? "True" : "False"}</p>
                {userAnswer !== correctAnswer && userAnswer !== null && (
                  <p className="text-red-600">Incorrect</p>
                )}
                {userAnswer === null && (
                  <p className="text-yellow-600">Not Answered</p>
                )}
              </div>
            );
          })}
        </div>

        <Button onClick={handleRetry} className="mt-8">
          Try Again
        </Button>
      </div>
    </div>
  );
}
