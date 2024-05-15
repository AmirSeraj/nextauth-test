"use server"
/**PATH */
const sanctum_path =
  process.env.NEXT_PUBLIC_APP_URL_SANCTUM + "/sanctum/csrf-cookie";
const path = process.env.NEXT_PUBLIC_APP_URL_API + "/user";
/**PATH */

export const loggedInUser = async (token: string) => {
  try {
    //CSRF Token
    const csrf_response = await fetch(sanctum_path, {
      method: "GET",
      credentials: "include", //Include credentials for cross-origin requests
    });

    if (csrf_response.ok) {
      try {
        /**login user */
        const res = await fetch(path, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + token,
          },
        });
        const response = await res.json();
        console.log("user server:", response);
        return response;
      } catch (error) {
        console.log("error2", error);
        return {
          error: "Something Wrong, try again!",
          success: false,
        };
      }
    }
  } catch (error) {
    console.log("error", error);
    return {
      error: "Something Wrong, try again!",
      success: false,
    };
  }
};
