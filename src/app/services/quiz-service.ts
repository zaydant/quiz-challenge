import axios from 'axios';

interface TriviaQuestion {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface TriviaResponse {
  response_code: number;
  results: TriviaQuestion[];
}

const baseApiUrl = 'https://opentdb.com/api.php';

export const fetchTriviaQuestions = async (
  amount: number = 10,
  category: number = 9,
  difficulty: string = 'medium',
): Promise<TriviaQuestion[]> => {
  const apiUrl = `${baseApiUrl}?amount=${amount}&category=${category}&difficulty=${difficulty}&type=boolean`;

  try {
    const response = await axios.get<TriviaResponse>(apiUrl);
    if (response.data.response_code === 0) {
      return response.data.results;
    } else {
      throw new Error('Failed to fetch trivia questions');
    }
  } catch (error) {
    console.error('Error fetching trivia questions:', error);
    throw error;
  }
};
