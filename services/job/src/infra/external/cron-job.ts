import cron from "node-cron";
import jobModel from "../databases/mongodb/models/jobModel";

cron.schedule("* * * * *", async () => {
  const now = new Date();
  try {
    const result = await jobModel.updateMany(
      { expiry: { $lte: now }, expired: false }, // Select jobs where expiry date is past and not already marked as expired
      { $set: { expired: true } } // Set expired status to true
    );
    await jobModel.updateMany(
      { expiry: { $gte: now }, expired: true }, // Select jobs where expiry date is past and not already marked as expired
      { $set: { expired: false } } // Set expired status to true
    )
    const jobs = await jobModel.find();

    for (const job of jobs) {
      if (job.vacancies !== null && job.vacancies !== undefined) {
        const numApplicants = job.applicants.length;
        if (
          job.vacancies.filled !== null &&
          job.vacancies.filled !== undefined
        ) {
          job.vacancies.filled = numApplicants;
        }
      }

      // Save the updated job
      await job.save();
    }
    // console.log("🚀 ~ cron.schedule ~ result:", result)
  } catch (error) {
    console.error("Error updating expired jobs", error);
  }
});
