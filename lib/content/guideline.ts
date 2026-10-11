/**
 * Source of truth for guideline content.
 * Transcribed from: docs/source/SNCU_CLMC_NRC_Linkage_Guideline_29_Sep_2026.docx
 * ("State Guidelines for Post-SNCU Discharge Follow-up, Breastfeeding Support
 *  & Referral of Newborns and Young Infants" — Draft for Review).
 *
 * Keep wording faithful to the source. Anything added for context
 * (glossary, programme convergence, FAQs) lives in ./enrichment.ts and is
 * labelled as supplementary in the UI.
 */

export const guidelineMeta = {
  title: "State Guidelines for Post-SNCU Discharge Follow-up, Breastfeeding Support & Referral of Newborns and Young Infants",
  shortTitle: "Post-SNCU Linkage Guideline",
  subtitle: "A Structured Pathway Linking SNCU, Step-down Care, CLMC and NRC",
  status: "Draft for Review",
  version: "29 Sep 2026",
  state: "Uttar Pradesh",
  tagline: "One Baby — One Continuum of Care",
} as const;

export const background = {
  paragraphs: [
    "SNCUs provide care to sick and small newborns until they are clinically stable. However, some infants may be medically stable for discharge while breastfeeding is not yet established, the infant is unable to breastfeed effectively, or continued support for feeding and thermal care is required.",
    "A structured post-SNCU pathway is therefore required to ensure that medical discharge is linked with a clear feeding, growth and follow-up plan. The pathway connects facility-based newborn care with Step-down care, CLMC/Breastfeeding Counselling, NRC where clinically indicated, and community follow-up.",
  ],
  needs: [
    "Establishment of breastfeeding",
    "Feeding assistance",
    "Temperature maintenance or transition care",
    "Breastfeeding counselling and hands-on support",
    "Weight monitoring",
    "Early growth faltering or poor weight gain",
    "Management of SAM, where applicable",
  ],
};

export const objectives = [
  "Identify breastfeeding and feeding difficulties before SNCU discharge.",
  "Provide continued breastfeeding and feeding support after medical stabilization.",
  "Link eligible infants to Step-down Unit, CLMC or NRC, as appropriate.",
  "Utilize trained Breastfeeding/Lactation Counsellors for intensive breastfeeding support.",
  "Ensure follow-up of SNCU graduates through designated SNCU follow-up services.",
  "Establish referral and counter-referral between SNCU, Step-down Unit, CLMC and NRC.",
];

export type EligibilityGroup = {
  id: "A" | "B" | "C";
  title: string;
  summary: string;
  criteria: string[];
  note?: string;
  nextCare: string;
};

export const eligibilityGroups: EligibilityGroup[] = [
  {
    id: "A",
    title: "Medically stable but breastfeeding not established",
    summary: "Clinically ready to leave SNCU, but feeding is not yet secure.",
    criteria: [
      "Mother has not established breastfeeding.",
      "Infant is unable to breastfeed effectively or has weak/ineffective suck.",
      "Mother requires intensive breastfeeding support.",
      "Infant requires assisted feeding as clinically indicated.",
      "Mother requires support with expression of breast milk.",
    ],
    nextCare: "Breastfeeding/Lactation Counsellor + CLMC",
  },
  {
    id: "B",
    title: "Infant requiring continued thermal/transition care",
    summary: "Medically stable, still needs help maintaining body temperature.",
    criteria: [
      "An infant who is medically stable but requires continued support to maintain body temperature or transition from SNCU care to independent thermal stability may be shifted to the designated Step-down Ward/Unit, where available.",
    ],
    nextCare: "Step-down Ward/Unit (where available)",
  },
  {
    id: "C",
    title: "Infant requiring nutritional rehabilitation or further assessment",
    summary: "Feeding or growth problems persist despite support.",
    criteria: [
      "Persistent feeding difficulty identified during SNCU discharge or follow-up.",
      "Poor/no weight gain.",
      "SAM identified during follow-up.",
      "Persistent feeding problem despite breastfeeding support.",
    ],
    note: "Such infants should undergo clinical and nutritional assessment and be referred to NRC or another appropriate facility/service only when applicable admission or referral criteria are met.",
    nextCare: "Clinical + nutritional assessment → NRC / appropriate facility, if criteria are met",
  },
];

