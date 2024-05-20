import { Router } from "express";
import { isValid } from "../../middleware/validation.middleware.js";
import { foundPersonSchema } from "./foundPersonValidation.js";
import { isAuthenticated } from "../../middleware/authentication.middleware.js";
import { isAuthorized } from "../../middleware/authorization.middleware.js";
import { createFoundPerson, deleteFoundPersonById, getAllFoundPersons, getFoundPersonById} from "./foundPersonController.js";
import { multerCloudFunction } from "../../utils/multer.js"; // استيراد multerCloudFunction و allowedExtensions


const router = Router();
const fileUpload = multerCloudFunction(); // استخدام multerCloudFunction لتهيئة تحميل الملفات

// إضافة مسار لحذف شخص معثور عليه
router.get('/lost/:id', getFoundPersonById);



  
  
// استخدام fileUpload.single('image') لتحميل ملف الصورة فقط
router.post("/create", isAuthenticated, isAuthorized('user'), fileUpload.single('image'), isValid(foundPersonSchema), createFoundPerson);

// مسار للحصول على كل الأشخاص المعثور عليهم
router.get('/allusers', getAllFoundPersons);

router.delete('/:id', deleteFoundPersonById);


export default router;