// types/global.d.ts

declare global {
  interface ResponseApi<T> {
    errCode: number;
    message: string;
    data: T | null;
  }
}

// Để đảm bảo tệp này được coi là mô-đun
export {};
