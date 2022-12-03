import GitHubIcon from "../assets/icons/GitHubIcon";

const Footer = () => {

  const openMyGitHubRepo = () => {
    return `<a href="https://github.com/sergiobg91/cripto-home-app"></a>`
    
  }

  return (
    <footer className="h-16 bg-[#58688c] flex items-center justify-center gap-2 relative bottom-0 w-full font-semibold">
      <p className="text-white">
        &copy;2022 Sergio Beltran. Derechos reservados.
      </p>
      <a className="cursor-pointer" href="https://github.com/sergiobg91/cripto-home-app" target="_blank" rel="noopener noreferrer">
        <GitHubIcon className="fill-white"/>
      </a>
    </footer>
  );
};

export default Footer;
