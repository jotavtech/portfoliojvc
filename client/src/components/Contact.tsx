import React, { useState, FormEvent } from "react";
import { useIntersectionObserver } from "../hooks/use-intersection-observer.js";
import { cn } from "../lib/utils.js";
import { contactInfo, socialLinks, ContactInfo, SocialLink } from "../lib/constants.js";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, ExternalLink, Github, Instagram, Linkedin } from "lucide-react";
import ColorBends from "./ColorBends";

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
            <h2 className="text-sm uppercase tracking-widest text-white font-semibold space-grotesk-semibold">
              Contact
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white space-grotesk-bold">
              Let's work together
            </h3>
            <p className="text-white">
              I'm interested in freelance projects and collaboration opportunities. If you have a project you'd like to discuss, get in touch.
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
                <a
                  key={index}
                  href={link.url}
                  className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
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
            <h4 className="text-2xl font-bold mb-6 space-grotesk-bold">Send a message</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-white mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black/40 backdrop-blur-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent text-white placeholder:text-white/50"
                  placeholder="Your name"
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
                  placeholder="Your email"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="subject" className="block text-sm font-medium text-white mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black/40 backdrop-blur-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent text-white placeholder:text-white/50"
                  placeholder="Message subject"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-white mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black/40 backdrop-blur-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent text-white placeholder:text-white/50"
                  placeholder="Your message"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-secondary text-black font-medium rounded-lg hover:bg-secondary/90 transition-colors shadow-lg glow"
              >
                Send message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}