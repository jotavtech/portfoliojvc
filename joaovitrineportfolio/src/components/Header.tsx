import React from "react";

const navigation = [
  { name: "Home", href: "#home" },
  { name: "Projetos", href: "#projects" },
  { name: "Sobre", href: "#about" },
  { name: "Habilidades", href: "#skills" },
  { name: "Contato", href: "#contact" },
];

export default function Header() {
  return (
    <header className="fixed w-full z-50 py-4 bg-black/80 backdrop-blur-md">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          <a
            href="#home"
            className="text-xl font-bold tracking-tight hover:text-secondary transition-colors"
          >
            João<span className="red-gradient">.</span>
          </a>

          <nav>
            <ul className="flex space-x-6 text-white font-bold">
              {navigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="hover:text-secondary transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}