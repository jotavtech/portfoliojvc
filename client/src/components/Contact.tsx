import React, { useState, FormEvent, useEffect } from "react";
import { useIntersectionObserver } from "../hooks/use-intersection-observer.js";
import { cn } from "../lib/utils.js";
import { contactInfo, socialLinks, ContactInfo, SocialLink } from "../lib/constants.js";
import { useToast } from "../hooks/use-toast.js";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, ExternalLink, Github, Instagram, Linkedin } from "lucide-react";

export default function Contact() {
  const { ref, isInView } = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });
  const { toast } = useToast();
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

    const message = `Olá, me chamo ${formData.name}!\n\n${formData.message}\n\nEmail: ${formData.email}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/5583999290376?text=${encodedMessage}`, '_blank');

    // Site puramente estático - apenas simulação da interface
    toast({
      title: "Mensagem enviada",
      description: "Obrigado por entrar em contato! Retornarei em breve.",
    });

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
        return <MapPin className="text-xl text-secondary" />;
      case "email":
        return <Mail className="text-xl text-secondary" />;
      case "phone":
        return <Phone className="text-xl text-secondary" />;
      default:
        return <Mail className="text-xl text-secondary" />;
    }
  };

  const getSocialIcon = (name: string) => {
    switch (name) {
      case "linkedin":
        return <Linkedin size={20} />;
      case "github":
        return <Github size={20} />;
      case "instagram":
        return <Instagram size={20} />;
      default:
        return <ExternalLink size={20} />;
    }
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden group">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 transition-transform duration-500 ease-out group-hover:scale-105"
        style={{
          backgroundImage: "url('https://res.cloudinary.com/dzwfuzxxw/image/upload/v1748112497/assets-task_01jw1st5n1es3br63jqstmt003-1748112399_img_3_axf4wn.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(8px) brightness(0.3)",
          transform: "scale(1.1)" // Slightly larger to prevent white edges during blur
        }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12">
          <div
            ref={ref}
            className={cn(
              "space-y-6 reveal-element",
              isInView && "active"
            )}
          >
            <h2 className="text-sm uppercase tracking-widest gradient-text font-semibold">
              Contato
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white">
              Vamos trabalhar juntos
            </h3>
            <p className="text-neutral-300">
              Estou interessado em projetos freelance e oportunidades de colaboração. Se você tem um projeto que gostaria de discutir, entre em contato.
            </p>

            <div className="space-y-4 mt-8">
              {contactInfo.map((info: ContactInfo, index: number) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                >
                  <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
                    {getContactIcon(info.icon)}
                  </div>
                  <div>
                    <h4 className="text-lg font-medium">{info.title}</h4>
                    <p className="text-neutral-300">{info.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex space-x-4 pt-6">
              {socialLinks.map((link: SocialLink, index: number) => (
                <a
                  key={index}
                  href={link.url}
                  className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center hover:bg-secondary transition-colors"
                  aria-label={link.label}
                >
                  {getSocialIcon(link.name)}
                </a>
              ))}
            </div>
          </div>

          <motion.div
            className="bg-black/60 backdrop-blur-2xl text-white p-8 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h4 className="text-2xl font-bold mb-6">Envie uma mensagem</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-white mb-1">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black/40 backdrop-blur-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent text-white placeholder:text-white/50"
                  placeholder="Seu nome"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black/40 backdrop-blur-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent text-white placeholder:text-white/50"
                  placeholder="Seu email"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="subject" className="block text-sm font-medium text-white mb-1">
                  Assunto
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black/40 backdrop-blur-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent text-white placeholder:text-white/50"
                  placeholder="Assunto da mensagem"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-white mb-1">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black/40 backdrop-blur-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent text-white placeholder:text-white/50"
                  placeholder="Sua mensagem"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-secondary text-black font-medium rounded-lg hover:bg-secondary/90 transition-colors shadow-lg glow"
              >
                Enviar mensagem
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}