import Cookies from 'js-cookie';

interface RegisterUserProps {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
}

interface LoginUserProps {
  email: string;
  password: string;
}

interface User {
    uid: string;
    email: string;
    username: string;
    role: string;
  }

interface ServiceResponse {
    message: string;
    data: {
      user: User;
      token: string;
    } | null;
    error?: string;
  }


const baseUrl = "https://api-dante-joki-871423140998.asia-southeast2.run.app/api";

export async function registerUserService(userData: RegisterUserProps): Promise<ServiceResponse> {
  const url = `${baseUrl}/auth/register`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userData }),
      cache: "no-cache",
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        message: result.message || "Registration failed",
        data: null,
        error: result.error || `HTTP error! status: ${response.status}`,
      };
    }

    // Save token in cookie if the response is successful
    if (result.data?.token) {
      Cookies.set('authToken', result.data.token, { expires: 7 });
    }

    return {
      message: result.message || "Registration successful",
      data: {
        user: {
          uid: result.data.uid,
          email: result.data.email,
          username: result.data.username,
          role: result.data.role,
        },
        token: result.data.token,
      },
    };
  } catch (error) {
    console.error("Registration Service Error:", error);
    return {
      message: "Registration failed",
      data: null,
      error: error instanceof Error ? error.message : "An unexpected error occurred during registration",
    };
  }
}

export async function loginUserService(userData: LoginUserProps): Promise<ServiceResponse> {
  const url = `${baseUrl}/auth/login`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
      cache: "no-cache",
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        message: result.message || "Login failed",
        data: null,
        error: result.error || `HTTP error! status: ${response.status}`,
      };
    }

    // Save token in cookie
    if (result.data?.token) {
      Cookies.set('authToken', result.data.token, { expires: 7 });
    }

    return {
      message: result.message,
      data: {
        user: {
          uid: result.data.uid,
          email: result.data.email,
          username: result.data.username,
          role: result.data.role,
        },
        token: result.data.token,
      },
    };
  } catch (error) {
    console.error("Login Service Error:", error);
    return {
      message: "Login failed",
      data: null,
      error: error instanceof Error ? error.message : "An unexpected error occurred during login",
    };
  }
}