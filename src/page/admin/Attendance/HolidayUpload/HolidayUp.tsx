import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import HolidayUpload from "./HolidayUpload";
import HolidayReview from "./HolidayReview";
import HolidayFinalSubmit from "./HolidayFinalSubmit";

const steps = ["Upload Excel File", "Reveiw", "Submit"];

const HolidayUp = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [data, setData] = React.useState<any>([]);

  const handleNext = () => {
    if (activeStep !== 2) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getData = (value: any) => {
    setData(value);
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <HolidayUpload
            data={data}
            setData={getData}
            handleNext={handleNext}
          />
        );
      case 1:
        return (
          <HolidayReview
            data={data}
            setData={getData}
            handleBack={handleBack}
            handleNext={handleNext}
          />
        );
      case 2:
        return (
          <HolidayFinalSubmit
            data={data}
            setData={getData}
            handleBack={handleBack}
          />
        );

      default:
        return "Unknown step";
    }
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};

          return (
            <Step key={index} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      <React.Fragment>{getStepContent(activeStep)}</React.Fragment>
    </Box>
  );
};

export default HolidayUp;
