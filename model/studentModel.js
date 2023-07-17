const mongoose = require("mongoose");

const studentSchema = mongoose.Schema(
	{
		full_name: {
			type: String,
		},
        collegeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'College',
            required: false
        },
		email: {
			type: String,
			required: true,
			unique:true
		},
		is_passed:{
           type:Boolean,
		   default:true
		},
		pic: {
			type: String,
			default:
				"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
		},
		description:{
			type: String,
			default: "",
		},
		rating:{
			type:Number,
			default:1
		},
		batch:{
			type:String,
			default:""
		},
		certificate:{
			type:String,
			default:""
		},
		dob: {
			type: String,
			default: "",
		},
		mobile_number: {
			type: String,
			default: "",
		},
		address: {
			type: String,
			default: "",
		},
		city: {
			type: String,
			default: "",
		},
		state: {
			type: String,
			default: "",
		},
		pincode: {
			type: String,
			default: "",
		},
		gender: {
			type: String,
            enum:['Male','Female','Other']
		},
	},
	{
		timestamps: true,
	}
);



const student = mongoose.model("Student", studentSchema);
module.exports = student;
