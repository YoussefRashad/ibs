import {
   Briefcase as BriefcaseIcon,
   Lock as LockIcon,
   UserPlus as UserPlusIcon,
   Shield as ShieldIcon,
   User as UserIcon,
   PieChart as PieChartIcon,
   Share2 as ShareIcon,
   Users as UsersIcon,
   MapPin as MapIcon,
} from "react-feather";
import ReceiptIcon from "@material-ui/icons/ReceiptOutlined";

export default [
   {
      subheader: "Management",
      items: [
         {
            title: "Tickets",
            icon: ReceiptIcon,
            href: "/",
         },
         {
            title: "Users",
            icon: UsersIcon,
            href: "/users",
         },
         // {
         //    title: "Roles",
         //    icon: ShieldIcon,
         //    items: [
         //       {
         //          title: "List Roles",
         //          href: "/management/roles",
         //       },
         //    ],
         // },
      ],
   },
   {
      subheader: "Ibs Information",
      items: [
         {
            title: "Contact Us",
            href: "/information/contactUs",
            icon: ShareIcon,
         },
         {
            title: "About Us",
            href: "/information/aboutUs",
            icon: BriefcaseIcon,
         },
         {
            title: "Visit Us",
            href: "/information/visitUs",
            icon: MapIcon,
         },
      ],
   },
   {
      subheader: "Others",
      items: [
         {
            title: "Profile",
            href: "/profile/",
            icon: UserIcon,
         },
      ],
   },
   {
      subheader: "Auth",
      items: [
         {
            title: "Login",
            href: "/auth/login",
            icon: LockIcon,
         },
         {
            title: "Register",
            href: "/auth/register",
            icon: UserPlusIcon,
         },
      ],
   },
];