export const keyPrinciples = [
  "Medical stabilization and feeding readiness should together inform the next level of care.",
  "Breastfeeding not yet established, by itself, should not automatically result in NRC referral.",
  "NRC referral should follow applicable nutritional and clinical admission criteria.",
  "Step-down care should function as transition care, not as another SNCU.",
  "Every SNCU graduate with feeding difficulty should leave with a documented feeding plan and a defined next point of care.",
  "Every referral should have a clear counter-referral and community follow-up plan.",
];

export const importantNotice =
  "Breastfeeding not yet established, by itself, is not an automatic indication for NRC referral. NRC referral should follow applicable nutritional and clinical admission criteria.";

export type PathwayTrack = {
  id: 1 | 2 | 3;
  label: string;
  tone: "sncu" | "clmc" | "nrc";
  steps: { text: string; module?: string }[];
};

export const pathwayEntry = {
  title: "SNCU",
  detail: "Medical stabilisation + feeding assessment",
  question: "Is the infant ready for complete discharge?",
};

export const pathwayTracks: PathwayTrack[] = [
  {
    id: 1,
    label: "Feeding adequate",
    tone: "sncu",
    steps: [
      { text: "SNCU discharge", module: "sncu" },
      { text: "SNCU follow-up", module: "sncu-follow-up" },
      { text: "ASHA + ANM + AWW community follow-up", module: "community" },
    ],
  },
  {
    id: 2,
    label: "Feeding / transition support needed",
    tone: "clmc",
    steps: [
      { text: "Breastfeeding/Lactation Counsellor + CLMC", module: "clmc" },
      { text: "If temperature/transition care is needed → Step-down Unit", module: "step-down" },
      { text: "Feeding support + reassessment", module: "breastfeeding-counsellor" },
      { text: "Breastfeeding established" },
      { text: "Discharge + follow-up", module: "community" },
    ],
  },
  {
    id: 3,
    label: "Persistent feeding difficulty / poor growth / SAM",
    tone: "nrc",
    steps: [
      { text: "Clinical + nutritional assessment", module: "sncu-follow-up" },
      { text: "NRC / appropriate facility, if criteria are met", module: "nrc" },
      { text: "Treatment + breastfeeding/nutrition support", module: "nrc" },
      { text: "Discharge + counter-referral" },
      { text: "ASHA + ANM + AWW follow-up", module: "community" },
    ],
  },
];

export const continuumStatement =
  "The infant moves between levels of care according to need, with referral, counter-referral and community follow-up continuing across the pathway.";

export const handover =
  "Before discharge, the SNCU should communicate the infant's discharge and follow-up plan to the appropriate community health team and document the next point of care. The handover should support continuity between facility and community services.";

export type AssessmentDomain = {
  key: "MEDICAL" | "FEED" | "GROW" | "TRANSITION" | "FOLLOW-UP";
  check: string;
};

export const dischargeAssessment: AssessmentDomain[] = [
  { key: "MEDICAL", check: "Clinical stability as per applicable protocol." },
  { key: "FEED", check: "Breastfeeding status/effectiveness; feeding difficulty; need for counselling or assisted feeding." },
  { key: "GROW", check: "Weight and relevant growth information." },
  { key: "TRANSITION", check: "Need for continued thermal/transition care and Step-down/CLMC/Breastfeeding Counsellor linkage." },
  { key: "FOLLOW-UP", check: "Follow-up date/place, feeding plan and community linkage." },
];

export const dischargeDocumentation = [
  "Medical/clinical stability as per applicable protocol.",
  "Breastfeeding status and effectiveness of feeding.",
  "Need for breastfeeding counselling or hands-on support.",
  "Need for assisted feeding, where clinically indicated.",
  "Weight and relevant growth information.",
  "Need for continued thermal/transition care.",
  "Need for Step-down, CLMC/Breastfeeding Counsellor or other referral.",
  "Follow-up date and place.",
  "Community linkage for continued follow-up.",
];

export const stepDown = {
  definition:
    "A transition-care facility for clinically stable infants who are not yet ready for complete discharge and require continued support for temperature maintenance, feeding establishment or supervised transition to home. It should function as transition care, not as another SNCU.",
  functions: [
    "Continued temperature maintenance.",
    "Feeding establishment.",
    "Breastfeeding support.",
    "Assisted feeding as clinically indicated.",
    "Observation during transition from SNCU care to home.",
  ],
  linkages: ["SNCU", "CLMC", "Breastfeeding/Lactation Counsellor", "SNCU Follow-up Services", "Community Health Team"],
};

