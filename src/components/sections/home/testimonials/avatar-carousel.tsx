'use client";';
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface User {
  id: string;
  name: string;
  avatar: string;
  message: string;
}

interface AvatarCarouselProps {
  users: User[];
  activeIndex: number;
  onAvatarClick: (index: number) => void;
}

export const AvatarCarousel = ({
  users,
  activeIndex,
  onAvatarClick,
}: AvatarCarouselProps) => {
  return (
    <div className="flex items-start justify-center gap-2 sm:gap-3 md:gap-4 px-2 pb-8 md:pb-6">
      {users.map((user, index) => (
        <button
          key={user.id}
          onClick={() => onAvatarClick(index)}
          className="relative transition-all duration-300 focus:outline-none flex flex-col items-center gap-2 min-w-0"
        >
          <motion.div
            animate={{
              scale: activeIndex === index ? 1 : 0.9,
            }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
            className="relative shrink-0"
            style={{ willChange: "transform" }}
          >
            {activeIndex === index && (
              <motion.div
                layoutId="avatar-border"
                className="absolute -inset-1 rounded-full bg-primary"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <div className="relative">
              <Avatar className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 border-2 border-background">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>
                  {user.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          </motion.div>
          {activeIndex === index && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="text-xs sm:text-sm font-medium text-foreground whitespace-nowrap absolute top-full mt-3 bg-muted px-2 py-1  border border-dashed"
            >
              {user.name}
            </motion.p>
          )}
        </button>
      ))}
    </div>
  );
};
