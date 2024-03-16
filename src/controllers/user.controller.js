import {asyncHandler} from "../utils/AsyncHandler.js";
import {ApiError} from "../utils/APiError.js";
import {User} from "../models/user.model.js"; 
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler( async (req,res) => {
    // get user details from frontend
    const {fullName,email,username,password} = req.body;
    console.log(fullName,username,email);

    // validate password
    if(
        [fullName,email,username,password].some((field) => field?.trim()==="")
    ){
        throw new ApiError(400,"All fields are compulsary and required");   
    }


    // check if user already exists ?

    const existingUser = User.findOne({
        $or: [{username}, {email}]
    });

    if(existingUser){
        throw new ApiError(409,"User with email or username already exists");
    }

    // check for files 
    const avtarLocalPath = req.files?.avtar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;
    if (!avtarLocalPath){
        throw new ApiError(400,"Avtar file is requrired");
    }

    // uppload dp on cloudinary using multer

    const avatar = await uploadOnCloudinary(avtarLocalPath);
    const coverImage =  await uploadOnCloudinary(coverImageLocalPath);

    if(!avatar){
        throw new ApiError(400,"Avatar file is requrired");
    }

    //save details

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage.url || "",
        email,
        password,
        username: username.toLowerCase(),
    })

    const createdUser = User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering a user");
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered Successfully")
    )

    User.create()

    // return response 
})

export {registerUser}; 