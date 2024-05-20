import mongoose from "mongoose";
import { FoundPerson } from "../../../DB/models/foundPerson.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

// إنشاء شخص معثور عليه جديد
export const createFoundPerson = asyncHandler(async (req, res, next) => {
  const userId = req.user._id; // افترض أن معرف المستخدم متاح في req.user

  const person = await FoundPerson.create({
    name: req.body.name,
    gender: req.body.gender,
    location: req.body.location,
    governorate: req.body.governorate,
    phone: req.body.phone,
    createdBy: userId,
  });

  return res.status(201).json({ success: true, id: person._id });
});


export const getFoundPersonById = asyncHandler(async (req, res, next) => {
  const requestId = req.params.id;

  // التحقق من صحة المعرّف
  if (!mongoose.Types.ObjectId.isValid(requestId)) {
    return res.status(400).json({ success: false, message: 'Invalid ID format' });
  }

  try {
    // البحث عن الطلب المحدد في قاعدة البيانات باستخدام معرّفه
    const foundPerson = await FoundPerson.findById(requestId);

    // التحقق من عدم وجود الطلب
    if (!foundPerson) {
      return res.status(404).json({ success: false, message: 'Found person not found' });
    }

    // إرجاع الطلب المحدد في الاستجابة
    return res.status(200).json({ success: true, data: foundPerson });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error retrieving found person' });
  }
});
export const getAllFoundPersons = asyncHandler(async (req, res) => {
  const foundPersons = await FoundPerson.find();
  res.status(200).json(foundPersons);
});

// حذف شخص معثور عليه
export const deleteFoundPersonById = asyncHandler(async (req, res, next) => {
  const requestId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(requestId)) {
    return res.status(400).json({ success: false, message: 'Invalid ID format' });
  }

  try {
    const foundPerson = await FoundPerson.findByIdAndDelete(requestId);

    if (!foundPerson) {
      return res.status(404).json({ success: false, message: 'Found person not found' });
    }

    return res.status(200).json({ success: true, message: 'Found person deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error deleting found person' });
  }
});