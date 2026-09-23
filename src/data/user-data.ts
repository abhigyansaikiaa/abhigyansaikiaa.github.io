export interface UserData {
  id: string;
  name: string;
  avatar: string;
  message: string;
  role: string;
  vimeoId?: string;
}

// Example testimonial data — replace with your own clients, photos, and Vimeo IDs.
export const userData: UserData[] = [
  {
    id: "jane-doe",
    name: "Jane Doe",
    avatar: "/testimonials/placeholder-1.png",
    message: "Professional, patient, and easy to communicate with. Delivered exactly what was needed — smooth, stress-free, and genuinely pleasant to work with.",
    role: "Film Director",
    vimeoId: "000000000"
  },
  {
    id: "john-smith",
    name: "John Smith",
    avatar: "/testimonials/placeholder-2.png",
    message: "Understood our vision clearly and created a visually stunning result with smooth transitions. Professional communication and precise revisions.",
    role: "Filmmaker",
    vimeoId: "000000000"
  },
  {
    id: "alex-taylor",
    name: "Alex Taylor",
    avatar: "/testimonials/placeholder-3.png",
    message: "Consistently reliable and focused throughout. Delivered high-quality work on time with smooth revisions — made the process efficient and stress-free.",
    role: "Co-founder, Example Studio",
    vimeoId: "000000000"
  },
  {
    id: "sam-lee",
    name: "Sam Lee",
    avatar: "/testimonials/placeholder-4.png",
    message: "Exceeded expectations on our project. Added personality without losing our unique style, hit every timeline milestone, and required minimal hand-holding.",
    role: "Design Studio Owner",
    vimeoId: "000000000"
  },
  {
    id: "morgan-riley",
    name: "Morgan Riley",
    avatar: "/testimonials/placeholder-5.png",
    message: "Absolutely incredible edit! The energy, transitions, and motion effects were on point. Super professional work from start to finish.",
    role: "Content Creator",
    vimeoId: "000000000"
  }
];
