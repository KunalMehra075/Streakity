export default function calculateCompletionPercentage(userData) {
  const schema = [
    "whiz_code",
    "email",
    "first_name",
    "last_name",
    "phone_number",
    "email_verification",
    "DOB",
    "medium",
    "working_status",
    "primary_subject",
    "years_of_experience",
    "highest_qualification",
    "resume_link",
    "profile_photo",
    "linkedin",
    "other_social",
    "start_date",
    "gender",
    "mode_of_work",
  ];
  const address = [
    "address1",
    "city",
    "district",
    "pincode",
    "state",
    "country",
  ];

  let completed = 0;
  let totalFields = schema.length + address.length;
  for (let field of schema) {
    if (userData[field]) completed++;
  }
  for (let field of address) {
    if (userData?.address[field]) completed++;
  }
  const completionPercentage = (completed / totalFields) * 100;
  return completionPercentage;
}
