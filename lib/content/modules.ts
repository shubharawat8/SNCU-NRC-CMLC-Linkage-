/**
 * Care-level "modules" of the pathway. Each module aggregates what the
 * guideline says about one level/team so it can be read on its own page.
 * `guidance` comes from the guideline; `practiceNotes` are supplementary
 * (shown with a "Supplementary" badge in the UI).
 */
import type { IconName } from "@/components/ui/icon";

export type Tone = "sncu" | "stepdown" | "clmc" | "counsellor" | "followup" | "nrc" | "community";

export type CareModule = {
  slug: string;
  name: string;
  fullName: string;
  icon: IconName;
  tone: Tone;
  oneLiner: string;
  role: string;
  guidance: string[];
  receivesFrom: string[];
  sendsTo: string[];
  monitors: string[];
  records: string[];
  sections: number[];
  practiceNotes: string[];
};

export const careModules: CareModule[] = [
  {
    slug: "sncu",
    name: "SNCU",
    fullName: "Special Newborn Care Unit",
    icon: "hospital",
    tone: "sncu",
    oneLiner: "Medical stabilisation plus a feeding assessment before every discharge.",
    role: "Identify feeding difficulty; assess readiness for discharge; provide breastfeeding support; prepare feeding plan; document follow-up; refer appropriately.",
    guidance: [
      "Assess and document clinical stability, breastfeeding status/effectiveness, need for counselling or assisted feeding, weight and growth, need for thermal/transition care, follow-up date/place and community linkage before discharge.",
      "Every SNCU graduate with feeding difficulty should leave with a documented feeding plan and a defined next point of care.",
      "Communicate the infant's discharge and follow-up plan to the community health team (discharge-to-community handover).",
      "Breastfeeding not yet established, by itself, is not an automatic indication for NRC referral.",
    ],
    receivesFrom: ["Sick and small newborns admitted for care"],
    sendsTo: ["SNCU Follow-up", "Step-down Unit", "CLMC / Breastfeeding Counsellor", "Community (ASHA · ANM · AWW)"],
    monitors: [
      "SNCU graduates assessed for breastfeeding before discharge",
      "Infants identified with breastfeeding/feeding difficulty",
      "Infants referred to Step-down Unit",
      "Infants linked to CLMC/Breastfeeding Counsellor",
    ],
    records: ["SNCU discharge and feeding assessment record", "Individualized feeding plan for infants with feeding difficulty"],
    sections: [5, 6, 11, 13],
    practiceNotes: [
      "Use the MEDICAL · FEED · GROW · TRANSITION · FOLLOW-UP checklist as the last item on the discharge round.",
      "Name a single responsible person for post-SNCU coordination so handovers do not depend on shift timing.",
    ],
  },
  {
    slug: "step-down",
    name: "Step-down Unit",
    fullName: "Step-down Ward / Unit",
    icon: "thermometer",
    tone: "stepdown",
    oneLiner: "Transition care for stable infants not yet ready for complete discharge — not another SNCU.",
    role: "Temperature maintenance; transition care; feeding establishment; feeding support; coordinate with CLMC/Breastfeeding Counsellor.",
    guidance: [
      "Continued temperature maintenance.",
      "Feeding establishment and breastfeeding support.",
      "Assisted feeding as clinically indicated.",
      "Observation during transition from SNCU care to home.",
      "Defined linkage with SNCU, CLMC, Breastfeeding/Lactation Counsellor, SNCU Follow-up Services and the Community Health Team.",
    ],
    receivesFrom: ["SNCU (clinically appropriate infants with feeding/thermal needs)"],
    sendsTo: ["CLMC / Breastfeeding Counsellor", "Home + follow-up", "NRC / appropriate facility (if criteria met)"],
    monitors: [
      "Infants received from SNCU",
      "Infants receiving breastfeeding counselling",
      "Infants linked with CLMC",
      "Infants successfully establishing breastfeeding",
      "Infants discharged to home",
      "Infants requiring further referral",
    ],
    records: ["Step-down referral/transfer record, where applicable"],
    sections: [3, 7, 8, 11, 13],
    practiceNotes: [
      "Keep the mother with the baby: the unit exists to build her confidence in feeding and keeping the baby warm before going home.",
      "Kangaroo Mother Care is the standard method for thermal care of stable small babies and fits naturally here.",
    ],
  },
  {
    slug: "clmc",
    name: "CLMC",
    fullName: "Comprehensive Lactation Management Centre",
    icon: "milk",
    tone: "clmc",
    oneLiner: "Specialised lactation support, mother's own milk and donor human milk as per approved protocols.",
    role: "Lactation support; breastfeeding counselling; support for mother's own milk and donor human milk as per approved protocols.",
    guidance: [
      "Step-down Unit = transition/continued care. CLMC/Breastfeeding Counsellor = specialised breastfeeding support. These services can work together; one does not replace the other.",
      "Step-down team informs/designates CLMC or Breastfeeding Counsellor once an infant with feeding difficulty is shifted.",
      "Daily or defined follow-up continues until breastfeeding is established or further referral is required.",
    ],
    receivesFrom: ["SNCU", "Step-down Unit"],
    sendsTo: ["Step-down Unit", "SNCU Follow-up", "Home + follow-up"],
    monitors: ["Infants linked with CLMC", "Infants successfully establishing breastfeeding"],
    records: ["Breastfeeding Counsellor/CLMC assessment and follow-up record"],
    sections: [8, 11],
    practiceNotes: [
      "Mother's own milk comes first; donor human milk is used only as per the approved protocol.",
    ],
  },
  {
    slug: "breastfeeding-counsellor",
    name: "Lactation Counsellor",
    fullName: "Breastfeeding / Lactation Counsellor",
    icon: "heartHandshake",
    tone: "counsellor",
    oneLiner: "Hands-on breastfeeding support at SNCU, Step-down and follow-up — and the monthly data compiler.",
    role: "Individual counselling; observation of breastfeeding; positioning/attachment support; milk expression support; documentation and follow-up.",
    guidance: [
      "At SNCU: identify difficulties, observe breastfeeding, counsel the mother, demonstrate positioning and attachment, support expression, prepare an individualized feeding plan, link to Step-down/CLMC when indicated.",
      "At Step-down: repeated assessment, hands-on counselling, support expressed mother's own milk feeding as appropriate, coordinate with CLMC, document progress.",
      "At SNCU Follow-up: support infants with breastfeeding difficulty, poor weight gain, early growth faltering or recurrent feeding problems; coordinate reassessment and referral.",
      "Compile and share the monthly data set through the designated district/state reporting mechanism.",
    ],
    receivesFrom: ["SNCU", "Step-down Unit", "SNCU Follow-up"],
    sendsTo: ["CLMC", "Step-down Unit", "Medical Officer / Paediatrician (for referral decisions)"],
    monitors: ["All 16 monthly data points (Section 13.1)"],
    records: ["Breastfeeding Counsellor/CLMC assessment and follow-up record"],
    sections: [8, 9, 11, 13],
    practiceNotes: [
      "Assess the eight feeding areas every time: positioning, attachment, suckling, frequency, milk expression, breast/nipple problems, milk transfer, need for assisted feeding.",
      "The monthly report complements — and should not duplicate — routine government reporting.",
    ],
  },
  {
    slug: "sncu-follow-up",
    name: "SNCU Follow-up",
    fullName: "SNCU Follow-up Services (with MO / Paediatrician)",
    icon: "calendarCheck",
    tone: "followup",
    oneLiner: "Checks feeding, weight gain and illness, and spots infants who need more help.",
    role: "Assess feeding, weight gain and illness; identify infants requiring further intervention. Medical Officer/Paediatrician makes the clinical assessment and decision regarding referral/escalation.",
    guidance: [
      "Consider referral for: feeding difficulty with poor weight gain; SAM; persistent feeding problem despite breastfeeding support.",
      "Assessment by ANM/Medical Officer/Paediatrician, as applicable, then nutritional and clinical assessment before any NRC referral.",
    ],
    receivesFrom: ["SNCU graduates", "Community (ASHA · ANM · AWW)"],
    sendsTo: ["NRC / appropriate facility (if criteria met)", "Breastfeeding Counsellor", "Community follow-up"],
    monitors: [
      "SNCU graduates attending follow-up",
      "Infants assessed for feeding",
      "Infants with poor/no weight gain",
      "Infants with feeding difficulty",
      "Infants identified with SAM",
      "Infants referred to NRC",
      "Infants completing referral",
    ],
    records: ["SNCU follow-up record"],
    sections: [10, 11, 13],
    practiceNotes: [
      "Plot weight at every visit — a flat line is the earliest signal of growth faltering.",
    ],
  },
  {
    slug: "nrc",
    name: "NRC",
    fullName: "Nutrition Rehabilitation Centre",
    icon: "salad",
    tone: "nrc",
    oneLiner: "Manages eligible children with SAM or nutritional complications — when admission criteria are met.",
    role: "Management of eligible children with SAM/nutritional complications as per protocol, including breastfeeding/nutrition support.",
    guidance: [
      "NRC referral should follow applicable nutritional and clinical admission criteria.",
      "For children with SAM, NRC admission and management should follow applicable state/NHM criteria and protocols.",
      "Every referral should have a clear counter-referral and community follow-up plan.",
    ],
    receivesFrom: ["SNCU Follow-up", "Step-down Unit"],
    sendsTo: ["Counter-referral to community (ASHA · ANM · AWW)"],
    monitors: [
      "SNCU follow-up → NRC referrals",
      "Step-down → NRC referrals",
      "Successful completion of referral",
      "Counter-referral to community",
      "Follow-up after NRC discharge",
    ],
    records: ["NRC referral and counter-referral record"],
    sections: [3, 4, 10, 11, 13],
    practiceNotes: [
      "A counter-referral slip that reaches the ASHA/AWW is what closes the loop — track it as carefully as the referral itself.",
    ],
  },
  {
    slug: "community",
    name: "Community Team",
    fullName: "ASHA · ANM · AWW (with CHO)",
    icon: "users",
    tone: "community",
    oneLiner: "FEED · GROW · CHECK · REFER & FOLLOW-UP at home, after every discharge.",
    role: "ANM: clinical/nutritional assessment, follow-up, coordination and referral. ASHA: home follow-up, early identification, breastfeeding support, mobilisation and linkage. AWW: growth monitoring, tracking, counselling and coordination with ASHA/ANM.",
    guidance: [
      "FEED — breastfeeding/feeding status, feeding difficulty, positioning and attachment, frequency and mother's need for support.",
      "GROW — weight/growth monitoring and identification of poor/no weight gain or early growth faltering.",
      "CHECK — illness, danger signs and other concerns requiring clinical assessment.",
      "REFER & FOLLOW-UP — timely linkage to ANM/CHO/Medical Officer or appropriate facility, referral completion and follow-up after return.",
      "Frequency of home visits and clinical follow-up should follow applicable state/national programme guidance.",
    ],
    receivesFrom: ["SNCU discharge handover", "Step-down discharge", "NRC counter-referral"],
    sendsTo: ["ANM / CHO / Medical Officer", "SNCU Follow-up", "Appropriate facility"],
    monitors: ["Community linkage — infants linked back to ASHA/ANM/AWW", "Follow-up after NRC discharge"],
    records: ["Community follow-up record for ASHA/ANM/AWW"],
    sections: [5, 11, 12],
    practiceNotes: [
      "Health–ICDS convergence: the ASHA (health) and AWW (ICDS) should share one list of SNCU graduates in their village.",
      "Use existing platforms — HBNC/HBYC home visits, VHSND and growth monitoring — rather than creating a parallel visit schedule.",
    ],
  },
];

export const getModule = (slug: string) => careModules.find((m) => m.slug === slug);
