import * as dao from "./dao.js"

export default function EnrollmentRoutes(app) {
    app.post("/api/enrollments/:courseId/:userId", (req, res) => {
        const { courseId, userId } = req.params;
        const newEnrollment = dao.enrollUserInCourse(userId, courseId);
        res.status(201).json(newEnrollment);
    });

    app.delete("/api/enrollments/:courseId/:userId", (req, res) => {
        const { courseId, userId } = req.params;
        const status = dao.unenrollUserFromCourse(userId, courseId);
        if (status) {
            res.status(200).json({ message: "Unenrolled successfully" });
        } else {
            res.status(404).json({ error: "Enrollment not found" });
        }
    });

    app.get("/api/enrollments", (req, res) => {
        const enrollments = dao.findAllEnrollments();
        res.json(enrollments);
    });
}