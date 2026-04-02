import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const accessToken = Cookies.get("access_token") || null;
const refreshToken = Cookies.get("refresh_token") || null;
console.log(Cookies.get());
console.log(refreshToken,"refreshToken");

const activationToken = Cookies.get("activationToken") || null;
const token = Cookies.get("token") || null;

interface User {
  id: number;
  uid: string;
  userStatus: boolean;
  fcmToken: string;
  userId: string;
  email: string;
  otp: string | null;
  password: string;
  usertype: string;
  isVerified: boolean;
  isPersonalFormFilled: boolean;
  isQualificationFormFilled: boolean;
  isLocationFormFilled: boolean;
  isOtherFormFilled: boolean;
  isImageFormFilled: boolean;
  role: string;
  createdAt: string; // Consider using Date if you intend to handle these as Date objects
  updatedAt: string; 
 
}

type ToggleStatusType = {
  family_details: boolean;
  personal_details: boolean;
  religious_details: boolean;
  location_details: boolean;
  education_and_financial_details: boolean;
};

interface MyDetails {
  toggleStatus: ToggleStatusType;
 
  fcmToken: string;
  profileImage: string[];
  basic_and_lifestyle: {
    firstName: string;
    lastName: string;
    displayName: string;
    gender: string;
    age: string;
    about: string;
    religion: string;
    maritalStatus: string;
    numberOfChildren: number;
    postedBy: string;
  };
  family_details: {
    fatherOccupation: string;
    motherOccupation: string;
    numberOfSiblings: number;
    livingWithFamily: string;
  };
  personal_background: {
    height: string;
    weight: string;
    bodyType: string;
    language: string;
    smokingHabbit: string;
    drinkingHabbit: string;
    diet: string;
    complexion: string;
  };
  religious_background: {
    religion: string;
    community: string;
    subCommunity?: string;
    gotra?: string;
    timeOfBirth?: string;
    dateOfBirth?: string;
    placeOfBirth?: string;
    motherTongue?: string;
  };
  location_background: {
    country: string;
    state: string;
    currentLocation:string;
    cityOfResidence:string;
    nationality: string;
    citizenShip: string;
    residencyVisaStatus: string;
  };
  education_and_financial: {
    qualification: string;
    occupation: string;
    workingStatus: string;
    income: string;
  };
  interest_and_hobbies: string[];
}

interface ReauthenticatePassword {
  password: string;
}

interface InitialState {
  loading: boolean;
  user: User | null;
  notificationData: any | null;
  accessToken: string | null;
  refreshToken: string | null;
  activationToken: string | null;
  token: string | null;
  isPersonalFormFilled: boolean;
  isQualificationFormFilled: boolean;
  isOtherFormFilled: boolean;
  isLocationFormFilled: boolean;
  isImageFormFilled: boolean;
  myDetails: MyDetails | null;
  ReauthenticatePassword: ReauthenticatePassword | null;
}

const initialState : InitialState = {
  loading:true,
  user: null,
  notificationData: null,
  accessToken: accessToken || null,
  refreshToken: refreshToken || null,
  activationToken: activationToken,
  token: token,
  isPersonalFormFilled: false,
  isQualificationFormFilled: false,
  isOtherFormFilled: false,
  isLocationFormFilled: false,
  isImageFormFilled: false,
  myDetails: null,
  ReauthenticatePassword: null,
};

console.log(initialState.myDetails,"initialState");

const userSlice = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    setActivationToken: (state, action) => {
      const activationToken = (state.activationToken = action.payload);
      Cookies.set("activationToken", activationToken);
    },


    setUser: (state, action) => {
      state.loading = false;
    
    
      const accessToken = action.payload.accessToken || Cookies.get("access_token");
      const refreshToken = action.payload.refreshToken || Cookies.get("refresh_token");
    
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    
      const {
        user,
        isImageFormFilled,
        isLocationFormFilled,
        isPersonalFormFilled,
        isQualificationFormFilled,
        isOtherFormFilled,
      } = action.payload;
    
      state.user = user;
    
      state.isLocationFormFilled = user?.isLocationFormFilled || isLocationFormFilled || false;
      state.isImageFormFilled = user?.isImageFormFilled || isImageFormFilled || false;
      state.isPersonalFormFilled = user?.isPersonalFormFilled || isPersonalFormFilled || false;
      state.isQualificationFormFilled = user?.isQualificationFormFilled || isQualificationFormFilled || false;
      state.isOtherFormFilled = user?.isOtherFormFilled || isOtherFormFilled || false;
    },
    

    setCredentials: (state, action) => {
      state.accessToken = action.payload;
    },

    setNotificationData: (state, action) => {
      state.notificationData = action.payload;
    },

    setMyDetails: (state, action) => {
      console.log(action.payload,"action.payload");
     
      state.myDetails = action.payload;
    },
    updateFamilyDetail: (state, action) => {
      if (state.myDetails) {
        state.myDetails.family_details = action.payload;
      }
    },
    updatePersonalDetails: (state, action) => {
      if (state.myDetails) {
        state.myDetails.personal_background = action.payload;
      }
    },

    updateReligiousBackgroundDetails: (state, action) => {
      if (state.myDetails) {
        console.log(action.payload,"action.payload");
        state.myDetails.religious_background = action.payload;
      }
    },
    updateLocationDetail: (state, action) => {
      if (state.myDetails) {
        state.myDetails.location_background = action.payload;
      }
    },

    updateEducationDetails: (state, action) => {
      if (state.myDetails) {
        state.myDetails.education_and_financial = action.payload;
      }
    },


    setUserType: (state, action) => {
      if (state.user) {
        state.user.usertype = action.payload;
      }
    },

    SetReauthenticatePassword: (state, action) => {
      state.ReauthenticatePassword = action.payload;
    },



    
    logout: (state) => {
      state.user = initialState.user;
      state.accessToken = null;
      state.refreshToken = null;
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      localStorage.clear();
    },
  },
});

export const { setUser,setCredentials,  logout, setActivationToken ,setNotificationData,setUserType,setMyDetails,
  updateFamilyDetail,updatePersonalDetails,updateReligiousBackgroundDetails,updateLocationDetail,updateEducationDetails,SetReauthenticatePassword} =
  userSlice.actions;
export default userSlice;
