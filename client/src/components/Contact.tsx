import React, { useState, FormEvent } from "react";
import { useIntersectionObserver } from "../hooks/use-intersection-observer.js";
import { cn } from "../lib/utils.js";
import { contactInfo, socialLinks, ContactInfo, SocialLink } from "../lib/constants.js";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, ExternalLink, Github, Instagram, Linkedin, Send, Sparkles } from "lucide-react";
import ColorBends from "./ColorBends";
import SplitText from "./SplitText";
import SpotlightCard from "./SpotlightCard";
import Magnet from "./Magnet";

export default function Contact() {
  const { ref, isInView } = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const message = `Hello, my name is ${formData.name}!\n\n${formData.message}\n\nEmail: ${formData.email}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/5583999290376?text=${encodedMessage}`, '_blank');

    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  const getContactIcon = (name: string) => {
    switch (name) {
      case "location":
        return <MapPin className="text-xl text-white" />;
      case "email":
        return <Mail className="text-xl text-white" />;
      case "phone":
        return <Phone className="text-xl text-white" />;
      default:
        return <Mail className="text-xl text-white" />;
    }
  };

  const getSocialIcon = (name: string) => {
    switch (name) {
      case "linkedin":
        return <Linkedin size={20} className="text-white" />;
      case "github":
        return <Github size={20} className="text-white" />;
      case "instagram":
        return <Instagram size={20} className="text-white" />;
      default:
        return <ExternalLink size={20} className="text-white" />;
    }
  };

  return (
    <section id="contact" className="pt-64 md:pt-80 lg:pt-96 pb-20 relative overflow-hidden group">
      {/* ColorBends Animated Background */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <ColorBends
          colors={["#ff5c7a", "#8a5cff", "#00ffd1"]}
          rotation={30}
          speed={0.3}
          scale={1.2}
          frequency={1.4}
          warpStrength={1.2}
          mouseInfluence={0.8}
          parallax={0.6}
          noise={0.08}
          transparent
        />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12">
          <div
            ref={ref}
            className={cn(
              "space-y-6 reveal-element",
              isInView && "active"
            )}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <span className="text-sm uppercase tracking-widest text-primary font-semibold space-grotesk-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Contato
              </span>
            </motion.div>
            
            <SplitText 
              text="Vamos trabalhar juntos?"
              className="text-3xl md:text-5xl font-bold text-white space-grotesk-bold"
              delay={30}
              textAlign="left"
            />
            
            <motion.p 
              className="text-white/80 text-lg leading-relaxed"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Estou aberto a projetos freelance e oportunidades de colaboração. 
              Se você tem um projeto que gostaria de discutir, entre em contato!
            </motion.p>

            <div className="space-y-4 mt-8">
              {contactInfo.map((info: ContactInfo, index: number) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                >
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    {getContactIcon(info.icon)}
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white">{info.title}</h4>
                    <p className="text-white">{info.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex space-x-4 pt-6">
              {socialLinks.map((link: SocialLink, index: number) => (
                <Magnet key={index} padding={40} magnetStrength={0.4}>
                  <motion.a
                    href={link.url}
                    className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300"
                    aria-label={link.label}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {getSocialIcon(link.name)}
                  </motion.a>
                </Magnet>
              ))}
            </div>
          </div>

          <SpotlightCard 
            className="p-8"
            spotlightColor="rgba(var(--primary-rgb), 0.2)"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
            <h4 className="text-2xl font-bold mb-6 space-grotesk-bold text-white flex items-center gap-3">
              <Send className="w-6 h-6 text-primary" />
              Envie uma mensagem
            </h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder:text-white/30 transition-all duration-300"
                  placeholder="Seu nome"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder:text-white/30 transition-all duration-300"
                  placeholder="seu@email.com"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="subject" className="block text-sm font-medium text-white/80 mb-2">
                  Assunto
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder:text-white/30 transition-all duration-300"
                  placeholder="Assunto da mensagem"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder:text-white/30 transition-all duration-300 resize-none"
                  placeholder="Sua mensagem..."
                  required
                ></textarea>
              </div>

              <motion.button
                type="submit"
                className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 transition-all duration-300 shadow-lg shadow-primary/30 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(var(--primary-rgb), 0.4)" }}
                whileTap={{ scale: 0.98 }}
              >
                <Send className="w-5 h-5" />
                Enviar mensagem
              </motion.button>
            </form>
            </motion.div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}