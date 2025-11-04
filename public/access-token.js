async function getAccessToken() {
  try {
    //const csrfToken = await getCsrfToken();
    const response = await fetch("/api/qlik/accesstoken", {
      method: "POST",
      credentials: "include",
      mode: "same-origin",
      redirect: "follow"
    });

    if (response.status === 200) {
      //return response.text();
      const t = await response.json();
      return t.accessToken;
    }

    const err = new Error("Unexpected server-side authentication error");
    err.status = response.status;
    err.detail = await response.text().catch(() => "No details available");
    throw err;
  } catch (error) {
    console.error("Access token error:", error);
    throw error;
  }
}
