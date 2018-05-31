import mongoose from "mongoose";
import schema from "./methods";

const Feedback = mongoose.model('Feedback', schema, 'feedbacks');

export default Feedback;