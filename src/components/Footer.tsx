import {
  FaGithub,
  FaDiscord,
  FaTwitter,
  FaEnvelope,
  FaLinkedin,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-black/10 text-amber-100">
 
      <div className="border-t border-gray-800 w-full"></div>

      <div className="max-w-auto mx-auto w-full py-6 px-6 sm:px-8 flex flex-col md:flex-row justify-between items-center gap-4">

        <div className="flex space-x-6 text-2xl ml-2 text-gray-400 items-center">
          <a
            href="https://github.com/DexAsHisH"
            target="_blank"
            rel="noreferrer"
          >
            <div className=" hover:bg-[#ffffff]/10 hover:text-[#ffffff]/80  rounded-md p-1 transition">
              <FaGithub />
            </div>
          </a>
          <a
            href="https://discord.com/channels/@me"
            target="_blank"
            rel="noreferrer"
          >
            <div className=" hover:bg-[#ffffff]/10 hover:text-[#ffffff]/80  rounded-md p-1 transition">
              <FaDiscord />
            </div>
          </a>
          <a
            href="https://x.com/dabral_ashishh"
            target="_blank"
            rel="noreferrer"
          >
            <div className=" hover:bg-[#ffffff]/10 hover:text-[#ffffff]/80  rounded-md p-1 transition">
              <FaTwitter />
            </div>
          </a>
          <a
            href="mailto:ashishdabral2014@gmail.com"
            target="_blank"
            rel="noreferrer"
          >
            <div className=" hover:bg-[#ffffff]/10 hover:text-[#ffffff]/80 rounded-md p-1 transition">
              <FaEnvelope />
            </div>
          </a>
          <a
            href="https://www.linkedin.com/in/ashish-dabral-6428ba195/"
            target="_blank"
            rel="noreferrer"
          >
            <div className=" hover:bg-[#ffffff]/10 hover:text-[#ffffff]/80 rounded-md p-1 transition">
              <FaLinkedin />
            </div>
          </a>
        </div>

        <div className="text-sm text-gray-400 font-mono text-center md:text-right">
          <span>Made with love. &lt;3</span>
        </div>
      </div>
    </footer>
  );
}
