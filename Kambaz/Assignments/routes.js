import * as dao from "./dao.js"

export default function AssignmentRoutes(app) {
    app.get("/api/assignments/:courseId", async (req, res) => {
        const { courseId } = req.params;
        const assignments = await dao.findAssignmentsForCourse(courseId);
        res.send(assignments);
    });

    app.put("/api/assignments/:courseId/:assignmentId", async (req, res) => {
        const { assignmentId } = req.params;
        const assignmentUpdates = req.body;
        const status = await dao.updateAssignment(assignmentId, assignmentUpdates);
        res.send(status);
    });

    app.delete("/api/assignments/:courseId/:assignmentId", async (req, res) => {
        const { courseId, assignmentId } = req.params;
        const status = await dao.deleteAssignment(assignmentId);
        res.send(status);
    })

    app.post("/api/assignments/:courseId/", async (req, res) => {
        const { courseId } = req.params;
        const newAssignment = await dao.createAssignment(req.body);
        res.json(newAssignment)
    })
}