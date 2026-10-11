# Feature module: Discharge Check

> Route `/discharge-check` · guideline Sections 3, 5, 6 · client component `components/tools/discharge-check.tsx`

## Purpose
A teaching aid that walks the Section 6 pre-discharge assessment (MEDICAL · FEED · GROW · TRANSITION · FOLLOW-UP) and shows which Section 5 route applies. **It is not a clinical decision tool**, and the page says so.

## Logic (mirrors the guideline, adds no criteria)
```
if not clinically stable            → Continue SNCU care
else if any Group C flag            → Route 3: clinical + nutritional assessment;
  (persistent difficulty despite      NRC / appropriate facility only if criteria are met
   support, poor/no weight gain, SAM)
else if BF not established or
        thermal/transition care needed → Route 2: Counsellor + CLMC and/or Step-down
else                                → Route 1: discharge → SNCU follow-up → ASHA + ANM + AWW
```
- If breastfeeding is not established and no Group C flag is present, the tool shows the Section 4 notice: *not an automatic indication for NRC referral*.
- Group A flags selected under FEED are listed as "Feeding plan should address".
- Unticked FOLLOW-UP items are listed as "Before discharge" gaps.

## UI
- Five tone-coded clay sections; yes/no segmented radios and clay checkboxes (native inputs, keyboard accessible).
- A sticky result panel with `aria-live="polite"`, plus Print summary and Reset buttons.
