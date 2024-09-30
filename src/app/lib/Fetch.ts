require("dotenv").config();

export const Fetch = async (
  path: string,
  method: any,
  data?: { [key: string]: any }
): Promise<{
  error: { message?: string } | null;
  success?: string;
  [key: string]: any;
}> => {
  try {
    switch (method) {
      case "post": {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${path}`, {
          method: "POST",
          cache: "no-cache",
          body:
            data instanceof FormData
              ? data
              : data
              ? JSON.stringify(data)
              : undefined,
        });

        const resData = await res.json();

        return resData;
      }
    }
  } catch (e) {
    return { error: {} };
  }

  return { error: {} };
};
