import React from 'react'

export function sendOtp( ) {
    return {
    // return async (dispatch) => {
    //   const toastId = toast.loading("Loading...");
    //   dispatch(setLoading(true));
    //   try {
    //     const response = await apiConnector("POST", SENDOTP_API, {
    //       email,
    //       checkUserPresent: true,
    //     });
    //     console.log("SENDOTP API RESPONSE............", response);
  
    //     console.log(response.data.success);
  
    //     if (!response.data.success) {
    //       throw new Error(response.data.message);
    //     }
  
    //     toast.success("OTP Sent Successfully");
    //     navigate("/verify-email");
    //   } catch (error) {
    //     console.log("SENDOTP API ERROR............", error);
    //     toast.error("Could Not Send OTP");
    //   }
    //   dispatch(setLoading(false));
    //   toast.dismiss(toastId);
    };
  }