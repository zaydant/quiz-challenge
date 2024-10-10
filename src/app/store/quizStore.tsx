import { create } from "zustand";

interface QuizState {
  questions: { question: string }[];
  answers: { [index: number]: boolean | null };
  correctAnswers: { correct_answer: boolean }[];
  timeRemaining: number;
  currentQuestionIndex: number;
  setQuestions: (questions: { question: string }[]) => void;
  setCorrectAnswers: (correctAnswers: { correct_answer: boolean }[]) => void;
  setAnswer: (index: number, answer: boolean) => void;
  setTimeRemaining: (time: number) => void;
  setCurrentQuestionIndex: (index: number) => void;
  saveQuizState: () => void;
  loadQuizState: () => void;
  resetQuizState: () => void;
  decrementTime: () => void;
  initializeAnswers: () => void;
}

export const useQuizStore = create<QuizState>((set, get) => ({
  questions: [],
  correctAnswers: [],
  answers: {},
  timeRemaining: 30,
  currentQuestionIndex: 0,
  setQuestions: (questions) => set({ questions }),
  setCorrectAnswers: (correctAnswers) => set({ correctAnswers }),
  setAnswer: (index, answer) =>
    set((state) => ({
      answers: { ...state.answers, [index]: answer },
    })),
  setTimeRemaining: (time) => set({ timeRemaining: time }),
  setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),
  decrementTime: () =>
    set((state) => ({ timeRemaining: Math.max(0, state.timeRemaining - 1) })),
  initializeAnswers: () =>
    set((state) => ({
      answers: Object.fromEntries(
        state.questions.map((_, index) => [index, null])
      ),
    })),

  saveQuizState: () => {
    const { questions, answers, correctAnswers, timeRemaining, currentQuestionIndex } = get();
    const quizState = {
      questions,
      answers,
      correctAnswers,
      timeRemaining,
      currentQuestionIndex,
    };
    localStorage.setItem("quizState", JSON.stringify(quizState));
  },

  loadQuizState: () => {
    const savedState = localStorage.getItem("quizState");
    if (savedState) {
      const {
        questions,
        answers,
        correctAnswers,
        timeRemaining,
        currentQuestionIndex,
      } = JSON.parse(savedState);
      set({
        questions,
        answers,
        correctAnswers,
        timeRemaining,
        currentQuestionIndex,
      });
    }
  },

  // Reset the quiz state
  resetQuizState: () => {
    set({
      questions: [],
      answers: {},
      correctAnswers: [],
      timeRemaining: 30,
      currentQuestionIndex: 0,
    });
    localStorage.removeItem("quizState");
  },
}));
