// rules
// cannot go below step 1
// go up and down by the instructed amount

const FIRST_STEP = 1;

const getMinStartingSteps = (movements: number[]) => {
  // calculate the min starting step
  let currentStep = FIRST_STEP;
  let minStartingStep = FIRST_STEP;
  movements.forEach((movement) => {
    currentStep = currentStep + movement;
    if(currentStep < FIRST_STEP) {
      const illegalMovement = currentStep - FIRST_STEP;
      const newMinStartingStep =  FIRST_STEP + (illegalMovement * -1);
      if(newMinStartingStep > minStartingStep) {
        minStartingStep = newMinStartingStep;
      }
    }
  });

  return minStartingStep;
}
export default getMinStartingSteps;
