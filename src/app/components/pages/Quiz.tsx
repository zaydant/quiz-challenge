"use client";

import { fetchTriviaQuestions } from "@/app/services/quiz-service";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuizStore } from "@/app/store/quizStore";
import { Button } from "@/components/ui/button";

export default function QuizPage() {
  const [amount, setAmount] = useState(10);
  const [category, setCategory] = useState(9);
  const [difficulty, setDifficulty] = useState("medium");
  const [hasSavedState, setHasSavedState] = useState(false);
  const setQuestions = useQuizStore((state) => state.setQuestions);
  const setCorrectAnswers = useQuizStore((state) => state.setCorrectAnswers);
  const initializeAnswers = useQuizStore((state) => state.initializeAnswers);
  const setTimeRemaining = useQuizStore((state) => state.setTimeRemaining);
  const loadQuizState = useQuizStore((state) => state.loadQuizState);
  const router = useRouter();

  useEffect(() => {
    const savedState = localStorage.getItem("quizState");
    if (savedState) {
      setHasSavedState(true);
    }
  }, []);

  const handleFetchQuestions = async () => {
    try {
      const fetchedQuestions = await fetchTriviaQuestions(
        amount,
        category,
        difficulty
      );

      const questions = fetchedQuestions.map((q) => ({ question: q.question }));
      const correctAnswers = fetchedQuestions.map((q) => ({
        correct_answer: q.correct_answer === "True",
      }));

      setQuestions(questions);
      setCorrectAnswers(correctAnswers);
      initializeAnswers();
      setTimeRemaining(30);

      router.push("/quiz/0");
    } catch (error) {
      console.error("Error fetching trivia questions:", error);
    }
  };

  const handleContinueQuiz = () => {
    loadQuizState();
    const currentQuestionIndex = useQuizStore.getState().currentQuestionIndex;
    router.push(`/quiz/${currentQuestionIndex}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white poppins w-full">
      <div className="w-full p-4 min-h-screen flex flex-col items-center justify-center">
        <div className="font-bold text-4xl mt-8">Welcome to The Quiz!</div>

        <div className="flex flex-col space-y-4 mt-8">
          <Select
            value={String(amount)}
            onValueChange={(value) => setAmount(Number(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Amount" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5 Questions</SelectItem>
              <SelectItem value="10">10 Questions</SelectItem>
              <SelectItem value="15">15 Questions</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={String(category)}
            onValueChange={(value) => setCategory(Number(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="9">General Knowledge</SelectItem>
              <SelectItem value="15">Video Games</SelectItem>
              <SelectItem value="17">Science & Nature</SelectItem>
            </SelectContent>
          </Select>

          <Select value={difficulty} onValueChange={setDifficulty}>
            <SelectTrigger>
              <SelectValue placeholder="Select Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>

          <Button
            onClick={handleFetchQuestions}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Start Quiz
          </Button>
          {hasSavedState && (
            <div className="flex flex-col p-2">
              <h3 className="font-bold">You still have an unfinished quiz!</h3>
              <Button
                onClick={handleContinueQuiz}
                className="px-4 py-2 bg-green-600 text-white rounded-md mt-4"
              >
                Continue Quiz
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
