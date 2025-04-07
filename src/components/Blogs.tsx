import { FocusCards } from "./ui/focus-cards";
import eren from "../assets/pfps/eren.jpeg"
import goku from "../assets/pfps/goku.jpeg"
import sukuna from "../assets/pfps/sukuna.jpeg"


export default function Blogs() {
  const cards = [
    {
      title: "IaaS vs PaaS",
      src: eren,
      href: "https://medium.com/@dabral-ashish/cloud-architecture-decisions-choosing-between-iaas-and-paas-8df1c7aa1f25"
    },
    {
      title: "github-Contribution",
      src: goku,
      href:"https://medium.com/@dabral-ashish/a-beginners-guide-to-open-source-contributions-a2fbe996a120"
    },
    {
      title: "Python-internals",
      src: sukuna,
      href:"https://medium.com/@dabral-ashish/python-internals-how-it-really-works-242e96905efc"
    },
  ];

  return <FocusCards cards={cards} />;
}
