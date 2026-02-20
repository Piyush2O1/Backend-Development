function validateYear(req, res, next) {

  const { year } = req.query;

  // if year is not provided, skip validation
  if (!year) {
    return next();
  }

  const yearNumber = Number(year);

  // check if number
  if (isNaN(yearNumber)) {
    return res.status(400).json({ message: "Year must be a valid number" });
  }

  const currentYear = new Date().getFullYear();

  // check range
  if (yearNumber < 1900 || yearNumber > currentYear) {
    return res.status(400).json({
      message: `Year must be between 1900 and ${currentYear}`
    });
  }

  next(); // go to next function
}