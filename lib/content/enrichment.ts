/**
 * Supplementary context — NOT part of the guideline text.
 * Added to help district/state nutrition and health teams (NHM + ICDS)
 * place the pathway among programmes they already run.
 * The UI always labels these blocks "Supplementary".
 */
import type { IconName } from "@/components/ui/icon";

export const glossary = [
  { term: "SNCU", meaning: "Special Newborn Care Unit — facility unit providing care to sick and small newborns." },
  { term: "Step-down Unit", meaning: "Ward/unit for transition care of clinically stable infants not yet ready for complete discharge." },
  { term: "CLMC", meaning: "Comprehensive Lactation Management Centre — lactation support, mother's own milk and donor human milk services." },
  { term: "NRC", meaning: "Nutrition Rehabilitation Centre — facility-based management of children with SAM and nutritional complications." },
  { term: "SAM", meaning: "Severe Acute Malnutrition." },
  { term: "SNCU graduate", meaning: "An infant discharged from SNCU." },
  { term: "Counter-referral", meaning: "Information sent back from the receiving facility to the referring team/community after care is completed." },
  { term: "KMC", meaning: "Kangaroo Mother Care — skin-to-skin contact and exclusive breastfeeding for small babies." },
  { term: "ASHA", meaning: "Accredited Social Health Activist — village-level community health worker (Health)." },
  { term: "ANM", meaning: "Auxiliary Nurse Midwife." },
  { term: "AWW", meaning: "Anganwadi Worker — frontline worker of ICDS (Women & Child Development)." },
  { term: "CHO", meaning: "Community Health Officer at the Ayushman Arogya Mandir (sub-centre level)." },
  { term: "MO", meaning: "Medical Officer." },
  { term: "HBNC / HBYC", meaning: "Home Based Newborn Care / Home Based Care for Young Child — ASHA home-visit programmes." },
  { term: "VHSND", meaning: "Village Health, Sanitation and Nutrition Day." },
  { term: "MCP Card", meaning: "Mother and Child Protection Card — shared by Health and ICDS." },
];

export const convergence: { name: string; icon: IconName; owner: string; how: string }[] = [
  { name: "HBNC / HBYC home visits", icon: "home", owner: "Health · ASHA", how: "Carry the SNCU graduate's feeding plan into the scheduled home visits instead of adding a separate visit schedule." },
  { name: "Growth monitoring & Poshan Tracker", icon: "lineChart", owner: "ICDS · AWW", how: "Weight entries at the Anganwadi flag poor/no weight gain early — the GROW check of community follow-up." },
  { name: "MAA programme", icon: "baby", owner: "Health", how: "Mothers' Absolute Affection breastfeeding promotion gives ASHAs and counsellors a shared message set." },
  { name: "VHSND", icon: "calendarDays", owner: "Health + ICDS", how: "A monthly meeting point where ANM, ASHA and AWW can review the list of SNCU graduates together." },
  { name: "MCP Card", icon: "idCard", owner: "Health + ICDS", how: "Record discharge weight, feeding plan and next point of care where every frontline worker will see it." },
  { name: "District review", icon: "clipboardCheck", owner: "District Health & ICDS", how: "Review referral completion, counter-referral and community follow-up periodically, as the guideline asks." },
];

export const faqs = [
  {
    q: "A baby is clinically stable but breastfeeding isn't established. Should we refer to NRC?",
    a: "Not on that basis alone. The guideline is explicit: breastfeeding not yet established is not an automatic indication for NRC referral. Link the mother–baby pair to the Breastfeeding/Lactation Counsellor and CLMC, and to the Step-down Unit if thermal/transition care is also needed.",
  },
  {
    q: "What is the difference between the Step-down Unit and CLMC?",
    a: "Step-down = transition/continued care (temperature, feeding establishment, observation). CLMC/Breastfeeding Counsellor = specialised breastfeeding support. They work together; one does not replace the other.",
  },
  {
    q: "When does an infant in follow-up go to NRC?",
    a: "When there is feeding difficulty with poor weight gain, SAM, or a persistent feeding problem despite breastfeeding support — and, after clinical and nutritional assessment, the applicable admission criteria are met.",
  },
  {
    q: "Who compiles the monthly data?",
    a: "The designated Breastfeeding/Lactation Counsellor at the Medical College/SNCU, shared monthly through the designated district/state mechanism, without duplicating routine government reporting.",
  },
  {
    q: "How often should ASHA/ANM/AWW visit?",
    a: "The guideline does not fix a new schedule: frequency of home visits and clinical follow-up should follow applicable state/national programme guidance.",
  },
  {
    q: "What must every graduate with feeding difficulty leave with?",
    a: "A documented feeding plan and a defined next point of care — and every referral needs a clear counter-referral and community follow-up plan.",
  },
];

/** Short statements for the moving carousel / marquee on the home page. */
export const highlights: { title: string; body: string; icon: IconName; tone: string }[] = [
  { title: "One baby, one continuum", body: "Infants move between levels of care according to need — referral, counter-referral and community follow-up continue across the pathway.", icon: "infinity", tone: "sncu" },
  { title: "Feeding readiness counts", body: "Medical stabilisation and feeding readiness together decide the next level of care.", icon: "milk", tone: "clmc" },
  { title: "Not an automatic NRC referral", body: "Breastfeeding not yet established, by itself, does not mean NRC. Follow admission criteria.", icon: "shieldAlert", tone: "nrc" },
  { title: "Step-down ≠ another SNCU", body: "Step-down is transition care: warmth, feeding establishment and observation before home.", icon: "thermometer", tone: "stepdown" },
  { title: "A plan in every hand", body: "Every graduate with feeding difficulty leaves with a documented feeding plan and a next point of care.", icon: "clipboardList", tone: "counsellor" },
  { title: "Close every loop", body: "Every referral needs a counter-referral and a community follow-up plan.", icon: "repeat", tone: "followup" },
  { title: "FEED · GROW · CHECK · REFER", body: "Four things ASHA, ANM and AWW look at after every SNCU discharge.", icon: "users", tone: "community" },
];
