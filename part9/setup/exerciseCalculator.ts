interface Argss {
  target: number;
  hours: Array<number>;
}

const parseArgs = (args: Array<string>): Argss => {
  if (args.length < 4) throw new Error("Not enough arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      target: Number(args[2]),
      hours: args.slice(3).map((a) => Number(a)),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (hours: Array<number>, target: number): Result => {
  const periodLength = hours.length;
  let trainingDays = 0;
  hours.forEach((h) => {
    if (h !== 0) trainingDays++;
  });
  const average = hours.reduce((a, b) => a + b, 0) / periodLength;
  const success: boolean = average >= target ? true : false;
  let rating: number = NaN;
  let ratingDescription: string = "not geting";
  if (average >= 2) {
    rating = 3;
    ratingDescription = "Very Good, you achieved your goal";
  } else if (average >= 1) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else if (average >= 0) {
    rating = 1;
    ratingDescription = "Very bad, improve";
  }
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { target, hours } = parseArgs(process.argv);
  console.log(calculateExercises(hours, target));
} catch (e) {
  console.log("Error, something bad happened, message: ", e.message);
}

export default calculateExercises;
