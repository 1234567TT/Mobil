import data from '../assets/data/app.json';

export const getReferenceRange = (ageInMonths, hormoneType) => {
    const ranges = data[hormoneType];
    if (!ranges) return null;

    return ranges.find(range => 
        (range.min_age_months <= ageInMonths) &&
        (range.max_age_month === null || range.max_age_month >= ageInMonths)
    );
};
