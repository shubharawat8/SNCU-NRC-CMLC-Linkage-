import {
  Baby, CalendarCheck, CalendarDays, ChartLine, ClipboardCheck, ClipboardList, HeartHandshake, Hospital, House,
  IdCard, Infinity as InfinityIcon, Milk, Repeat, Salad, ShieldAlert, Thermometer, Users, type LucideProps,
} from "lucide-react";

/**
 * Serializable icon registry. Content files reference icons by name so they
 * stay plain data; components render them through <Icon name=… />.
 */
const registry = {
  baby: Baby,
  calendarCheck: CalendarCheck,
  calendarDays: CalendarDays,
  clipboardCheck: ClipboardCheck,
  clipboardList: ClipboardList,
  heartHandshake: HeartHandshake,
  home: House,
  hospital: Hospital,
  idCard: IdCard,
  infinity: InfinityIcon,
  lineChart: ChartLine,
  milk: Milk,
  repeat: Repeat,
  salad: Salad,
  shieldAlert: ShieldAlert,
  thermometer: Thermometer,
  users: Users,
} as const;

export type IconName = keyof typeof registry;

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const C = registry[name];
  return <C aria-hidden="true" {...props} />;
}
