import React, { useState, useEffect } from 'react';
import OtpInput from 'react-otp-input';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

const OTPVerificationPage = () => {
    const [otp, setOtp] = useState('');
    const [isResendDisabled, setIsResendDisabled] = useState(false);
    const [timer, setTimer] = useState();
    const { isVerifyingOTP, verifyOTP, resendOTP, authUser, isSendingOTP } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (authUser?.isVerified) {
            navigate(-1);
        }
    }, [authUser, navigate]);

    useEffect(() => {
        if (isResendDisabled && timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        } else if (timer === 0) {
            setIsResendDisabled(false);
        }
    }, [timer, isResendDisabled]);

    const handleVerifyOTP = async () => {
        await verifyOTP(otp);
    };

    const handleResendOTP = async () => {
        await resendOTP();
        setIsResendDisabled(true);
        setTimer(60);
    };

    return (
        <div className='min-h-[80vh] mt-6 w-full flex justify-center flex-col items-center gap-3'>
            <h1 className='text-3xl'>Enter Verification Code</h1>
            <OtpInput
                containerStyle={{
                    width: '100%',
                    minHeight: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '20px',
                    flexWrap: "wrap",
                    gap: "6px"
                }}
                inputStyle={{
                    width: '50px',
                    height: '50px',
                    border: '2px solid #ccc',
                    borderRadius: '10px',
                    fontSize: '24px',
                }}
                value={otp}
                onChange={setOtp}
                numInputs={4}
                renderSeparator={<span className='text-3xl'>-</span>}
                renderInput={(props) => <input {...props} />}
            />
            <div className='flex flex-col gap-3'>
                <button
                    className='px-4 py-2 disabled:bg-blue-600 bg-blue-800 hover:bg-blue-600 rounded-xl text-white flex  justify-center items-center gap-2'
                    disabled={otp.length < 4}
                    onClick={handleVerifyOTP}
                    type='submit'
                >
                    Verify {isVerifyingOTP && (
                        <div role="status">
                            <svg aria-hidden="true" class="w-5 h-5 ml-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                        </div>
                    )}
                </button>
                <p className='text-gray-600 flex gap-2 flex-wrap justify-center'>
                    Didn't receive code?
                    <button
                        className='text-blue-700 hover:underline flex items-center gap-2'
                        onClick={handleResendOTP}
                        disabled={isResendDisabled}
                    >
                        Resend {
                            isSendingOTP && (
                                <div role="status">
                                    <svg aria-hidden="true" class="w-5 h-5 ml-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                </div>
                            )
                        } {isResendDisabled && `(${timer}s)`}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default OTPVerificationPage;