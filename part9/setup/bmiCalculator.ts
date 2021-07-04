interface MultiplyValues {
  height: number;
  weight: number;
}

const parseArguments = (args: Array<string>): MultiplyValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const calculateBmi = (height: number, weight: number): string => {
  const heightInMeter = height / 100;
  const bmi = weight / (heightInMeter * heightInMeter);
  if (bmi >= 18 && bmi <= 25) {
    return "Normal (healthy weight)";
  } else if (bmi < 18) {
    return "Under weight";
  } else if (bmi > 25) {
    return "Over weight";
  }
  return "Ops..";
};

try {
  const { height, weight } = parseArguments(process.argv);
  calculateBmi(height, weight);
} catch (e) {
  console.log("Error, something bad happened, message: ", e.message);
}

export default calculateBmi;
