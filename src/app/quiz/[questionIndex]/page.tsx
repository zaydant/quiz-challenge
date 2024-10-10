"use client";

import { useEffect } from 'react';
import NavBar from '@/app/components/Navbar';
import { useQuizStore } from '@/app/store/quizStore';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function QuestionPage({ params }: { params: { questionIndex: string } }) {
  const router = useRouter();
  const { questionIndex } = params;
  const index = parseInt(questionIndex, 10);
  const questions = useQuizStore((state) => state.questions);
  const setAnswer = useQuizStore((state) => state.setAnswer);
  const setCurrentQuestionIndex = useQuizStore((state) => state.setCurrentQuestionIndex);
  const saveQuizState = useQuizStore((state) => state.saveQuizState);
  const timeRemaining = useQuizStore((state) => state.timeRemaining);
  const decrementTime = useQuizStore((state) => state.decrementTime);
  const question = questions[index];

  useEffect(() => {
    const timer = setInterval(() => {
      decrementTime();
    }, 1000);

    return () => clearInterval(timer);
  }, [decrementTime]);

  useEffect(() => {
    if (timeRemaining === 0) {
      router.push('/quiz/results');
    }
  }, [timeRemaining, router]);

  if (!question) {
    return <div>No question found.</div>;
  }

  const handleAnswer = (answer: boolean) => {
    setAnswer(index, answer);
    setCurrentQuestionIndex(index); 
    if (index < questions.length - 1) {
      router.push(`/quiz/${index + 1}`);
    } else {
      router.push('/quiz/results');
    }
  };

  const handlePrev = () => {
    if (index > 0) {
      router.push(`/quiz/${index - 1}`);
    }
  };

  const handleQuit = () => {
    setCurrentQuestionIndex(index);
    saveQuizState();
    router.push('/');
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <NavBar />
      <div className="w-full p-4 min-h-screen flex flex-col items-center justify-center">
        <div className="font-bold mb-2">
          Question {index + 1}/{questions.length}
        </div>
        <div className="text-xl mb-4">
          Time Remaining: {timeRemaining} seconds
        </div>
        <div className="font-bold text-2xl mt-4 text-center max-w-2xl">
          {question.question}
        </div>
        
        {/* True/False buttons */}
        <div className="mt-8 space-x-4">
          <Button 
            onClick={() => handleAnswer(true)}
            className='bg-green-600 hover:bg-green-700'
          >
            True
          </Button>
          <Button 
            onClick={() => handleAnswer(false)} 
            className="bg-red-600 hover:bg-red-700"
          >
            False
          </Button>
        </div>

        <div className="mt-8 space-x-4">
          <Button onClick={handlePrev} disabled={index === 0}>
            Previous
          </Button>
          <Button onClick={handleQuit}>
            Quit
          </Button>
        </div>
      </div>
    </div>
  );
}
