import { Router } from "express";
import {
    getClassRoom,
    createClassRoom,
    deleteClassRoom,
    updateClassRoom,
    addClassRoomMember,
    makeClassRoomOwner,
    removeClassRoomMember,
    leaveClassRoom,
    joinClassRoom
} from "../controllers/classroom.contoller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = Router();
router.use(isAuthenticated); // Apply isAuthenticated middleware to all routes in this file

router.route("/").post(createClassRoom);
router.route("/:classroomId")
    .get(getClassRoom)
    .patch(updateClassRoom)
    .delete(deleteClassRoom);
router.route("/:classroomId/member")
    .post(addClassRoomMember)
    .patch(makeClassRoomOwner)
    .delete(removeClassRoomMember);
router.route("/:classroomId/leave").delete(leaveClassRoom);
router.route("/join-classroom").post(joinClassRoom);

export default router;
