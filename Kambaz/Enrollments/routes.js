import * as dao from "./dao.js"

export default function EnrollmentRoutes(app) {
    app.post("/api/enrollments/:courseId/:userId", async (req, res) => {
        const { courseId, userId } = req.params;
        const newEnrollment = await dao.enrollUserInCourse(userId, courseId);
        res.status(201).json(newEnrollment);
    });

    app.delete("/api/enrollments/:courseId/:userId", async (req, res) => {
        const { courseId, userId } = req.params;
        const status = await dao.unenrollUserFromCourse(userId, courseId);
        if (status) {
            res.status(200).json({ message: "Unenrolled successfully" });
        } else {
            res.status(404).json({ error: "Enrollment not found" });
        }
    });

    app.get("/api/enrollments", async (req, res) => {
        const enrollments = await dao.findAllEnrollments();
        res.json(enrollments);
    });
}