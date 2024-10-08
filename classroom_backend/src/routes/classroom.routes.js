import { Router } from "express";
import {
    getClassRoom,
    createClassRoom,
    getAllClassRoomUser,
    deleteClassRoom,
    updateClassRoom,
    addClassRoomMember,
    makeClassRoomOwner,
    removeClassRoomMember,
    leaveClassRoom,
    joinClassRoom,
    searchClassRooms
} from "../controllers/classroom.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = Router();
router.use(isAuthenticated); // Apply isAuthenticated middleware to all routes in this file

router.route("/")
    .post(createClassRoom)
    .get(getAllClassRoomUser);
router.route("/search").get(searchClassRooms);
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
