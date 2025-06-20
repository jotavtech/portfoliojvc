import React, { useEffect, useRef, useCallback, useMemo } from "react";
import "./ProfileCard.css";

interface ProfileCardProps {
  avatarUrl: string;
  miniAvatarUrl?: string;
  name?: string;
  title?: string;
  handle?: string;
  status?: string;
  contactText?: string;
  enableTilt?: boolean;
  onContactClick?: () => void;
}

const ProfileCardComponent: React.FC<ProfileCardProps> = ({
  avatarUrl,
  miniAvatarUrl,
  name = "Javi A. Torres",
  title = "Software Engineer",
  handle = "javicodes",
  status = "Online",
  contactText = "Contact Me",
  enableTilt = true,
  onContactClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  const updateCardTransform = useCallback((x: number, y: number) => {
    const card = cardRef.current;
    if (!card) return;

    const { width, height, left, top } = card.getBoundingClientRect();
    const mouseX = x - left;
    const mouseY = y - top;
    const percentX = Math.round((mouseX / width) * 100);
    const percentY = Math.round((mouseY / height) * 100);

    const rotateY = (percentX - 50) / 3.5;
    const rotateX = -(percentY - 50) / 3.5;

    card.style.setProperty('--pointer-x', `${percentX}%`);
    card.style.setProperty('--pointer-y', `${percentY}%`);
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    animationFrameRef.current = requestAnimationFrame(() => {
      updateCardTransform(e.clientX, e.clientY);
    });
  }, [updateCardTransform]);
  
  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (card) {
      card.style.transition = 'transform 0.5s ease';
      card.style.transform = 'rotateX(0deg) rotateY(0deg)';
      card.addEventListener('transitionend', () => {
        card.style.transition = 'transform 0.1s linear';
      }, { once: true });
    }
  }, []);

  useEffect(() => {
    if (!enableTilt) return;
    const currentCard = cardRef.current;
    if (currentCard) {
      currentCard.addEventListener('mousemove', handleMouseMove);
      currentCard.addEventListener('mouseleave', handleMouseLeave);
    }
    return () => {
      if (currentCard) {
        currentCard.removeEventListener('mousemove', handleMouseMove);
        currentCard.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [enableTilt, handleMouseMove, handleMouseLeave]);

  return (
    <div className="pc-perspective">
      <div ref={cardRef} className="pc-card">
        <div className="pc-glow" />
        <div className="pc-border" />
        <div className="pc-content">
          <div className="pc-holographic-letters">
            <span>J</span>
            <span>J</span>
            <span>J</span>
          </div>
          <div className="pc-header">
            <h3 className="pc-name">{name}</h3>
            <p className="pc-title">{title}</p>
          </div>
          <img src={avatarUrl} alt={name} className="pc-avatar" />
          <div className="pc-footer">
            <div className="pc-user-details">
              <img src={miniAvatarUrl || avatarUrl} alt={name} className="pc-mini-avatar" />
              <div className="pc-user-text">
                <span className="pc-handle">@{handle}</span>
                <span className="pc-status">{status}</span>
              </div>
            </div>
            <button className="pc-contact-btn" onClick={onContactClick}>
              {contactText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileCard = React.memo(ProfileCardComponent);
export default ProfileCard; 