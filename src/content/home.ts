// Homepage selections only. Full service and gallery data belong to Milestone 2.
export const signatureServices = [
  { name: "Knotless Braids", category: "Protective styling" },
  { name: "Wash & Define", category: "Natural-hair care" },
  { name: "Loc Retwist", category: "Styling & maintenance" },
] as const;

export const approachSteps = [
  { title: "Understand", description: "Your texture, your routine, and how you want to feel." },
  { title: "Care", description: "Care comes before the finished look." },
  { title: "Create", description: "Considered styling for your next chapter." },
] as const;

export const homeFaqs = [
  {
    question: "Is ORÍ Studio a real salon?",
    answer: "ORÍ Studio is a fictional, self-initiated portfolio concept for a premium natural-hair salon in Lagos. It is not an operating business.",
  },
  {
    question: "Can I make a real appointment?",
    answer: "No real appointments are accepted. The appointment experience is a non-submitting demo: times are preferences, not confirmed availability. No appointment will be submitted.",
  },
  {
    question: "Are the people and interiors real?",
    answer: "The imagery is AI-generated for this fictional concept. The people and interiors do not represent real customers, staff or salon premises, and the styles are not presented as work by ORÍ Studio.",
  },
  {
    question: "Will the demo collect my contact details?",
    answer: "No. The booking preview does not collect names, email addresses, phone numbers or other personal data.",
  },
] as const;
