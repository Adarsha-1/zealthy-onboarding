import axios from "axios";
import React, { useEffect, useState } from "react";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

import "../styles/OnboardingWizard.css";

const OnboardingWizard = () => {

    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
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
        const savedData = localStorage.getItem('onboardingData');
        if(savedData) {
            const parsedData = JSON.parse(savedData);
            setFormData(parsedData);
            if(parsedData.email) setCurrentStep(2);
        }
    }, []);

    const handleNext = (data) => {

        const updatedData = {...formData, ...data};
        setFormData(updatedData);
        localStorage.setItem('onboarding', JSON.stringify(updatedData));
        setCurrentStep(currentStep+1);
    }

    const handleBack = () => {
        setCurrentStep(currentStep-1);
    }

    const handleSubmit = (data) => {

        const submit = async(data) => {
            try {
                const response = await axios.post('http://127.0.0.1:5000/api/user', data);
                if(response) {
                    // alert('User submitted successfully');
                    toast.success("User Submitted successfully!");
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
                    localStorage.removeItem('onboarding');
                    setCurrentStep(1);
                }
            } catch(error) {
                console.log("error posting the user data", error.message);
                toast.error("Submission failed. Please try again.")
            }
        };

        const finalData = {...formData, ...data};
        console.log("Final data is: ", finalData)
        submit(finalData);
    };

    const updateFormData = (updatedValues) => {
        const newData = { ...formData, ...updatedValues };
        setFormData(newData);
        localStorage.setItem('onboardingData', JSON.stringify(newData));
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
            {currentStep === 1 && <Step1 onNext={handleNext} formData={formData} />}
            {currentStep === 2 && <Step2 onNext={handleNext} onBack={handleBack} formData={formData} updateFormData = {updateFormData} />}
            {currentStep === 3 && <Step3 onSubmit={handleSubmit} onBack={handleBack} formData={formData} updateFormData={updateFormData}/>}
        </div>
    )

}

export default OnboardingWizard;