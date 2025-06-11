import * as dao from "./dao.js"

export default function AssignmentRoutes(app) {
    app.get("/api/assignments/:courseId", (req, res) => {
        const { courseId } = req.params;
        const assignments = dao.findAssignmentsForCourse(courseId);
        res.send(assignments);
    });

    app.put("/api/assignments/:courseId/:assignmentId", (req, res) => {
        const { assignmentId } = req.params;
        const assignmentUpdates = req.body;
        const status = dao.updateAssignment(assignmentId, assignmentUpdates);
        res.send(status);
    });

    app.delete("/api/assignments/:courseId/:assignmentId", (req, res) => {
        const { courseId, assignmentId } = req.params;
        const status = dao.deleteAssignment(assignmentId);
        res.send(status);
    })

    app.post("/api/assignments/:courseId/", (req, res) => {
        const { courseId } = req.params;
        const newAssignment = dao.createAssignment(req.body);
        res.json(newAssignment)
    })
}