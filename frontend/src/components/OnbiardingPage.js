import React from "react";
import { Typewriter } from "react-simple-typewriter"; 
import OnboardingWizard from "./OnboardingWizard";

import "../styles/OnboardingPage.css";

const OnboardingPage = () => {
  return (
    <div className="onboarding-page">
      {/* Left side: Welcome text with typing effect */}
      <div className="welcome-section">
        <h1 className="typing-heading">
          <Typewriter
            words={[
              "Welcome to Zealthy!",
              "We help you stay healthy!",
              "Let's get started..."
            ]}
            loop={true}      // or false if you want it to type once
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </h1>
        <p className="welcome-subtitle">
          
          Healthcare done your way. High-quality virtual care including primary care, mental health, metabolic health, and more. Get personalized care from anywhere with or without insurance.
        </p>
      </div>

      {/* Right side: The Onboarding Wizard */}
      <div className="wizard-section">
        <OnboardingWizard />
      </div>
    </div>
  );
};

export default OnboardingPage;
