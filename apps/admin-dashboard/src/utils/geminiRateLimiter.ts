// import { GoogleGenAI } from '@google/genai';

// // Initialize the client
// const ai = new GoogleGenAI();

// class GeminiRateLimiter {
//   private lastCallTime: number = 0;
//   private readonly minInterval: number = 12000; // 12 seconds in milliseconds

//   /**
//    * Executes a Gemini API function only after ensuring a strict 12-second window
//    * has elapsed since the previous request.
//    */
//   async executeSafeRequest<T>(apiCall: () => Promise<T>): Promise<T> {
//     const now = Date.now();
//     const timeSinceLastCall = now - this.lastCallTime;

//     // If 12 seconds haven't passed yet, calculate wait time and delay
//     if (timeSinceLastCall < this.minInterval) {
//       const waitTime = this.minInterval - timeSinceLastCall;
//       console.log(`⏳ Rate limit protection: Waiting ${(waitTime / 1000).toFixed(2)}s before hitting Gemini API...`);
//       await new Promise((resolve) => setTimeout(resolve, waitTime));
//     }

//     try {
//       // Execute the actual API function passed as a callback
//       const result = await apiCall();
//       return result;
//     } catch (error: any) {
//       // Graceful fallback for accidental 429s or temporary 503 server overloads
//       if (error?.status === 429 || error?.status === 503) {
//         console.warn(`⚠️ Server returned status ${error.status}. Backing off for 20 seconds...`);
//         await new Promise((resolve) => setTimeout(resolve, 20000));
//         return this.executeSafeRequest(apiCall); // Retry operation
//       }
//       throw error;
//     } finally {
//       // Always track the timestamp of the last attempt
//       this.lastCallTime = Date.now();
//     }
//   }
// }

// export const geminiLimiter = new GeminiRateLimiter();
