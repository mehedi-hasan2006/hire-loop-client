"use server";

const baseURL = process.env.SERVER_URL;

export const createJob = async (newJobData) => {
  try {
    const res = await fetch(`${baseURL}/api/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJobData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to create job");
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("Create Job Error:", error);

    return {
      success: false,
      message: error.message || "Something went wrong",
    };
  }
};

export const fetchJobs = async () => {
  const res = await fetch(`${baseURL}/api/jobs`);
  return res.json();
};

export const fetchJobDetails = async (id) => {
  const res = await fetch(`${baseURL}/api/jobs/${id}`);
  return res.json();
};
