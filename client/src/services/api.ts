import {
  DeckResponse,
  ShuffleResponse,
  SortResponse,
  ResetResponse,
  ApiError,
} from "../types/api";

const API_BASE_URL = process.env.REACT_APP_API_URL!;

interface RequestOptions extends RequestInit {
  headers?: Record<string, string>;
}

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const config: RequestOptions = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorMessage = `HTTP error! status: ${response.status}`;
        const apiError: ApiError = {
          message: errorMessage,
          status: response.status,
        };
        throw apiError;
      }

      const data = await response.json();

      if (!data.success) {
        const apiError: ApiError = {
          message: data.error || "API request failed",
          status: response.status,
        };
        throw apiError;
      }

      return data as T;
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  async getDeck(): Promise<DeckResponse> {
    return this.request<DeckResponse>("/deck");
  }

  async shuffleDeck(): Promise<ShuffleResponse> {
    return this.request<ShuffleResponse>("/shuffle", {
      method: "POST",
    });
  }

  async sortDeck(): Promise<SortResponse> {
    return this.request<SortResponse>("/sort", {
      method: "POST",
    });
  }

  async resetDeck(): Promise<ResetResponse> {
    return this.request<ResetResponse>("/reset", {
      method: "POST",
    });
  }
}

export const apiService = new ApiService();