export const linkageClarity = {
  stepDown: "Step-down Unit = transition/continued care.",
  clmc: "CLMC/Breastfeeding Counsellor = specialised breastfeeding support.",
  together: "These services can work together; one does not replace the other.",
};

export const clmcStepDownSteps = [
  "SNCU identifies feeding difficulty.",
  "Infant is shifted to Step-down Unit, if clinically appropriate.",
  "Step-down team informs/designates CLMC or Breastfeeding Counsellor.",
  "Breastfeeding Counsellor conducts feeding assessment: positioning, attachment, suckling, feeding frequency, milk expression, breast/nipple problems, milk transfer and need for assisted feeding.",
  "Individualized breastfeeding support is provided.",
  "Daily or defined follow-up continues until breastfeeding is established or further referral is required.",
];

export const feedingAssessmentAreas = [
  "Positioning",
  "Attachment",
  "Suckling",
  "Feeding frequency",
  "Milk expression",
  "Breast/nipple problems",
  "Milk transfer",
  "Need for assisted feeding",
];

export const counsellorByPointOfCare = [
  {
    point: "At SNCU",
    responsibilities: [
      "Identify breastfeeding difficulties",
      "Observe breastfeeding",
      "Counsel mother",
      "Demonstrate positioning and attachment",
      "Support breast milk expression where required",
      "Prepare individualized feeding plan",
      "Link to Step-down/CLMC when indicated",
    ],
  },
  {
    point: "At Step-down Unit",
    responsibilities: [
      "Repeated breastfeeding assessment",
      "Hands-on counselling",
      "Support establishment of breastfeeding",
      "Support expressed mother's own milk feeding as appropriate",
      "Coordinate with CLMC",
      "Document progress",
    ],
  },
  {
    point: "At SNCU Follow-up",
    responsibilities: [
      "Support infants presenting with breastfeeding difficulty, poor weight gain, early growth faltering or recurrent feeding problems",
      "Coordinate reassessment and referral when required",
    ],
  },
];

export const followUpReferralTriggers = [
  "Feeding difficulty with poor weight gain.",
  "SAM",
  "Persistent feeding problem despite breastfeeding support.",
];

export const followUpToNrcPathway = [
  "SNCU Follow-up",
  "Assessment by ANM/Medical Officer/Paediatrician, as applicable",
  "Nutritional and clinical assessment",
  "NRC referral if admission criteria are met",
  "NRC management",
  "Breastfeeding support",
  "Discharge",
  "Counter-referral",
  "ASHA + ANM + AWW follow-up",
];

export const samNote =
  "For children with SAM, NRC admission and management should follow applicable state/NHM criteria and protocols.";

export const rolesAndResponsibilities = [
  { team: "SNCU", module: "sncu", text: "Identify feeding difficulty; assess readiness for discharge; provide breastfeeding support; prepare feeding plan; document follow-up; refer appropriately." },
  { team: "Step-down Unit", module: "step-down", text: "Temperature maintenance; transition care; feeding establishment; feeding support; coordinate with CLMC/Breastfeeding Counsellor." },
  { team: "CLMC", module: "clmc", text: "Lactation support; breastfeeding counselling; support for mother's own milk and donor human milk as per approved protocols." },
  { team: "Breastfeeding/Lactation Counsellor", module: "breastfeeding-counsellor", text: "Individual counselling; observation of breastfeeding; positioning/attachment support; milk expression support; documentation and follow-up." },
  { team: "SNCU Follow-up", module: "sncu-follow-up", text: "Assess feeding, weight gain and illness; identify infants requiring further intervention." },
  { team: "Medical Officer/Paediatrician", module: "sncu-follow-up", text: "Clinical assessment and decision regarding referral/escalation." },
  { team: "NRC", module: "nrc", text: "Management of eligible children with SAM/nutritional complications as per protocol, including breastfeeding/nutrition support." },
  { team: "ANM", module: "community", text: "Clinical/nutritional assessment, follow-up, coordination and referral." },
  { team: "ASHA", module: "community", text: "Home follow-up, early identification, breastfeeding support as appropriate, mobilisation and linkage." },
  { team: "AWW", module: "community", text: "Growth monitoring, tracking, counselling and coordination with ASHA/ANM." },
];

