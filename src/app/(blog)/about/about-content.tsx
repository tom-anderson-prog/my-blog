"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function AboutContentPage() {
  const pathname = usePathname();
  const containerVars: Variants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVars: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <motion.div
      key={pathname}
      variants={containerVars}
      initial="initial"
      animate="animate"
      className="w-full flex flex-col justify-center items-center pt-16">
      <div className="max-w-xl flex flex-col justify-start items-center gap-2 mb-8">
        <motion.div
          variants={{
            initial: { opacity: 0, scale: 0.8, rotate: -10 },
            animate: { opacity: 1, scale: 1, rotate: 0 },
          }}
          transition={{ type: "spring", stiffness: 120, damping: 12 }}>
          <Image
            src="https://img-typora-irving.oss-cn-shanghai.aliyuncs.com/blog/avatar.png?x-oss-process=image/resize,w_300,m_lfit/format,webp/quality,q_30"
            alt="avatar"
            width={240}
            height={240}
            priority
            className="rounded-full aspect-square object-cover shadow-xl ring-2 ring-gray-200 dark:ring-gray-700"
          />
        </motion.div>
        <motion.h1
          variants={itemVars}
          className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
          Anderson Tom
        </motion.h1>
        <motion.p
          variants={itemVars}
          className="text-xl text-muted-foreground font-semibold dark:text-slate-100">
          Web Developer, China
        </motion.p>
      </div>

      <motion.div
        variants={itemVars}
        className="max-w-2xl text-xl leading-relaxed text-slate-600 dark:text-slate-400">
        I&apos;m a web developer from China.I am passionate about building
        innovative solutions and sharing my knowledge with others.My interests
        are reading, taking beautiful photos, watching sports, and learing new
        techs.You can get in touch with me by email:{" "}
        <motion.a
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="text-black dark:text-white font-bold underline underline-offset-8 decoration-1 hover:decoration-2 transition-all duration-300"
          href="mailto:anderson.tom.programmer@gmail.com">
          anderson.tom.programmer@gmail.com
        </motion.a>
      </motion.div>
    </motion.div>
  );
}
