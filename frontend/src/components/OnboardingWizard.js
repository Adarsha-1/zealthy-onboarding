import React, { useEffect, useState } from "react";
import {ToastContainer, toast, Bounce} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

import "../styles/OnboardingWizard.css";
import { createUser, updateUser } from "../api/Api";

const OnboardingWizard = () => {

    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        user_id: '',
        email: '',
        password: '',
        about_me: '',
        street_address: '',
        city: '',
        state: '',
        zip_code: '',
        birthdate: '',
    });

    useEffect(() => {
        // const savedData = localStorage.getItem('onboardingData');
        // if(savedData) {
        //     const parsedData = JSON.parse(savedData);
        //     setFormData(parsedData);
        //     if(parsedData.email) setCurrentStep(2);
        // }
    }, []);

    const handleNextFromStep1 = async(data) => {
        if(formData.user_id && formData.email === data.email && formData.password === data.password) {
            setCurrentStep(2);
            return
        }
        // If credentials are different (or user not created yet), reset step2/3 data
        const newFormData = {
            user_id: "",
            email: data.email,
            password: data.password,
            about_me: "",
            street_address: "",
            city: "",
            state: "",
            zip_code: "",
            birthdate: "",
        };
        try {
            const response = await createUser(data.email, data.password);
            // const response = await axios.post("http://127.0.0.1:5000/api/user", {
            //     email: data.email,
            //     password: data.password,
            // });
            if(response.data && response.data.user_id) {
                // const newData = {...formData, ...response.data, user_id:response.data.user_id};
                const new1Data = {...newFormData, ...response.data, ...data};
                console.log('already existing user data after adding new data is: ', new1Data);
                setFormData(new1Data);
                // localStorage.setItem('onboardingData', JSON.stringify(new1Data));
                updateFormData(new1Data);
                setCurrentStep(2);
            }
        } catch(error) {
            console.error("Error creating user: ", error.response.data);
            toast.error(error.response.data['error'], {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
                });
        }
    }

    const handleNextFromStep2 = async(data) => {
        const updatedData = {...formData, ...data};
        setFormData(updatedData);
        // localStorage.setItem('onboardingData', updatedData);
        console.log("Data from step2: ", updatedData)

        if(updatedData.user_id) {
            try {
                await updateUser(updatedData.user_id, {
                    about_me : updatedData.about_me,
                    street_address: updatedData.street_address,
                    city: updatedData.city,
                    state: updatedData.state,
                    zip_code: updatedData.zip_code,
                    birthdate: updatedData.birthdate,
                })
                // const response = await axios.patch(`http://127.0.0.1:5000/api/user/${updatedData.user_id}`, {
                //     about_me : updatedData.about_me,
                //     street_address: updatedData.street_address,
                //     city: updatedData.city,
                //     state: updatedData.state,
                //     zip_code: updatedData.zip_code,
                //     birthdate: updatedData.birthdate,
                // });
            } catch(error) {
                console.error("Error updating user step 2: ", error.response?.data || error.message);
                toast.error(error.response?.data['error'] || "Error updating user step 2", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                    });
            }
        }
        setCurrentStep(3);
    }

    // const handleNext = (data) => {

    //     const updatedData = {...formData, ...data};
    //     setFormData(updatedData);
    //     localStorage.setItem('onboardingData', JSON.stringify(updatedData));
    //     setCurrentStep(currentStep+1);
    // }

    const handleBack = () => {
        setCurrentStep(currentStep-1);
    }

    const handleSubmit = (data) => {

        const submit = async(data) => {
            try {
                const response = await updateUser(data.user_id, {
                    about_me: data.about_me,
                    street_address: data.street_address,
                    city: data.city,
                    state: data.state,
                    zip_code: data.zip_code,
                    birthdate: data.birthdate,
                })
                // const response = await axios.patch(`http://127.0.0.1:5000/api/user/${data.user_id}`, {
                //     about_me: data.about_me,
                //     street_address: data.street_address,
                //     city: data.city,
                //     state: data.state,
                //     zip_code: data.zip_code,
                //     birthdate: data.birthdate,
                // });
                console.log("Final Submit data response is: ", response);
                if(response.data) {
                    // alert('User submitted successfully');
                    console.log("Entered final submit");
                    toast.success("User Submitted successfully!", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        transition: Bounce,
                        });

                    setTimeout(() => {
                        setFormData({
                            email: "",
                            password: "",
                            about_me: "",
                            street_address: "",
                            city: "",
                            state: "",
                            zip_code: "",
                            birthdate: "",
                          });
                        setCurrentStep(1);
                        }, 2000);
                }
            } catch(error) {
                console.log("error posting the user data", error.message);
                toast.error("Submission failed. Please try again.")
            }
        };

        const finalData = {...formData, ...data};
        console.log("Final data is: ", finalData)
        if(finalData.user_id) {
            submit(finalData);
        } else {
            alert("Failed to update data")
            toast.error("Failed to update data", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
                });
        }
    };

    const updateFormData = (updatedValues) => {
        // const newData = { ...formData, ...updatedValues };
        // setFormData(newData);
        setFormData(prevData => ({
            ...prevData, ...updatedValues
        }));
        // localStorage.setItem('onboardingData', JSON.stringify(newData));
    };

     // Helper function to validate age (at least 12 years old)
    const isValidAge = (birthdate) => {
        const today = new Date();
        const birthDate = new Date(birthdate);
        let age = today.getFullYear() - birthDate.getFullYear();
        console.log("Today year is: ", today.getFullYear(), " and birth year usL : ", birthDate.getFullYear());
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
        }
        console.log("Current age is: ", age);
        return age >= 12;
    };
      

    return (
        <div className="container">
            <ToastContainer />
            <h2 className="header">Onboarding Wizard - Step {currentStep} of 3</h2>
            {/* Step Indicator */}
            <div className="stepIndicator">
                {Array.from({ length: 3 }, (_, index) => {
                const stepNumber = index + 1;
                return (
                    <div
                    key={stepNumber}
                    className={`step ${currentStep === stepNumber ? "activeStep" : ""}`}
                    >
                    {stepNumber}
                    </div>
                );
                })}
            </div>
            {currentStep === 1 && <Step1 onNext={handleNextFromStep1} formData={formData} />}
            {currentStep === 2 && <Step2 onNext={handleNextFromStep2} onBack={handleBack} formData={formData} updateFormData = {updateFormData} isValidAge={isValidAge} />}
            {currentStep === 3 && <Step3 onSubmit={handleSubmit} onBack={handleBack} formData={formData} updateFormData={updateFormData} isValidAge={isValidAge}/>}
        </div>
    )

}

export default OnboardingWizard;