export const communityFocus = [
  { area: "FEED", text: "Breastfeeding/feeding status, feeding difficulty, positioning and attachment, frequency and mother's need for support." },
  { area: "GROW", text: "Weight/growth monitoring and identification of poor/no weight gain or early growth faltering." },
  { area: "CHECK", text: "Illness, danger signs and other concerns requiring clinical assessment." },
  { area: "REFER & FOLLOW-UP", text: "Timely linkage to ANM/CHO/Medical Officer or appropriate facility, referral completion and follow-up after return." },
];

export const communityNote =
  "ASHA, ANM and AWW should coordinate for infants requiring enhanced follow-up. The specific frequency of home visits and clinical follow-up should follow applicable state/national programme guidance.";

export const monitoringSets = [
  {
    id: "sncu-discharge",
    title: "SNCU Discharge Monitoring",
    items: [
      "SNCU graduates assessed for breastfeeding before discharge.",
      "Infants identified with breastfeeding/feeding difficulty.",
      "Infants referred to Step-down Unit.",
      "Infants linked to CLMC/Breastfeeding Counsellor.",
    ],
  },
  {
    id: "step-down",
    title: "Step-down Monitoring",
    items: [
      "Infants received from SNCU.",
      "Infants receiving breastfeeding counselling.",
      "Infants linked with CLMC.",
      "Infants successfully establishing breastfeeding.",
      "Infants discharged to home.",
      "Infants requiring further referral.",
    ],
  },
  {
    id: "follow-up",
    title: "SNCU Follow-up Monitoring",
    items: [
      "SNCU graduates attending follow-up.",
      "Infants assessed for feeding.",
      "Infants with poor/no weight gain.",
      "Infants with feeding difficulty.",
      "Infants identified with SAM.",
      "Infants referred to NRC.",
      "Infants completing referral.",
    ],
  },
  {
    id: "nrc",
    title: "NRC Linkage Monitoring",
    items: [
      "SNCU follow-up → NRC referrals.",
      "Step-down → NRC referrals.",
      "Successful completion of referral.",
      "Counter-referral to community.",
      "Follow-up after NRC discharge.",
    ],
  },
];

export const reportingNote =
  "The designated Breastfeeding/Lactation Counsellor at the Medical College/SNCU should compile and share the above information through the designated district/state reporting mechanism monthly. This reporting should complement, and not duplicate, routine government reporting systems.";

export const minimumDocumentation = [
  "SNCU discharge and feeding assessment record.",
  "Individualized feeding plan for infants with feeding difficulty.",
  "Step-down referral/transfer record, where applicable.",
  "Breastfeeding Counsellor/CLMC assessment and follow-up record.",
  "SNCU follow-up record.",
  "NRC referral and counter-referral record.",
  "Community follow-up record for ASHA/ANM/AWW.",
];

export const implementation = [
  "Each designated facility should identify the responsible person for coordinating post-SNCU follow-up.",
  "The SNCU should ensure that infants requiring continued feeding support have a documented next point of care before discharge.",
  "Medical College/SNCU, Step-down Unit, CLMC, NRC and district health teams should establish a clear communication and referral mechanism.",
  "District teams should periodically review referral completion, counter-referral and community follow-up.",
  "State-specific clinical admission and referral criteria should be aligned with the latest approved Government of India and Uttar Pradesh protocols.",
];

/** Table of contents mirroring the 15 numbered sections of the source. */
export const sections = [
  { n: 1, id: "background", title: "Background" },
  { n: 2, id: "objectives", title: "Objectives" },
  { n: 3, id: "eligibility", title: "Infants to be Considered for the Pathway" },
  { n: 4, id: "principles", title: "Key Principles" },
  { n: 5, id: "continuum", title: "Post-SNCU Continuum of Care and Referral Pathway" },
  { n: 6, id: "assessment", title: "Assessment Before SNCU Discharge" },
  { n: 7, id: "step-down", title: "Role of Step-down Ward/Unit" },
  { n: 8, id: "clmc-linkage", title: "Linkage of CLMC with Step-down Unit" },
  { n: 9, id: "counsellor", title: "Role of Breastfeeding/Lactation Counsellor" },
  { n: 10, id: "follow-up-nrc", title: "SNCU Follow-up to NRC / Appropriate Referral Pathway" },
  { n: 11, id: "roles", title: "Roles and Responsibilities" },
  { n: 12, id: "community", title: "Community Follow-up After SNCU Discharge" },
  { n: 13, id: "monitoring", title: "Data Reporting and Monitoring" },
  { n: 14, id: "documentation", title: "Minimum Documentation / Tools" },
  { n: 15, id: "implementation", title: "Implementation and Coordination" },
] as const;
